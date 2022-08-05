import React from "react";
import { ActivityCardWrapper, ActivityCardBanner, CardLink, ActivityCardBody, ActivityCardImage, TurnBanner } from './activityComponents'


const ActivityCard = ({ activity, yourTurn, started }) => {
    return (
      <CardLink to={`/activity/${activity?.id}`} key={activity?.id}> 
        <ActivityCardWrapper started={started}>
          <ActivityCardBanner yourTurn={yourTurn} started={started}>
            <TurnBanner>
              <p>{yourTurn ? "Your Turn" : "Their Turn"}</p>
            </TurnBanner>
          </ActivityCardBanner>
          <ActivityCardImage />
          <ActivityCardBody>
            <p>{activity?.title || 'activity title'}</p>
          </ActivityCardBody>
      </ActivityCardWrapper>
      </CardLink>
    );
  };

export default ActivityCard