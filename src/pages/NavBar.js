import React from "react";
import { SideNav } from "../components/wrappers"
import { logOut } from "../firebase";
import { Avatar, DefaultAvatar } from '../components/chatComponents'

const NavBar = ({user}) =>{

  return (
    <SideNav>
        <a href="/home">Home</a>
        <a href="/chat">Chat</a>
        <a href="/activities">Activities</a>
        <a href="/profile">
          {(user?.avatar) ? 
          <Avatar small alt='avatar'src={user?.avatar} text={user?.name} />
          : <DefaultAvatar small>{user?.name}</DefaultAvatar>}
        </a>
        <button onClick={logOut}>
          Logout
         </button>
    </SideNav>
  );
}
export default NavBar;