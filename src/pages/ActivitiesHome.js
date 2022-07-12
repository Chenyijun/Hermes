import React, {useEffect, useState} from "react";
import { SimpleWrapper } from "../components/wrappers"
import {db} from '../firebase'
import {collection, query, orderBy, onSnapshot, where} from 'firebase/firestore'
import ActivityCard from "../components/ActivityCard";
import { ActivityFlex} from "../components/activityComponents"
import { useCollectionData} from "react-firebase-hooks/firestore";
import { Header2 } from "../components/mainComponents"
import { ActivitiesWrapper} from "../components/wrappers"

function ActivitiesHome({user, selectedFriend}) {
  const [allActivities, setAllActivities] = useState([])
  const userActivitiesRef = collection(db, 'user-activities');
  const activitiesQuery = query(userActivitiesRef, orderBy("startDate"), where('users', 'array-contains', [selectedFriend?.uid, user?.uid]));
  const [userActivities] = useCollectionData(activitiesQuery);

  /* Get all activities from firestore in realtime */
  useEffect(() => {
    const q = query(collection(db, 'activities'), orderBy('title', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setAllActivities(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  })

  return (
    <SimpleWrapper>
      <Header2>Active Sparks</Header2>
      <ActivityFlex>
        {userActivities?.map(activity => (<p>{activity.name}</p>))}
      </ActivityFlex>
      <Header2>Library</Header2>
      <ActivitiesWrapper>
        {allActivities.map(activity => ( <ActivityCard key={activity.id} activity={activity.data} />))}
      </ActivitiesWrapper>
    </SimpleWrapper>
    );
  }
export default ActivitiesHome;