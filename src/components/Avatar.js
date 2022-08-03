import React from "react";
import { AvatarBubble, DefaultAvatarBubble } from './chatComponents'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const Avatar = ({ user, size, all }) => {
    const initials = user ? user.firstName?.charAt(0) + user.lastName?.charAt(0) : "";

    return (
      <>
      {user ? 
        user?.avatar ?
          <AvatarBubble size={size || 'small'} alt='avatar' src={user?.avatar} text={initials} />
          : <DefaultAvatarBubble size={size || 'small'}><p>{initials}</p></DefaultAvatarBubble>
        :  all ? 
          <DefaultAvatarBubble size={size || 'small'} white><p><PeopleOutlineIcon /></p></DefaultAvatarBubble>
          : <DefaultAvatarBubble size={size || 'small'} white><p><PersonAddAltIcon/></p></DefaultAvatarBubble>
      }
      </>
    );
  };

export default Avatar