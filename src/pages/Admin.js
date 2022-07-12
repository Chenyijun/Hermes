import React, { useState, useEffect } from "react";
import { SimpleWrapper } from "../components/wrappers";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { collection, query, orderBy, onSnapshot} from 'firebase/firestore'
import {db} from '../firebase'


function Admin({user, selectedFriend}) {
  const [activity, setActivity] = useState(null)
  const [person1, setPerson1] = useState(null)
  const [person2, setPerson2] = useState(null)
  const [allActivities, setAllActivities] = useState([])

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

  // const handleChange = (event) => {
  //   setNewFriend(event.target.value);
  // }

  return (
    <SimpleWrapper>
      <p>Add activities</p>
      <FormControl sx={{minWidth: 200}}>
        <InputLabel>Select Activity</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={activity}
          label="Activity"
          onChange={(e) => setActivity(e.target.value)}
        >
          {allActivities.map(act => {
            return (
              <MenuItem key={act.id} value={act}>
                {act.title}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>

    </SimpleWrapper>
  );
}
export default Admin;