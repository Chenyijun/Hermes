import React, {useEffect, useState} from "react";
import TopNavBar from "./TopNavBar"
import { HomeWrapper, BodyWrapper } from "../components/wrappers"
import {auth, db} from '../firebase'
import {doc, getDoc, collection, query, orderBy, onSnapshot} from 'firebase/firestore'
import ActivityCard from "../components/ActivityCard";
import { ActivityFlex} from "../components/activityComponents"
import { useCollectionData} from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import UserList from "./UserList"
import { onAuthStateChanged } from '@firebase/auth';



function Home() {
  const [authUser, loading ] = useAuthState(auth);
  const [user, setUser] = useState(null);

  const usersRef = collection(db, 'users');
  const usersQuery = query(usersRef, orderBy("name"));
  const [users] = useCollectionData(usersQuery);

  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [navState, setNavState] = useState('dashboard')

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
    setSelectedFriend(users && users[0])
	},[])


  return (
    <HomeWrapper>
      <TopNavBar friend={selectedFriend} navState={navState} setNavState={setNavState}/>
      <UserList user={authUser} users={users} db={db} selectedFriend={selectedFriend} setSelectedFriend={setSelectedFriend}/>
      <BodyWrapper>
        <p>TEST</p>
      </BodyWrapper>
    </HomeWrapper>
    );
  }
export default Home;