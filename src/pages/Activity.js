import React, {useState, useEffect} from "react";
import { MainWrapper, SimpleWrapper } from "../components/wrappers"
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import {db} from '../firebase'


const Activity = () => {
  let { activityID } = useParams()
  const [activity, setActivity] = useState({})
  const navigate = useNavigate();

  const getActivity = async() => {
    const activityRef = doc(db, 'activities', activityID)
    const activitySnapshot = await getDoc(activityRef)
    setActivity(activitySnapshot.data())
  }

  useEffect(() => {
    getActivity()
  }, [])
    return (
      <MainWrapper>
        <SimpleWrapper>
          <button onClick={()=> navigate(-1)}>Back</button>
          <h1>{activity.title || 'activity title'}</h1>
          {/* <h2>{activity.description || 'activity description'}</h2>
          <h3>Instructions</h3>
          <p>{activity.instructions || `activity instructions`}</p> */}
        </SimpleWrapper>
      </MainWrapper>
    );
  };

export default Activity