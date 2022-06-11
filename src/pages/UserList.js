import React, { useEffect } from "react";
import { UserListWrapper } from '../components/wrappers'

const UserList = ({ user, users, loading, navigate }) => {

	useEffect(() => {
		if (loading) return;
		if (!user) return navigate("/");
	}, [user, loading]);

	const friends = user && users && users.filter(friend => friend.uid !== user.uid);

	return (
		<UserListWrapper>
			Friends List
			<ul>
				{user && users && friends.map(friend => {
				return (
						<li key={friend.uid}>{friend.name}</li>
				)})}
			</ul>
		</UserListWrapper>
	);
  };

export default UserList