import React, {useEffect, useState} from "react";
import NavBar from "./NavBar"
import { MainWrapper, SimpleWrapper } from "../components/wrappers"
import {db} from '../firebase'
import {collection, addDoc, Timestamp, query, orderBy, onSnapshot} from 'firebase/firestore'
import ActivityCard from "../components/ActivityCard";

function ActivitiesHome() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'tasks'), {
        title: title,
        description: description,
        created: Timestamp.now()
      })
    } catch (err) {
      alert(err)
    }
  }


  return (
    <MainWrapper>
    <NavBar />
     <SimpleWrapper>
      <h1>Activities Page</h1>
      {activities.map(activity => ( <ActivityCard activity={activity.data} />))}

        <form onSubmit={handleSubmit} name='addTask'>
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <button onClick={(e)=> handleSubmit(e)}>Create activity</button>
        </form>

      </SimpleWrapper>
    </MainWrapper>
    );
  }
export default ActivitiesHome;