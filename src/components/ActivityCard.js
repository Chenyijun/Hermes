import React from "react";
import { ActivityCardWrapper, Tag } from './activityComponents'
import { Link } from "react-router-dom";


const ActivityCard = ({ activity }) => {
    return (
      <Link to={`/activity/${activity.id}`} key={activity.id}> 
        <ActivityCardWrapper>
          {activity.title || 'activity title'}
          {activity.description || 'activity description'}
          {activity.tags.map(tag => <Tag>{tag}</Tag>)}
      </ActivityCardWrapper>
      </Link>
    );
  };

export default ActivityCard