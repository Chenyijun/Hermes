import React from "react";
import { MessageWrapper, MessageTextWrapper } from '../components/wrappers'

const Message = ({ sender, text, sending }) => {

    return (
      <MessageWrapper>
          <p>{sender}</p>
          <MessageTextWrapper>{text}</MessageTextWrapper>
      </MessageWrapper>
    );
  };

export default Message