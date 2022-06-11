import React, { useEffect, useState, useRef } from "react";
import { doc, getDoc, getDocs, getUser, addDoc, query, orderBy, limit, collection, onSnapshot, serverTimestamp, where } from "firebase/firestore";
import { useCollectionData, useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { useFirestoreQuery } from '../hooks';
import { MessageList } from "semantic-ui-react";
import { auth } from "../firebase";
import {useAuthState} from 'react-firebase-hooks/auth'
import {ChatWrapper} from '../components/wrappers'
import Message from "./Message"


const Channel = ({ user, db, loading, users, navigate }) => {

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
      }, [user, loading]);

    const messageCollection = collection(db, 'messages'); //ref
    const messageQuery = query(messageCollection, orderBy("createdAt"));
    const [messages] = useCollectionData(messageQuery);
    const [formValue, setFormValue] = useState('');
    const drop = useRef()

    const sendMessage = async(e) => {
        e.preventDefault();
        const { uid } = auth.currentUser;

        await addDoc(messageCollection, {
            text: formValue,
            createdAt: serverTimestamp(),
            uid
        })
        setFormValue('')

        drop.current.scrollIntoView({ behavior: 'smooth'});
    }

    return (
      <ChatWrapper>
        {user && messages && messages.map(message => {
          const sender = message && users.find(user => {
            return user.uid == message.uid
          })
          const sending = message.uid === user.uid
          return (
            <Message key={message.id} sender={sender && sender.name} text={message.text} sending={sending}/>
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

export default Channel