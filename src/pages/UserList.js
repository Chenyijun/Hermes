import React from "react";
import { UserListWrapper } from '../components/wrappers'
import { FriendBubble } from '../components/chatComponents'
import { UserButton } from "../components/navComponents";
import Avatar from "../components/Avatar";

const UserList = ({ user, users, setSelectedFriend, selectedFriend, setNavState}) => {

	const friends = user && users && users.filter(friend => friend.uid !== user.uid);

	const toggleRecipient = (friend) => {
		setSelectedFriend(friend === selectedFriend ? null : friend)
	}

	return (
		<UserListWrapper>
				{user && users && friends.map(friend => {
				return (
						<UserButton key={friend.uid} onClick={()=>toggleRecipient(friend)} selected={selectedFriend?.uid === friend.uid}>
							<Avatar user={friend} />
							{friend.name}
						</UserButton>
				)})}
			<UserButton onClick={()=>setNavState('profile')}>
				<Avatar user={user} />
				{user.name || 'My Profile'}
			</UserButton>
		</UserListWrapper>
	);
  };

export default UserList