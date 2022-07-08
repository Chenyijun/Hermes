import React from "react";
import Avatar from "../components/Avatar";
import { NavButton, TopNavBar, ThreeTabs, NameWrapper, NameHeader } from "../components/navComponents";

const TopNav = ({friend, navState, setNavState, timeDelay, setTimeDelay, admin}) =>{
  console.log('FRIEND', friend)
  return (
    <TopNavBar>
      <NameWrapper>
          <Avatar user={friend} />
          <NameHeader>{friend?.firstName + ' ' + friend?.lastName || "FRIEND NAME"}</NameHeader>
          {admin && 
          <div>
            <p>{timeDelay && `[TIME DELAYED]`}</p>
            <button onClick={() => setTimeDelay(!timeDelay)}>{timeDelay ? 'Turn off time delay' : 'Turn on time delay'}</button>
          </div>}
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