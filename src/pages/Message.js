import React from "react";
import { MessageWrapper, MessageTextWrapper } from '../components/wrappers'

const Message = ({ sender, text, sending, message }) => {

    return (
      <MessageWrapper key={message && message.id} sending={sending}>
          <p>{sender && sender.name}</p>
          <MessageTextWrapper>{text}</MessageTextWrapper>
      </MessageWrapper>
    );
  };

export default Message