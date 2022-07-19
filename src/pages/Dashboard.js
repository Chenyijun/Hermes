import React, {useState} from "react";
import { Header2, WhiteText, Stats } from "../components/mainComponents";
import { DashboardWrapper, ActivitiesWrapper, SimpleWrapper } from "../components/wrappers";
import { DashHeaderWrapper, NameWrapper, NameHeader } from "../components/navComponents"
import HighlightCard from "../components/HighlightCard";
import ActivityCard from "../components/ActivityCard";
import Avatar from "../components/Avatar";
import Profile from "./Profile";
import { StatButton } from "../components/mainComponents"


function Dashboard({user}) {
  const [isSettings, setIsSettings] = useState(false)

  return (
    <DashboardWrapper>
      <DashHeaderWrapper>
      <div></div>
      <NameWrapper>
          <Avatar user={user} />
          <NameHeader>
            {isSettings ? 'My Settings' : 'My Dashboard'}
          </NameHeader>
      </NameWrapper>
      <button onClick={() => setIsSettings(!isSettings)}>
        {isSettings ? 'Close' : 'Settings'}
      </button>
      </DashHeaderWrapper>
      <SimpleWrapper>
        {isSettings ? <Profile user={user} /> : 
        <div>
           <Stats>
          <WhiteText>Overall, You Have:</WhiteText>
          <StatButton>12 Completed Sparks</StatButton>
        </Stats>
        <Header2>Sparks Log</Header2>
        <ActivitiesWrapper>
          <ActivityCard activity={{id: 'QxzY3tEVFLZVHDCDTpI1', title: 'Create a journal together'}} yourTurn started />
          <ActivityCard activity={{id: 'rJnR2XbH8yQm86LfP3sh', title: 'Character Chat'}} yourTurn={false} started />
        </ActivitiesWrapper>
        <Header2>Conversation Log</Header2>
        <Header2>Memories</Header2>
        <HighlightCard title="Created a Song Together" banner="Month 2" friendName={'test'}/>
        </div>
        }
      </SimpleWrapper>
    </DashboardWrapper>
  );
}
export default Dashboard;