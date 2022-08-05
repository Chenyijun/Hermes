import React, {useEffect, useState} from "react";
import { SimpleWrapper } from "../components/wrappers"
import {db} from '../firebase'
import { doc, updateDoc} from '@firebase/firestore';
import {collection, query, orderBy, onSnapshot, where} from 'firebase/firestore'
import ActivityCard from "../components/ActivityCard";
import { ActivityFlex, LibraryFilterWrapper, BoxHeader, WhiteText} from "../components/activityComponents"
import { YellowButton, IconButton, Stats, StatButton } from "../components/mainComponents";
import { useCollectionData} from "react-firebase-hooks/firestore";
import { Header2 } from "../components/mainComponents"
import { ActivitiesWrapper, BoxActivitiesWrapper} from "../components/wrappers"
import { Modal, Box, Select, MenuItem, FormControl, InputLabel, TextField } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


function ActivitiesHome({user, selectedFriend}) {
  const [allActivities, setAllActivities] = useState([])
  const [sparkBoxes, setSparkBoxes] = useState(null)
  const [openModal, setOpenModal] = useState(selectedFriend && (sparkBoxes && sparkBoxes[0].sent === false) ? true : false)
  const [userActivities, setUserActivities] = useState([])
  const [filterSelect, setFilterSelect] = useState('')
  const [sort, setSort] = useState('your_turn')
  const [search, setSearch] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const canView = (users) => {
    // const userArray = [user?.uid, selectedFriend?.uid]
    // return userArray.every(user => users?.includes(user))
    // allow everyone to get boxes
    return true
  }

  // useEffect(() => {
  //   // setOpenModal(selectedFriend && (sparkBoxes && sparkBoxes[0].sent === false) ? true : false)
  //   //allow everyone to get boxes since technically boxes are per set of
  //   setOpenModal((selectedFriend && user.box) ? true : false)
  // }, [sparkBoxes]);

  useEffect(() => {
    // setOpenModal(selectedFriend && (sparkBoxes && sparkBoxes[0].sent === false) ? true : false)
    //allow everyone to get boxes since technically boxes are per set of
    setOpenModal((selectedFriend && user.box && (sparkBoxes && sparkBoxes[0].seenBy?.includes(user.uid))) ? true : false)
  }, [user]);

  useEffect(() => {
    if (selectedFriend){
      setIsLoading(false)
    }
  });

  const handleFilter = (event) => {
    setFilterSelect(event.target.value);
  }
  const handleSort = (event) => {
    setSort(event.target.value);
  }

  const handleModalClose = async (box) => {
    console.log('modal close')
    const seenBy = box.seenBy.push(user.uid)
    await updateDoc(doc(db, "boxes", box.id), {
      sent: true,
      seenBy: seenBy
    });
    await updateDoc(doc(db, "users", user.uid), {
      box: false
    });
    setOpenModal(false)
  }

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

  /* Get all boxes from firestore in realtime */
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

  /* Get all user_activities from firestore in realtime */
  useEffect(() => {
    const q = query(collection(db, 'user_activities'))
    onSnapshot(q, (querySnapshot) => {
      setUserActivities(querySnapshot.docs.map(doc => ({
        id: doc.id,
        activitiesID: doc.data().activitiesID,
        users: doc.data().users,
        why: doc.data().why,
        status: doc.data().status
      })))
    })
  })

  return (
    <SimpleWrapper>
      {isLoading ? (<div>Loading</div>) :
      <>
      <Stats>
        <WhiteText>{`You and ${selectedFriend.firstName} have...`}</WhiteText>
        <StatButton>12 Completed Sparks</StatButton>
      </Stats>
      <Header2>Active Sparks</Header2>
        <WhiteText>No active sparks at this time. Please click in your Library to start one!</WhiteText>
        <ActivitiesWrapper>
        {userActivities.map(ua => {
          if (ua.status !== 'not_started' && ua.status !== 'not_sent'){
            const activity = allActivities.find(a => a.id === ua.activitiesID)
            return (canView(ua.users) && <ActivityCard key={ua.id} activity={activity?.data} />)
          }
        })}
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
        {userActivities.map(ua => {
          const activity = allActivities.find(a => a.id === ua.activitiesID)
          return (canView(ua.users) && <ActivityCard key={ua.id} activity={activity?.data} newActivity />)
        })}
      </ActivitiesWrapper>
      <BoxModal openModal={openModal} handleModalClose={handleModalClose} user={user} selectedFriend={selectedFriend} sparkBoxes={sparkBoxes} userActivities={userActivities} allActivities={allActivities}/>
      </>}
    </SimpleWrapper>
    );
  }

  const BoxModal = ({openModal, handleModalClose, user, selectedFriend, sparkBoxes, userActivities, allActivities}) => {
    const userArray = [user.uid, selectedFriend.uid]
    const sparkBox = sparkBoxes && sparkBoxes[0]
    return (
    <Modal
      open={openModal}
      onClose={() => handleModalClose(sparkBox)}
      aria-labelledby="Box drop"
      aria-describedby="Box of activities"
    >
      <Box sx={{
          background: 'black',
          transform: 'translate(3%, 3%)',
          width: '90%',
          height: '90%',
          padding: '1rem',
          paddingTop: '5%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '4px'
        }}>
          <IconButton modal onClick={()=> handleModalClose(sparkBox)}>
           <CloseRoundedIcon style={{ color: '#fff', height: '45px', width: '45px' }} />
          </IconButton>
          <BoxHeader>Incoming Box Drop</BoxHeader>
          <WhiteText>The following sparks are based on the interests you and {selectedFriend?.firstName} both indicated.</WhiteText>
          <BoxActivitiesWrapper>
            {sparkBox?.user_activitiesID?.map(uaID => {
                const userActivity = userActivities.find(ua => ua.id === uaID)
                const activity = allActivities.find(a => a.id === userActivity?.activitiesID)
                return (<div key={uaID} >
                  <ActivityCard activity={activity?.data} newActivity/>
                  <WhiteText>{userActivity?.why}</WhiteText>
                  </div>)
              })
            }
        </BoxActivitiesWrapper>
          <YellowButton onClick={() => handleModalClose(sparkBox)}>Let's Go</YellowButton>
      </Box>
    </Modal>
    )
  }
export default ActivitiesHome;