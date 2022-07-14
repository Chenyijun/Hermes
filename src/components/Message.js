import React from "react";
import { MessageWrapper, MessageTextWrapper, TimeText } from "./chatComponents";
import moment from 'moment'
import Avatar from "./Avatar";

const Message = ({ sender, text, sending, message, recieveTime, timeStamp, currDate }) => {
  const sentTime = moment(timeStamp.toDate()).format('M/D/YY h:mma')
  const recieveAt = moment(recieveTime.toDate()).format('M/D/YY h:mma')
  const haveSent = () => {
    return moment(recieveTime.toDate()) <= moment(currDate)
  }
  console.log('msg', text)
  console.log('sending', sending)

    return (
      <MessageWrapper key={message && message.id}>
        <Avatar user={sender} />
        <MessageTextWrapper sending={sending}>{text}</MessageTextWrapper>
        <TimeText>{haveSent() ? `Sent ${sentTime} > Received ${recieveAt}`:`Sent ${sentTime} > Sending... (will receive at ${recieveAt})`}</TimeText>
        {/* h:mma or HH:mm for military time*/}
      </MessageWrapper>
    );
  };

export default Message