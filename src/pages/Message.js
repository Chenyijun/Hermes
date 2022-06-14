import React from "react";
import { MessageWrapper, MessageTextWrapper } from '../components/wrappers'
import moment from 'moment'
import { Avatar, DefaultAvatar } from '../components/chatComponents'

const Message = ({ sender, text, sending, message, timeStamp }) => {

    return (
      <MessageWrapper key={message && message.id} sending={sending}>
          {sender && sender.avatar ? 
				<Avatar small alt='avatar'src={sender && sender.avatar} text={sender&& sender.name} />
				: <DefaultAvatar small>{sender && sender.name}</DefaultAvatar>}
          <p>{sender && sender.name}</p>
          <p>{timeStamp && moment(timeStamp.toDate()).format('MMMM Do YYYY, h:mm a')}</p>
          <MessageTextWrapper>{text}</MessageTextWrapper>
      </MessageWrapper>
    );
  };

export default Message