import React from "react";
import { MessageWrapper, MessageTextWrapper } from '../components/wrappers'
import moment from 'moment'

const Message = ({ sender, text, sending, message, timeStamp }) => {

    return (
      <MessageWrapper key={message && message.id} sending={sending}>
          <p>{sender && sender.name}</p>
          <p>{timeStamp && moment(timeStamp.toDate()).format('MMMM Do YYYY, h:mm a')}</p>
          <MessageTextWrapper>{text}</MessageTextWrapper>
      </MessageWrapper>
    );
  };

export default Message