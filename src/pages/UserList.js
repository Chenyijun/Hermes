import React, { useEffect, useState, useRef } from "react";
import { doc, getDoc, getDocs, getUser, addDoc, query, orderBy, limit, collection, onSnapshot, serverTimestamp, where } from "firebase/firestore";
import { useCollectionData, useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { useFirestoreQuery } from '../hooks';
import { MessageList } from "semantic-ui-react";
import { auth } from "../firebase";
import {useAuthState} from 'react-firebase-hooks/auth'
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