import React from "react";
import { SideNav } from "../components/wrappers"
import { logOut } from "../firebase";
import Avatar from "../components/Avatar";

const NavBar = ({user}) =>{

  return (
    <SideNav>
        <a href="/home">Home</a>
        <a href="/chat">Chat</a>
        <a href="/activities">Activities</a>
        <a href="/profile">
          <Avatar user={user} />
        </a>
        <button onClick={logOut}>
          Logout
         </button>
    </SideNav>
  );
}
export default NavBar;