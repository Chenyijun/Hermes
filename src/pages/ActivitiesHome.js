import React, {useEffect, useState} from "react";
import NavBar from "./NavBar"
import { MainFriendsListWrapper, SimpleWrapper } from "../components/wrappers"
import {auth, db} from '../firebase'
import {doc, getDoc, collection, query, orderBy, onSnapshot} from 'firebase/firestore'
import ActivityCard from "../components/ActivityCard";
import { ActivityFlex} from "../components/activityComponents"
import { useCollectionData} from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import UserList from "./UserList"
import { onAuthStateChanged } from '@firebase/auth';
import FriendActivitiesHome from "./FriendActivitiesHome";



function ActivitiesHome() {
  const [activities, setActivities] = useState([])
  const [authUser, loading ] = useAuthState(auth);
  const [user, setUser] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null)

  const usersRef = collection(db, 'users');
  const usersQuery = query(usersRef, orderBy("name"));
  const [users] = useCollectionData(usersQuery);

  /* Get all activities from firestore in realtime */
  useEffect(() => {
    const q = query(collection(db, 'activities'), orderBy('title', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setActivities(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  })

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
      <NavBar user={user}/>
      <UserList user={authUser} users={users} db={db} selectedFriend={selectedFriend} setSelectedFriend={setSelectedFriend}/>
      <SimpleWrapper>
        {selectedFriend ? (
          <FriendActivitiesHome user={user} friend={selectedFriend}/>
        )
      : ( <>
            <h1>Activities Page</h1>
            <h2>Available Activities</h2>
            <ActivityFlex>
              {activities.map(activity => ( <ActivityCard key={activity.id} activity={activity.data} />))}
            </ActivityFlex>
          </>
      )}
        </SimpleWrapper>
    </MainFriendsListWrapper>
    );
  }
export default ActivitiesHome;