import React from "react";
import Avatar from "../components/Avatar";
import { NavButton, TopNavBar, ThreeTabs, NameWrapper } from "../components/navComponents";

const TopNav = ({friend, navState, setNavState, timeDelay, setTimeDelay, admin}) =>{

  return (
    <TopNavBar>
      <NameWrapper>
          <Avatar user={friend} />
          {admin && 
          <div>
            <p>{friend?.name || "FRIEND NAME"} {timeDelay && `[TIME DELAYED]`}</p>
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