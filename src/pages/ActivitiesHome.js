import React, {useEffect, useState} from "react";
import NavBar from "./NavBar"
import { MainWrapper, SimpleWrapper } from "../components/wrappers"
import {db} from '../firebase'
import {collection, addDoc, Timestamp, query, orderBy, onSnapshot} from 'firebase/firestore'
import ActivityCard from "../components/ActivityCard";
import { ActivityFlex} from "../components/activityComponents"


function ActivitiesHome() {
  const [activities, setActivities] = useState([])

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


  return (
    <MainWrapper>
    <NavBar />
     <SimpleWrapper>
        <h1>Activities Page</h1>
        <h2>Available Activities</h2>
        <ActivityFlex>
          {activities.map(activity => ( <ActivityCard activity={activity.data} />))}
        </ActivityFlex>
      </SimpleWrapper>
    </MainWrapper>
    );
  }
export default ActivitiesHome;