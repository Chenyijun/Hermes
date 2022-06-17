import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc, query, collection, orderBy } from "firebase/firestore";
import { useCollectionData} from "react-firebase-hooks/firestore";
import Chat from "./Chat"
import NavBar from "./NavBar"
import { MainFriendsListWrapper } from "../components/wrappers"
import {ChatHeader} from '../components/chatComponents'
import { onAuthStateChanged } from '@firebase/auth';


import UserList from "./UserList"

function ChatHome() {
  const [authUser, loading ] = useAuthState(auth);
  const [timeDelay, setTimeDelay] = useState(true)
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [user, setUser] = useState(null)

  const usersRef = collection(db, 'users');
  const usersQuery = query(usersRef, orderBy("name"));
  const [users] = useCollectionData(usersQuery);
  const navigate = useNavigate();

  const messageCollection = collection(db, 'messages'); //ref
  const messageQuery = query(messageCollection, orderBy("createdAt"));
  const [messages] = useCollectionData(messageQuery);

  const toggleTimeDelay = () => {
    setTimeDelay(!timeDelay)
  }

  useEffect(() => {
    if (loading) return;
    if (!authUser) return navigate("/");
  }, [authUser, loading]);

  useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			getDoc(doc(db, 'users', currentUser.uid)).then ((docSnap) => {
				if (docSnap.exists) {
					setUser(docSnap.data());
				}
			});
		})
	},[])

  return (
    <MainFriendsListWrapper>
      <NavBar user={user} />
      <UserList user={authUser} users={users} db={db} selectedFriend={selectedFriend} setSelectedFriend={setSelectedFriend}/>
      <div>
        <ChatHeader>
          Chat with {selectedFriend?.name || 'everyone'} {timeDelay && `[TIME DELAYED]`}
          <button onClick={() => toggleTimeDelay()}>{timeDelay ? 'Turn off time delay' : 'Turn on time delay'}</button>
        </ChatHeader>
        <Chat user={authUser} users={users} db={db} messages={messages} messageCollection={messageCollection} timeDelay={timeDelay} friend={selectedFriend} />
      </div>
     </MainFriendsListWrapper>
  );
}
export default ChatHome;