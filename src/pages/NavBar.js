import React from "react";
import { SideNav } from "../components/wrappers"
import { logOut } from "../firebase";


function NavBar({name}) {

  return (
    <SideNav>
        <a href="/dashboard">Chat</a>
        <a href="/activities">Activities</a>
        <p>{name}</p>
        <button onClick={logOut}>
          Logout
         </button>
    </SideNav>
  );
}
export default NavBar;