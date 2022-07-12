import React from "react";
import { Header2, WhiteText, Stats } from "../components/mainComponents";
import { SimpleWrapper } from "../components/wrappers";

function Dashboard({user, selectedFriend}) {

  return (
    <SimpleWrapper>
      <Stats>
        <WhiteText>You and {selectedFriend?.firstName} Have...</WhiteText>
        <WhiteText>X Completed Activities</WhiteText>
        <WhiteText>X Opened Boxes</WhiteText>
        <WhiteText>X Memories Created</WhiteText>
      </Stats>
      <Header2>Activity Log</Header2>
      <WhiteText>No Activities at the moment, head to spark to start one!</WhiteText>
      <Header2>Highlights</Header2>
      <WhiteText>Go create some memories :)</WhiteText>
    </SimpleWrapper>
  );
}
export default Dashboard;