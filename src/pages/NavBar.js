import React from "react";
import { SideNav } from "../components/wrappers"
import { logOut } from "../firebase";


function NavBar({name}) {

  return (
    <SideNav>
        <a href="/chat">Chat</a>
        <a href="/activities">Activities</a>
        <p>{name}</p>
        <a href="/profile">Profile</a>
        <button onClick={logOut}>
          Logout
         </button>
    </SideNav>
  );
}
export default NavBar;