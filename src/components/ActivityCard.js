import React from "react";
import { ActivityCardWrapper, ActivityCardBanner, CardLink, ActivityCardBody } from './activityComponents'


const ActivityCard = ({ activity, yourTurn, started }) => {
    return (
      <CardLink to={`/activity/${activity?.id}`} key={activity?.id}> 
        <ActivityCardWrapper started={started}>
          <ActivityCardBanner yourTurn={yourTurn} started={started}><p>{yourTurn ? "Your Turn" : "Their Turn"}</p></ActivityCardBanner>
          <ActivityCardBody>
            <p>{activity?.title || 'activity title'}</p>
          </ActivityCardBody>
      </ActivityCardWrapper>
      </CardLink>
    );
  };

export default ActivityCard