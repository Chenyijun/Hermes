import React from "react";
import { ActivityCardWrapper, Tag, CardLink } from './activityComponents'


const ActivityCard = ({ activity }) => {
    return (
      <CardLink to={`/activity/${activity.id}`} key={activity.id}> 
        <ActivityCardWrapper>
          <p><b>{activity.title || 'activity title'}</b></p>
          <p>{activity.description || 'activity description'}</p>
          {activity.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
      </ActivityCardWrapper>
      </CardLink>
    );
  };

export default ActivityCard