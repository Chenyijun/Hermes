import React, { useState, useRef, useEffect } from "react";
import {addDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { auth } from "../firebase";
import {ChatWrapper} from '../components/wrappers'
import Message from "../components/Message"
import moment from 'moment'


const Chat = ({ user, users, messages, messageCollection, timeDelay, friend}) => {

    const [formValue, setFormValue] = useState('');
    const [date, setDate] = useState(new Date());
    const drop = useRef()

    useEffect(() => {
      var timer = setInterval(()=> setDate(new Date()), 1000)

      return function cleanup() {
        clearInterval(timer)
      }
    })


    const sendMessage = async(e) => {
        e.preventDefault();
        const { uid } = auth.currentUser;

        await addDoc(messageCollection, {
            text: formValue,
            createdAt: Timestamp.now(),
            sentAt: new Timestamp(Timestamp.now().seconds + 1200, Timestamp.now().nanoseconds),
            uid,
            recipientUid: friend.uid || '',
        })
        setFormValue('')

        drop.current.scrollIntoView({ behavior: 'smooth'});
    }

    const checkFriendFilterMsg = (friendUid, message) => {
      if (
        (message.uid === user.uid) && (message.recipientUid === friendUid)
        || (message.uid === friendUid) && (message.recipientUid === user.uid))
        {
        return true
      }
      return false
    }

    return (
      <ChatWrapper>
        {user && messages && messages.map(message => {
          const sender = message && users && users.find(user => {
            return user.uid === message.uid
          })
          const sending = message.uid === user.uid
          if (friend){
            return checkFriendFilterMsg(friend?.uid, message) && (timeDelay ? (moment(message.sentAt.toDate()) < moment(date) && <Message key={message.id} sender={sender} text={message.text} message={message} sending={sending} timeStamp={message.sentAt}/>)
            :  <Message key={message.id} sender={sender} text={message.text} message={message} sending={sending} timeStamp={message.createdAt}/>)
          } else {
            return timeDelay ? (moment(message.sentAt.toDate()) < moment(date) && <Message key={message.id} sender={sender} text={message.text} message={message} sending={sending} timeStamp={message.sentAt}/>)
          :  <Message key={message.id} sender={sender} text={message.text} message={message} sending={sending} timeStamp={message.createdAt}/>
          }
        })}
        <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <button type="submit">Submit</button>
        </form>
        {/* Forced scroll */}
        <div ref={drop}></div>
      </ChatWrapper>
    );
  };

export default Chat