import React, { useState, useRef, useEffect } from "react";
import {doc, setDoc, Timestamp, query, collection, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase";
import {ChatWrapper} from '../components/wrappers'
import { ChatForm, ChatInput, SendButton, ChatMessageWrappers } from "../components/chatComponents";
import Message from "../components/Message"
import moment from 'moment'
import { useCollectionData} from "react-firebase-hooks/firestore";
import DetailedMessage from "./DetailedMessage";
import SendIcon from '@mui/icons-material/Send';

function ChatHome({user, selectedFriend, users}) {
  const messageCollection = collection(db, 'messages'); //ref
  const messageQuery = query(messageCollection, orderBy("createdAt"));
  const [messages] = useCollectionData(messageQuery);
  const [formValue, setFormValue] = useState('');
  const [currDate, setCurrDate] = useState(new Date());
  const [showDetails, setShowDetails] = useState(false)
  const [detailedMessage, setDetailedMessage] = useState({sender: null, text: null, sentTime: null, recieved: null})

  const setDetails = (message) => {
    setDetailedMessage(message)
    setShowDetails(true)
  }

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  useEffect(() => {
    var timer = setInterval(()=> setCurrDate(new Date()), 1000)

    return function cleanup() {
      clearInterval(timer)
    }
  })


  const sendMessage = async(e) => {
      e.preventDefault();
      const { uid } = auth.currentUser;
      const docRef = doc(messageCollection);
      const docId = docRef.id

      await setDoc(docRef, {
          id: docId,
          text: formValue,
          createdAt: Timestamp.now(),
          sentAt: new Timestamp(Timestamp.now().seconds + 300, Timestamp.now().nanoseconds),
          uid,
          recipientUid: selectedFriend?.uid || null,
          nestedMessage: []
      })
      setFormValue('')
      // drop.current.scrollIntoView({ behavior: 'smooth'});
  }

  const checkFriendFilterMsg = (friendUid, message) => {
    if ((message.uid === user.uid) && (message.recipientUid === friendUid)){
      return true
    }
    if ((message.uid === friendUid) && (message.recipientUid === user.uid)){
      return moment(message.sentAt.toDate()) <= moment(currDate) ? true : false
    }
    return false
  }

  const allChatFilter = (message) => {
    if (message.recipientUid === null){
      return true
    }
    return false
  }

  return (
    <>
    {showDetails ? <DetailedMessage message={detailedMessage} setShowDetails={setShowDetails} user={user}/> : <>
        <ChatWrapper>
          <ChatMessageWrappers>
            {user && messages && messages.map((message, i) => {
              const sender = message && users && users.find(user => {
                return user.uid === message.uid
              })
              const sending = message.uid === user.uid
              const lastMessage = i === messages.length - 1
              return selectedFriend === null
              ? (allChatFilter(message) && <Message key={message.id} sender={sender} text={message.text} message={message} sending={sending} recieveTime={message.sentAt} timeStamp={message.createdAt} currDate={currDate} setDetails={setDetails} allChat />)
              :(checkFriendFilterMsg(selectedFriend?.uid, message)
                && <Message key={message.id} sender={sender} text={message.text} message={message} sending={sending} recieveTime={message.sentAt} timeStamp={message.createdAt} currDate={currDate} setDetails={setDetails}/>)
            })}
            <div ref={messagesEndRef} />
          </ChatMessageWrappers>
          <ChatForm onSubmit={sendMessage}>
            <ChatInput value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type Something..."/>
            <SendButton type="submit" disabled={!formValue}><SendIcon /></SendButton>
          </ChatForm>
        </ChatWrapper>
        {/* Forced scroll */}
    </>}
    </>
  );
}
export default ChatHome;