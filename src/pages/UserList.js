import React from "react";
import { UserListWrapper } from '../components/wrappers'
import { UserButton } from "../components/navComponents";
import Avatar from "../components/Avatar";

const UserList = ({ user, users, setSelectedFriend, selectedFriend, setNavState, navState}) => {

	const friends = user && users && users.filter(friend => friend.uid !== user.uid);

	const onProfileClick = () => {
		setSelectedFriend(null)
		setNavState('profile')
	}

	const onUserClick = (user) => {
		setSelectedFriend(user)
		setNavState('dashboard')
	}

	return (
		<UserListWrapper>
			{user && users && friends.map(friend => {
			return (
					<UserButton key={friend.uid} onClick={()=>onUserClick(friend)} selected={selectedFriend?.uid === friend.uid}>
						<Avatar user={friend} />
						{friend.name}
					</UserButton>
			)})}
			<UserButton key={'addFriend'}>
				<Avatar />
				Add Friend
			</UserButton>
			<UserButton onClick={()=>onProfileClick()} selected={navState==='profile'}>
				<Avatar user={user} />
				{user.name || 'My Profile'}
			</UserButton>
		</UserListWrapper>
	);
  };

export default UserList