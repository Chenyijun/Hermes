import React from "react";
import { UserListWrapper } from '../components/wrappers'
import { Avatar, DefaultAvatar, FriendBubble } from '../components/chatComponents'

const UserList = ({ user, users, setSelectedRecipient, selectedRecipient}) => {

	const friends = user && users && users.filter(friend => friend.uid !== user.uid);

	const toggleRecipient = (friend) => {
		setSelectedRecipient(friend === selectedRecipient ? null : friend)
	}

	return (
		<UserListWrapper>
			Friends List
				{user && users && friends.map(friend => {
				return (
						<button key={friend.uid} onClick={()=>toggleRecipient(friend)}>
							<FriendBubble selected={selectedRecipient?.uid === friend.uid}>
								{friend && friend.avatar ? 
									<Avatar small alt='avatar'src={friend && friend.avatar} text={friend && friend.name} />
									: <DefaultAvatar small>{friend && friend.name}</DefaultAvatar>}
								{friend.name}
							</FriendBubble>
						</button>
				)})}
		</UserListWrapper>
	);
  };

export default UserList