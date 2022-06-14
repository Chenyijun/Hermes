import React from "react";
import { SideNav } from "../components/wrappers"
import { logOut } from "../firebase";
import { Avatar, DefaultAvatar } from '../components/chatComponents'
import { currentUser } from "../firebase";




const NavBar = ({user}) =>{
  console.log('nav user', user)
  console.log('auth user', currentUser)

  return (
    <SideNav>
        <a href="/chat">Chat</a>
        <a href="/activities">Activities</a>
        <p>{currentUser && currentUser.name}</p>
        {(currentUser && currentUser.avatar) ? 
          <Avatar small alt='avatar'src={currentUser && currentUser.avatar} text={currentUser && currentUser.name} />
          : <DefaultAvatar small>{currentUser && currentUser.name}</DefaultAvatar>}
        <a href="/profile">Profile</a>
        <button onClick={logOut}>
          Logout
         </button>
    </SideNav>
  );
}
export default NavBar;