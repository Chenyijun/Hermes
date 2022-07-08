import React, { useState, useEffect } from "react";
import { UserListWrapper } from '../components/wrappers'
import { UserButton } from "../components/navComponents";
import { doc, updateDoc} from '@firebase/firestore';
import { db } from '../firebase';
import Avatar from "../components/Avatar";
import { Modal, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { logOut } from '../firebase';


const UserList = ({ user, users, setSelectedFriend, selectedFriend, setNavState, navState}) => {
  const [openModal, setOpenModal] = useState(false)
	const [myFriendsList, setMyFriendsList] = useState([])
	const allUsers = users?.filter(friend => friend.uid !== user.uid);
	const myFriends = myFriendsList && users?.filter(friend => myFriendsList.includes(friend.uid));
	// console.log("users", users)
	// console.log("friends", friends)
	console.log('friends list', myFriendsList)
	console.log("my friends", myFriends)

	useEffect( () => {
    setMyFriendsList(user?.friends)
  },[user])


	const onProfileClick = () => {
		setSelectedFriend(user)
		setNavState('profile')
	}

	const onUserClick = (user) => {
		setSelectedFriend(user)
		setNavState('dashboard')
	}

	return (
		<UserListWrapper>
			<UserButton onClick={()=>onProfileClick()} selected={navState === 'profile'}>
				<Avatar user={user} />
				{user?.name || 'My Profile'}
			</UserButton>
			{user && myFriends?.map(friend => {
			return (
					<UserButton key={friend.uid} onClick={()=>onUserClick(friend)} selected={selectedFriend?.uid === friend.uid}>
						<Avatar user={friend} />
						{friend.firstName}
					</UserButton>
			)})}
			<UserButton key={'addFriend'} onClick={()=>setOpenModal(true)}>
				<Avatar />
				Add Friend
			</UserButton>
			<button onClick={logOut}>Logout</button>
			<UserModal openModal={openModal} setOpenModal={setOpenModal} allUsers={allUsers} user={user} myFriendsList={myFriendsList}/>
		</UserListWrapper>
	);
};

const UserModal = ({openModal, setOpenModal, allUsers, user, myFriendsList}) => {
	const [newFriend, setNewFriend] = useState('')
	
	const handleChange = (event) => {
    setNewFriend(event.target.value);
  }

	const addFriend = async () => {		
		try {
			myFriendsList.push(newFriend.uid)
			console.log(myFriendsList)
			await updateDoc(doc(db, "users", user.uid), {
				friends: myFriendsList
			});
			setOpenModal(false)
		} catch (err) {
			console.log(err.message)
		}
}

  return (
	<Modal
		open={openModal}
		onClose={() => setOpenModal(false)}
		aria-labelledby="Add Friend"
		aria-describedby="Add friend from list of users"
	>
		<Box sx={{
				background: 'white',
				transform: 'translate(75%, 30%)',
				width: '400px',
				height: '400px'
      }}>
			<FormControl sx={{ m: 1, minWidth: 80 }}>
				<InputLabel id="demo-simple-select-label">Add Friend</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={newFriend}
					label="Age"
					onChange={handleChange}
				>
					{allUsers?.map(friend => {
						return (
								<MenuItem key={friend.firstName} value={friend}>
									{friend.firstName + " " + friend.lastName}
								</MenuItem>
						)})}
				</Select>
				<button onClick={()=>addFriend()}>Add</button>
			</FormControl>
		</Box>
	</Modal>
  )
}
export default UserList