import React, {useState} from "react";
import { AvatarBubble, DefaultAvatarBubble } from './chatComponents'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ReactTooltip from "react-tooltip";

const Avatar = ({ user, size, all }) => {
    const [tooltip, showTooltip] = useState(false)
    const initials = user ? user.firstName?.charAt(0) + user.lastName?.charAt(0) : "";

    return (
      <div
        onMouseEnter={() => showTooltip(true)}
        onMouseLeave={() => {
          showTooltip(false);
        }}
        data-tip={all && `${user?.firstName} ${user?.lastName}`}
      >
        {user ? 
          user?.avatar ?
            <AvatarBubble size={size || 'small'} alt='avatar' src={user?.avatar} text={initials}/>
            : <DefaultAvatarBubble size={size || 'small'}><p>{initials}</p></DefaultAvatarBubble>
          :  all ? 
            <DefaultAvatarBubble size={size || 'small'} white><p><PeopleOutlineIcon /></p></DefaultAvatarBubble>
            : <DefaultAvatarBubble size={size || 'small'} white><p><PersonAddAltIcon/></p></DefaultAvatarBubble>
        }
        {all && tooltip && user && <ReactTooltip place='left' type='light' globalEventOff='click'/>}
      </div>
    );
  };

export default Avatar