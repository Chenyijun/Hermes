import React, { useState, useEffect } from "react";
import { UserListWrapper } from '../components/wrappers'
import { UserButton, UserButtonText, Divider } from "../components/navComponents";
import { doc, updateDoc} from '@firebase/firestore';
import { db } from '../firebase';
import Avatar from "../components/Avatar";
import { Modal, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";


const UserList = ({ user, users, setSelectedFriend, selectedFriend, setNavState, navState}) => {
  const [openModal, setOpenModal] = useState(false)
	const [myFriendsList, setMyFriendsList] = useState([])
	const allUsers = user && users?.filter(friend => (friend.uid !== user.uid) && !myFriendsList?.includes(friend.uid));
	const myFriends = myFriendsList && users?.filter(friend => myFriendsList.includes(friend.uid));

	useEffect( () => {
    setMyFriendsList(user?.friends)
  },[user])


	const onProfileClick = () => {
		setSelectedFriend(user)
		setNavState('profile')
	}

	const onUserClick = (user) => {
		setSelectedFriend(user)
		setNavState('sparks')
	}

	const onAllChatClick = () => {
		setSelectedFriend(null)
		setNavState('messages')
	}

	return (
		<UserListWrapper>
			<UserButton onClick={()=>onProfileClick()} selected={selectedFriend?.uid === user?.uid}>
				<Avatar user={user} />
				<UserButtonText>{user?.name || 'Me'}</UserButtonText>
			</UserButton>
			<Divider/>
			<UserButton onClick={()=>onAllChatClick()} selected={selectedFriend === null}>
				<Avatar all />
				<UserButtonText>All Chat</UserButtonText>
			</UserButton>
			<Divider/>
			{user && myFriends?.map(friend => {
			return (
					<UserButton key={friend.uid} onClick={()=>onUserClick(friend)} selected={selectedFriend?.uid === friend.uid}>
						<Avatar user={friend} />
						<UserButtonText>{friend.firstName}</UserButtonText>
					</UserButton>
			)})}
			<UserButton key={'addFriend'} onClick={()=>setOpenModal(true)}>
				<Avatar />
				<UserButtonText>Add Friend</UserButtonText>
			</UserButton>
			<UserModal openModal={openModal} setOpenModal={setOpenModal} allUsers={allUsers} user={user} myFriendsList={myFriendsList}/>
		</UserListWrapper>
	);
};

const UserModal = ({openModal, setOpenModal, allUsers, user, myFriendsList}) => {
	const [newFriend, setNewFriend] = useState('')
	const [theirFriendsList, setTheirFriendsList] = useState([])
	
	const handleChange = (event) => {
    setNewFriend(event.target.value);
  }

	useEffect( () => {
    setTheirFriendsList(newFriend?.friends)
		console.log('their friends list', theirFriendsList)
  },[newFriend])

	const addFriend = async () => {		
		try {
			myFriendsList.push(newFriend.uid)
			theirFriendsList.push(user.uid)
			await updateDoc(doc(db, "users", user.uid), {
				friends: myFriendsList
			});
			await updateDoc(doc(db, "users", newFriend.uid), {
				friends: theirFriendsList
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
				transform: 'translate(100%, 100%)',
				width: '225px',
				padding: '1rem',
      }}>
				{allUsers?.length === 0 ?
					<p>All the users on the platform is already your friend! Invite your friends to join Spark!</p>	
					: <FormControl sx={{ m: 1, minWidth: 200 }}>
						<InputLabel id="demo-simple-select-label">Add Friend</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={newFriend}
							label="Age"
							onChange={handleChange}
							disabled={allUsers?.length === 0}
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
				}
		</Box>
	</Modal>
  )
}
export default UserList