import React from "react";
import { AvatarBubble, DefaultAvatarBubble } from './chatComponents'

const Avatar = ({ user }) => {
    const initials = user ? user.firstName.charAt(0) + user.lastName.charAt(0) : "";

    return (
      <div>
      {user ? 
        user?.avatar ?
          <AvatarBubble small alt='avatar' src={user?.avatar} text={initials} />
          : <DefaultAvatarBubble small><p>{initials}</p></DefaultAvatarBubble>
        :  <DefaultAvatarBubble small><p>+</p></DefaultAvatarBubble>
      }
      </div>
    );
  };

export default Avatar