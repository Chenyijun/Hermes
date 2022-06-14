import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, getUser } from "../firebase";
import { query, collection, getDocs, where, orderBy, serverTimestamp } from "firebase/firestore";
import { useCollectionData} from "react-firebase-hooks/firestore";
import Chat from "./Chat"
import NavBar from "./NavBar"
import { MainWrapper } from "../components/wrappers"
import {ChatHeader} from '../components/chatComponents'

import UserList from "./UserList"

function ChatHome() {
  const [user, loading ] = useAuthState(auth);
  const [name, setName] = useState("");
  const [timeDelay, setTimeDelay] = useState(true)
  const [selectedRecipient, setSelectedRecipient] = useState(null)

  const usersRef = collection(db, 'users');
  const usersQuery = query(usersRef, orderBy("name"));
  const [users] = useCollectionData(usersQuery);
  const navigate = useNavigate();

  const messageCollection = collection(db, 'messages'); //ref
  const messageQuery = query(messageCollection, orderBy("createdAt"));
  const [messages] = useCollectionData(messageQuery);

  console.log('CHAT USER', getUser())

  const toggleTimeDelay = () => {
    setTimeDelay(!timeDelay)
  }



  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  return (
    <MainWrapper>
      <NavBar user={user} />
      <UserList user={user} users={users} db={db} selectedRecipient={selectedRecipient} setSelectedRecipient={setSelectedRecipient}/>
      <div>
        <ChatHeader>
          Chat with everyone {timeDelay && `[TIME DELAYED]`}
          <button onClick={() => toggleTimeDelay()}>{timeDelay ? 'Turn off time delay' : 'Turn on time delay'}</button>
        </ChatHeader>
        <Chat user={user} users={users} db={db} messages={messages} messageCollection={messageCollection} timeDelay={timeDelay}/>
      </div>
     </MainWrapper>
  );
}
export default ChatHome;