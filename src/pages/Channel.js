import React, { useEffect, useState, useRef } from "react";
import { doc, getDoc, getDocs, getUser, addDoc, query, orderBy, limit, collection, onSnapshot, serverTimestamp, where } from "firebase/firestore";
import { useCollectionData, useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { useFirestoreQuery } from '../hooks';
import { MessageList } from "semantic-ui-react";
import { auth } from "../firebase";
import {useAuthState} from 'react-firebase-hooks/auth'


const Channel = ({ user = null, db }) => {
    // const viewUsers = async() => {
    //     const userCollection = collection(db, 'users');
    //     const userQuery = query(userCollection, orderBy("name"));
    //     const userSnapshot = await getDocs(userQuery);
    //     userSnapshot.forEach(function(doc) {
    //         console.log("doc", doc.data())
    //     })
    // }
    // viewUsers()
    console.log('CHANNEL AUTH', auth.currentUser.uid)

    const usersRef = collection(db, 'users');
    const usersQuery = query(usersRef)
    const userQueryNoCurrent = query(usersRef, where('uid', 'not-in', [auth.currentUser.uid]))
    const [users] = useCollectionData(usersRef)
    console.log('USERS', users)

    const messageCollection = collection(db, 'messages'); //ref
    const messageQuery = query(messageCollection, orderBy("createdAt"));
    const [messages] = useCollectionData(messageQuery)
    // const messageClass = uid === auth.currentUser.uid? 'sent' : 'recieved'
    const [formValue, setFormValue] = useState('');
    const drop = useRef()
    // console.log(auth.getUser('QDibf5OrBeVyCLsANxmiKtciocl1').then((userRecord)=> {
    //     return {userRecord}
    // }))

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
        <>
      <ul>
        {messages && messages.map(message => {
            const sender = message && users.find(user => {
                return user.uid == message.uid
            })
            return (
                <li key={message.id}>{sender && sender.name} {message.text}</li>
            )})}
      </ul>
      <form onSubmit={sendMessage}>
      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
      <button type="submit">Submit</button>
      </form>
      {/* Forced scroll */}
      <div ref={drop}></div>
      </>
    );
  };

export default Channel