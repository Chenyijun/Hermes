import React from "react";
import {db} from '../firebase'
import { useCollectionData} from "react-firebase-hooks/firestore";
import {doc, getDoc, collection, query, orderBy, where } from 'firebase/firestore'
import Avatar from "../components/Avatar";

function FriendActivitiesHome({user, friend}) {
  const userActivitiesRef = collection(db, 'user-activities');
  const activitiesQuery = query(userActivitiesRef, orderBy("startDate"), where('users', 'array-contains', [friend.uid, user.uid]));
  const [activities] = useCollectionData(activitiesQuery);

  return (
      <div>
        {activities?.map(activity => {
          return (
            <p>{activity.name}</p>
          )
        })}
      </div>
    );
  }
export default FriendActivitiesHome;