import React from "react";
import { UserListWrapper } from '../components/wrappers'
import { Avatar, DefaultAvatar, FriendBubble } from '../components/chatComponents'

const UserList = ({ user, users }) => {

	const friends = user && users && users.filter(friend => friend.uid !== user.uid);

	return (
		<UserListWrapper>
			Friends List
				{user && users && friends.map(friend => {
				return (
						<button key={friend.uid}>
							<FriendBubble>
								{friend && friend.avatar ? 
									<Avatar small alt='avatar'src={friend && friend.avatar} text={friend&& friend.name} />
									: <DefaultAvatar small>{friend && friend.name}</DefaultAvatar>}
								{friend.name}
							</FriendBubble>
						</button>
				)})}
		</UserListWrapper>
	);
  };

export default UserList