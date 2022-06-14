import React, { useState, useRef } from "react";
import {addDoc, query, orderBy, collection, serverTimestamp, Timestamp } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth } from "../firebase";
import {ChatWrapper} from '../components/wrappers'
import Message from "./Message"


const Chat = ({ user, db, users}) => {

    const messageCollection = collection(db, 'messages'); //ref
    const messageQuery = query(messageCollection, orderBy("createdAt"));
    const [messages] = useCollectionData(messageQuery);
    const [formValue, setFormValue] = useState('');
    const drop = useRef()


    const sendMessage = async(e) => {
        e.preventDefault();
        const { uid } = auth.currentUser;
        const currentTime = Date.now()

        await addDoc(messageCollection, {
            text: formValue,
            createdAt: serverTimestamp(),
            sentAt: new Timestamp(Timestamp.now().seconds + 1200, Timestamp.now().nanoseconds),
            uid
        })
        setFormValue('')

        drop.current.scrollIntoView({ behavior: 'smooth'});
    }

    return (
      <ChatWrapper>
        {user && messages && messages.map(message => {
          const sender = message && users && users.find(user => {
            return user.uid === message.uid
          })
          const sending = message.uid === user.uid
          return (
            <Message key={message.id} sender={sender} text={message.text} message={message} sending={sending}/>
          )})}
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