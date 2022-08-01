import React, { useState, useRef, useEffect } from "react";
import {doc, setDoc, Timestamp, query, collection, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase";
import {ChatWrapper} from '../components/wrappers'
import { ChatForm, ChatInput, SendButton } from "../components/chatComponents";
import Message from "../components/Message"
import moment from 'moment'
import { useCollectionData} from "react-firebase-hooks/firestore";
import DetailedMessage from "./DetailedMessage";

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
          sentAt: new Timestamp(Timestamp.now().seconds + 600, Timestamp.now().nanoseconds),
          uid,
          recipientUid: selectedFriend.uid || '',
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

  return (
    <>
    {showDetails ? <DetailedMessage message={detailedMessage} setShowDetails={setShowDetails} user={user}/> : <ChatWrapper>
        {user && messages && messages.map((message, i) => {
          const sender = message && users && users.find(user => {
            return user.uid === message.uid
          })
          const sending = message.uid === user.uid
          const lastMessage = i === messages.length - 1
          return checkFriendFilterMsg(selectedFriend?.uid, message)
            && <Message key={message.id} sender={sender} text={message.text} message={message} sending={sending} recieveTime={message.sentAt} timeStamp={message.createdAt} currDate={currDate} setDetails={setDetails}/>
        })}
        <ChatForm onSubmit={sendMessage}>
        <ChatInput value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <SendButton type="submit">Submit</SendButton>
        </ChatForm>
        {/* Forced scroll */}
        <div ref={messagesEndRef} />
    </ChatWrapper>}
    </>
  );
}
export default ChatHome;