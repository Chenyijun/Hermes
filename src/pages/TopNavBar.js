import React from "react";
import { Avatar, DefaultAvatar, FriendBubble } from '../components/chatComponents'
import { NavButton, TopNavBar, ThreeTabs, NameWrapper } from "../components/navComponents";

const TopNav = ({friend, navState, setNavState}) =>{

  return (
    <TopNavBar>
      <NameWrapper>
        {(friend?.avatar) ? 
          <Avatar small alt='avatar'src={friend?.avatar} text={friend?.name} />
          : <DefaultAvatar small>{friend?.name}</DefaultAvatar>}
          <p>{friend?.name || "FRIEND NAME"}</p>
      </NameWrapper>
      <ThreeTabs>
        <NavButton onClick={()=>setNavState('dashboard')} active={navState==='dashboard'}>Dashboard</NavButton>
        <NavButton onClick={()=>setNavState('sparks')} active={navState==='sparks'}>Sparks</NavButton>
        <NavButton onClick={()=>setNavState('messages')} active={navState==='messages'}>Messages</NavButton>
      </ThreeTabs>
    </TopNavBar>
  );
}
export default TopNav;