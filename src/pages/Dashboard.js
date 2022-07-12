import React from "react";
import { Header2, WhiteText, Stats } from "../components/mainComponents";
import { ActivitiesWrapper, SimpleWrapper } from "../components/wrappers";
import HighlightCard from "../components/HighlightCard";
import ActivityCard from "../components/ActivityCard";

function Dashboard({selectedFriend}) {

  return (
    <SimpleWrapper>
      <Stats>
        <WhiteText>You and {selectedFriend?.firstName} Have...</WhiteText>
        <WhiteText>X Completed Activities</WhiteText>
        <WhiteText>X Opened Boxes</WhiteText>
        <WhiteText>X Memories Created</WhiteText>
      </Stats>
      <Header2>Activity Log</Header2>
      <ActivitiesWrapper>
        <ActivityCard activity={{id: 'QxzY3tEVFLZVHDCDTpI1', title: 'Create a journal together'}} yourTurn started />
        <ActivityCard activity={{id: 'rJnR2XbH8yQm86LfP3sh', title: 'Character Chat'}} yourTurn={false} started />
      </ActivitiesWrapper>
      <Header2>Highlights</Header2>
      <HighlightCard title="Created a Song Together" banner="Month 2" friendName={selectedFriend?.firstName}/>
    </SimpleWrapper>
  );
}
export default Dashboard;