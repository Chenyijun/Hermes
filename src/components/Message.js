import React from "react";
import { MessageWrapper, MessageTextWrapper, TimeText } from "./chatComponents";
import moment from 'moment'
import Avatar from "./Avatar";

const Message = ({ sender, text, sending, message, recieveTime, timeStamp, date }) => {
  const sentTime = moment(timeStamp.toDate()).format('M/D/YY HH:mm')
  const recieveAt = moment(recieveTime.toDate()).format('M/D/YY HH:mm')
  const haveSent = () => {
    return moment(recieveTime.toDate()) < moment(date)
  }
  console.log('msg', text)
  console.log('sending', sending)

    return (
      <MessageWrapper key={message && message.id}>
        <Avatar user={sender} />
        <MessageTextWrapper sending={sending}>{text}</MessageTextWrapper>
        <TimeText>{haveSent() ? `Sent ${sentTime} > Recieved ${recieveAt}`:`Sent ${sentTime} > Sending... (will recieve at ${recieveAt})`}</TimeText>
        {/* h:mma or HH:mm for military time*/}
      </MessageWrapper>
    );
  };

export default Message