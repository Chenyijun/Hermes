import React, {useEffect, useState} from "react";
import { SimpleWrapper } from "../components/wrappers"
import {db} from '../firebase'
import {collection, query, orderBy, onSnapshot, where} from 'firebase/firestore'
import ActivityCard from "../components/ActivityCard";
import { ActivityFlex, LibraryFilterWrapper} from "../components/activityComponents"
import { useCollectionData} from "react-firebase-hooks/firestore";
import { Header2 } from "../components/mainComponents"
import { ActivitiesWrapper} from "../components/wrappers"
import { Modal, Box, Select, MenuItem, FormControl, InputLabel, TextField } from "@mui/material";

function ActivitiesHome({user, selectedFriend}) {
  const [allActivities, setAllActivities] = useState([])
  const [openModal, setOpenModal] = useState(selectedFriend ? true : false)
  const [sparkBoxes, setSparkBoxes] = useState(null)
  const [userActivities, setUserActivities] = useState([])
  const [filterSelect, setFilterSelect] = useState('name')
  const [sort, setSort] = useState('your_turn')
  const [search, setSearch] = useState('')

  const handleFilter = (event) => {
    setFilterSelect(event.target.value);
  }
  const handleSort = (event) => {
    setSort(event.target.value);
  }


  // const userActivitiesRef = collection(db, 'user_activities');
  // const activitiesQuery = selectedFriend && user && query(userActivitiesRef, orderBy("startDate"), where('users', 'array-contains', [selectedFriend?.uid, user?.uid]));
  // const [userActivities] = useCollectionData(activitiesQuery);

  // const boxesRef = collection(db, 'boxes')
  // const boxesQuery = user && selectedFriend && query(boxesRef, orderBy("sentTime"))
  // // const boxesQuery = user && selectedFriend && query(boxesRef, orderBy("sentTime"), where('users', 'array-contains', [selectedFriend?.uid, user?.uid]))
  // const [boxes] = useCollectionData(boxesQuery);


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

  /* Get all activities from firestore in realtime */
  useEffect(() => {
    const q = query(collection(db, 'boxes'), orderBy("sentTime"))
    onSnapshot(q, (querySnapshot) => {
      setSparkBoxes(querySnapshot.docs.map(doc => ({
        id: doc.id,
        sent: doc.data().sent,
        sentTime: doc.data().sentTime,
        user_activitiesID: doc.data().user_activitiesID,
        users: doc.data().users
      })))
    })
  })

  /* Get all activities from firestore in realtime */
  useEffect(() => {
    const q = query(collection(db, 'user_activities'))
    onSnapshot(q, (querySnapshot) => {
      setUserActivities(querySnapshot.docs.map(doc => ({
        id: doc.id,
        activitiesID: doc.data().activitiesID,
        why: doc.data().why,
        status: doc.data().status
      })))
    })
  })

  return (
    <SimpleWrapper>
      <Header2>Active Sparks</Header2>
        <ActivitiesWrapper>
          {/* {sparkBoxes?.map(box => {
            const userActivity = userActivities.find(ua => ua.id === box.user_activitiesID)
            const activity = allActivities.find(a => a.id === userActivity?.activitiesID)
            return (<ActivityCard key={box?.user_activitiesID} activity={activity?.data} />)
          })} */}
        </ActivitiesWrapper>
      <ActivityFlex>
        {userActivities?.map(activity => (<p>{activity.name}</p>))}
      </ActivityFlex>
      <LibraryFilterWrapper>
      <Header2>Library</Header2>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120, background: 'white', borderRadius: '4px'}}>
          <InputLabel id="sort-label">
            Sort
          </InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            value={sort}
            label="Sort"
            onChange={handleSort}
          >
            <MenuItem key={'your_turn'} value={'your_turn'}>Your Turn</MenuItem>
            <MenuItem key={'alphabetical'} value={'alphabetical'}>Alphabetical</MenuItem>
            <MenuItem key={'added'} value={'added'}>Added</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120, background: 'white', borderRadius: '4px'}}>
          <InputLabel id="filter-label">
            Filter
          </InputLabel>
          <Select
            labelId="filter-label"
            id="filter-select"
            value={filterSelect}
            label="Filter"
            onChange={handleFilter}
          >
            <MenuItem key={'Bookmarked'} value={'Bookmarked'}>Bookmarked</MenuItem>
            <MenuItem key={'Active'} value={'Active'}>Active</MenuItem>
            <MenuItem key={'Not_Started'} value={'Not_Started'}>Not Started</MenuItem>
            <MenuItem key={'Current_Box'} value={'Current_Box'}>Current Box</MenuItem>
          </Select>
        </FormControl>
        <TextField id="filled-basic" label="Search" variant="filled" sx={{background: 'white', margin: '8px', borderRadius: '4px'}}/>
      </LibraryFilterWrapper>
      <ActivitiesWrapper>
        {sparkBoxes?.map(box => {
          const userActivity = userActivities.find(ua => ua.id === box.user_activitiesID)
          const activity = allActivities.find(a => a.id === userActivity?.activitiesID)
          return (<ActivityCard key={box?.user_activitiesID} activity={activity?.data} />)
        })}
        {/* {allActivities.map(activity => ( <ActivityCard key={activity.id} activity={activity.data} />))} */}
      </ActivitiesWrapper>
      <BoxModal openModal={openModal} setOpenModal={setOpenModal} selectedFriend={selectedFriend} sparkBoxes={sparkBoxes} userActivities={userActivities} allActivities={allActivities}/>
    </SimpleWrapper>
    );
  }

  const BoxModal = ({openModal, setOpenModal, selectedFriend, sparkBoxes, userActivities, allActivities}) => {
  
    return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="Box drop"
      aria-describedby="Box of activities"
    >
      <Box sx={{
          background: 'white',
          transform: 'translate(5%, 30%)',
          width: '90%',
          height: '500px',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <p>Incoming Box Drop</p>
          <p>The following sparks are based on the interests you and {selectedFriend?.firstName} both indicated.</p>
          <ActivitiesWrapper>
          {sparkBoxes?.map(box => {
            const userActivity = userActivities.find(ua => ua.id === box.user_activitiesID)
            const activity = allActivities.find(a => a.id === userActivity?.activitiesID)
            return (<div>
              <ActivityCard key={box?.user_activitiesID} activity={activity?.data} />
              <p>{userActivity?.why}</p>
              </div>)
          })}
        </ActivitiesWrapper>
          <button onClick={() => setOpenModal(false)}>Let's Go</button>
      </Box>
    </Modal>
    )
  }
export default ActivitiesHome;