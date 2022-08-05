import React, {useEffect, useState} from "react";
import TopNavBar from "./TopNavBar"
import { HomeWrapper, BodyWrapper } from "../components/wrappers"
import { useNavigate } from "react-router-dom";

import {auth, db} from '../firebase'
import {doc, getDoc, collection, query, orderBy, onSnapshot} from 'firebase/firestore'
import { useCollectionData} from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import UserList from "./UserList"
import { onAuthStateChanged } from '@firebase/auth';
import ChatHome from "./ChatHome";
import ActivitiesHome from "./ActivitiesHome";
import Profile from "./Profile";
import Dashboard from "./Dashboard";
import Admin from "./Admin";


function Home({props}) {
  const navigate = useNavigate();
  const [authUser, loading ] = useAuthState(auth);
  const [user, setUser] = useState(null);
  const [timeDelay, setTimeDelay] = useState(true)
  const [myFriendsList, setMyFriendsList] = useState([])

  const usersRef = collection(db, 'users');
  const usersQuery = query(usersRef, orderBy("firstName"));
  const [users] = useCollectionData(usersQuery);
  const myFriends = myFriendsList && users?.filter(friend => myFriendsList.includes(friend.uid));


  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [navState, setNavState] = useState(props?.location.state || 'dashboard')
  const isDashboard = (selectedFriend?.uid === user?.uid || navState === 'dashboard')

  useEffect( () => {
    setMyFriendsList(user?.friends)
  },[user])

  useEffect(() => {
    if (loading) return;
    if (!authUser) return navigate("/");
  }, [authUser, loading]);

	useEffect(() => {
		setIsLoading(true);
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			getDoc(doc(db, 'users', currentUser.uid)).then ((docSnap) => {
				if (docSnap.exists) {
					setUser(docSnap.data());
					setIsLoading(false);
				}
			});
		})
	},[])

  useEffect( () => {
    user && (myFriends?.length > 0 ? setSelectedFriend(myFriendsList[0]) : setSelectedFriend(user))
  },[users])

  return (
    <HomeWrapper noTopNav={isDashboard || selectedFriend === null}>
      <UserList user={user} users={users} db={db} selectedFriend={selectedFriend} setSelectedFriend={setSelectedFriend} navState={navState} setNavState={setNavState}/>
      {(!isDashboard && selectedFriend !== null) && <TopNavBar friend={selectedFriend} navState={navState} setNavState={setNavState} timeDelay={timeDelay} setTimeDelay={setTimeDelay} admin={user?.admin} small/>}
      <BodyWrapper noPadding={navState=== 'messages'}>
        {isDashboard && <Dashboard user={user} selectedFriend={selectedFriend} />}
        {navState === 'messages' && <ChatHome user={user} selectedFriend={selectedFriend} users={users} timeDelay={timeDelay} />}
        {navState === 'sparks' && <ActivitiesHome user={user} selectedFriend={selectedFriend} />}
        {user?.isAdmin && navState === 'admin' && <Admin user={user} users={users} />}
      </BodyWrapper>
    </HomeWrapper>
    );
  }
export default Home;