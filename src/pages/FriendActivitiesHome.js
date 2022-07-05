import React from "react";
import { Avatar, DefaultAvatar } from '../components/chatComponents'
import {db} from '../firebase'
import { useCollectionData} from "react-firebase-hooks/firestore";
import {doc, getDoc, collection, query, orderBy, where } from 'firebase/firestore'

function FriendActivitiesHome({user, friend}) {
  const userActivitiesRef = collection(db, 'user-activities');
  const activitiesQuery = query(userActivitiesRef, orderBy("startDate"), where('users', 'array-contains', [friend.uid, user.uid]));
  const [activities] = useCollectionData(activitiesQuery);
  console.log(activities)
  return (
      <div>
        {friend.avatar ? <Avatar small alt='avatar'src={friend.avatar} text={friend.name} />
				: <DefaultAvatar small>{friend.name}</DefaultAvatar>}
        <h1>{friend.name}</h1>
        {activities?.map(activity => {
          return (
            <p>{activity.name}</p>
          )
        })}
      </div>
    );
  }
export default FriendActivitiesHome;