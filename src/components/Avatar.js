import React from "react";
import { AvatarBubble, DefaultAvatarBubble } from './chatComponents'

const Avatar = ({ user, size }) => {
    const initials = user ? user.firstName?.charAt(0) + user.lastName?.charAt(0) : "";

    return (
      <>
      {user ? 
        user?.avatar ?
          <AvatarBubble size={size || 'small'} alt='avatar' src={user?.avatar} text={initials} />
          : <DefaultAvatarBubble size={size || 'small'}><p>{initials}</p></DefaultAvatarBubble>
        :  <DefaultAvatarBubble size={size || 'small'}><p>+</p></DefaultAvatarBubble>
      }
      </>
    );
  };

export default Avatar