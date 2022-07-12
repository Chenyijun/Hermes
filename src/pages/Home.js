import React, {useEffect, useState} from "react";
import TopNavBar from "./TopNavBar"
import { HomeWrapper, BodyWrapper } from "../components/wrappers"
import { useNavigate } from "react-router-dom";

import {auth, db} from '../firebase'
import {doc, getDoc, collection, query, orderBy, onSnapshot} from 'firebase/firestore'
import ActivityCard from "../components/ActivityCard";
import { ActivityFlex} from "../components/activityComponents"
import { useCollectionData} from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import UserList from "./UserList"
import { onAuthStateChanged } from '@firebase/auth';
import ChatHome from "./ChatHome";
import ActivitiesHome from "./ActivitiesHome";
import Profile from "./Profile";
import Dashboard from "./Dashboard";


function Home() {
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
  const [navState, setNavState] = useState('dashboard')

  const isProfile = selectedFriend?.uid === user?.uid
  // console.log('authUser', authUser)
  console.log('user', user)
  console.log('selectedFriend', selectedFriend)
  console.log('users', users)

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
					console.log('set user', user);
				}
			});
		})
	},[])

  useEffect( () => {
    user && (myFriends?.length > 0 ? setSelectedFriend(myFriendsList[0]) : setSelectedFriend(user))
  },[users])

  return (
    <HomeWrapper profile={navState === 'profile'}>
      <UserList user={user} users={users} db={db} selectedFriend={selectedFriend} setSelectedFriend={setSelectedFriend} navState={navState} setNavState={setNavState}/>
      {isProfile && <Profile user={user} />}
      {!isProfile && <TopNavBar friend={selectedFriend} navState={navState} setNavState={setNavState} timeDelay={timeDelay} setTimeDelay={setTimeDelay} admin={user?.admin}/>}
      {!isProfile && <BodyWrapper>
        {navState === 'dashboard' && <Dashboard user={user} selectedFriend={selectedFriend} />}
        {navState === 'messages' && <ChatHome user={user} selectedFriend={selectedFriend} users={users} timeDelay={timeDelay} />}
        {navState === 'sparks' && <ActivitiesHome user={user} selectedFriend={selectedFriend} />}
      </BodyWrapper>}
    </HomeWrapper>
    );
  }
export default Home;