import React from "react";
import Avatar from "../components/Avatar";
import { NavButton, TopNavBar, TwoTabs, NameWrapper, NameHeader } from "../components/navComponents";

const TopNav = ({friend, navState, setNavState, timeDelay, setTimeDelay, admin, small}) =>{
  return (
    <>
      {small ? 
        <TopNavBar>
        <NameWrapper>
            <Avatar user={friend} />
            <NameHeader black>{friend?.firstName + ' ' + friend?.lastName || "FRIEND NAME"}</NameHeader>
        </NameWrapper>
        <TwoTabs>
          <NavButton onClick={()=>setNavState('sparks')} active={navState==='sparks'}>Sparks</NavButton>
          <NavButton onClick={()=>setNavState('messages')} active={navState==='messages'}>Messages</NavButton>
        </TwoTabs>
      </TopNavBar>
      : <TopNavBar>
        <NameWrapper>
            <Avatar user={friend} />
            <NameHeader black>{friend?.firstName + ' ' + friend?.lastName || "FRIEND NAME"}</NameHeader>
            {admin && 
            <div>
              <p>{timeDelay && `[TIME DELAYED]`}</p>
              <button onClick={() => setTimeDelay(!timeDelay)}>{timeDelay ? 'Turn off time delay' : 'Turn on time delay'}</button>
            </div>}
        </NameWrapper>
        <TwoTabs>
          <NavButton onClick={()=>setNavState('sparks')} active={navState==='sparks'}>Sparks</NavButton>
          <NavButton onClick={()=>setNavState('messages')} active={navState==='messages'}>Messages</NavButton>
        </TwoTabs>
      </TopNavBar>
      }
    </>
  );
}
export default TopNav;