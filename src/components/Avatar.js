import React from "react";
import { AvatarBubble, DefaultAvatarBubble } from './chatComponents'

const Avatar = ({ user }) => {
    console.log(user)
    const initials = user ? 
      (user.firstname ? 
        user.firstName.charAt(0) + ' ' + user.lastName.charAt(0) : user.name && user.name.charAt(0))
      : "";

    return (
      <div>
      {user ? 
        user?.avatar ?
          <AvatarBubble small alt='avatar' src={user?.avatar} text={initials} />
          : <DefaultAvatarBubble small>{initials}</DefaultAvatarBubble>
        :  <DefaultAvatarBubble small>+</DefaultAvatarBubble>
      }
      </div>
    );
  };

export default Avatar