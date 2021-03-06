import React, {useState} from "react";
import { MessageWrapper, MessageTextWrapper, TimeText } from "./chatComponents";
import moment from 'moment'
import Avatar from "./Avatar";
import { TextAnnotator } from "react-text-annotate";

const Message = ({ sender, text, sending, message, recieveTime, timeStamp, currDate }) => {
  const [value, setValue] = useState('')
  const sentTime = moment(timeStamp.toDate()).format('M/D/YY h:mma')
  const recieveAt = moment(recieveTime.toDate()).format('M/D/YY h:mma')
  const haveSent = () => {
    return moment(recieveTime.toDate()) <= moment(currDate)
  }

  return (
    <MessageWrapper key={message && message.id}>
      <Avatar user={sender} />
      <MessageTextWrapper sending={sending}>
        <TextAnnotator
          content={text}
          value={value}
          onChange={e => setValue(e)}
          getSpan={span => ({
            ...span,
            color: 'blue',
          })}
        />
        {text}
      </MessageTextWrapper>
      <TimeText>{haveSent() ? `Sent ${sentTime} > Received ${recieveAt}`:`Sent ${sentTime} > Sending... (will receive at ${recieveAt})`}</TimeText>
      {/* h:mma or HH:mm for military time*/}
    </MessageWrapper>
  );
};

export default Message