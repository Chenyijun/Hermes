import React from "react";
import { db } from "../firebase";
import { query, collection, orderBy } from "firebase/firestore";
import { useCollectionData} from "react-firebase-hooks/firestore";
import Chat from "./Chat"

function ChatHome({user, selectedFriend, users, timeDelay}) {
  const messageCollection = collection(db, 'messages'); //ref
  const messageQuery = query(messageCollection, orderBy("createdAt"));
  const [messages] = useCollectionData(messageQuery);

  return (
    <Chat user={user} users={users} db={db} messages={messages} messageCollection={messageCollection} timeDelay={timeDelay} friend={selectedFriend} />
  );
}
export default ChatHome;