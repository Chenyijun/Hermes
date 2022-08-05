import React, {useState} from "react";
import { MessageWrapper, MessageTextWrapper, TimeText, CommentButton, CommentButtonWrapper, NotificationBubble } from "./chatComponents";
import moment from 'moment'
import Avatar from "./Avatar";
import InsertCommentIcon from '@mui/icons-material/InsertComment';

const Message = ({ sender, text, sending, message, recieveTime, timeStamp, currDate, setDetails, allChat }) => {
  const sentTime = moment(timeStamp.toDate()).format('M/D/YY h:mma')
  const recieveAt = moment(recieveTime.toDate()).format('M/D/YY h:mma')
  const haveSent = () => {
    return moment(recieveTime.toDate()) <= moment(currDate)
  }
  const messageDetails = {id: message.id, sender: sender, text: text, sentTime: sentTime, recieved: recieveAt, nestedMessage: message.nestedMessage, haveSent: haveSent()}

  return (
    <>
    <MessageWrapper key={message && message.id}>
      <Avatar user={sender} data-tip={sender?.firstName} all={allChat}/>
      <MessageTextWrapper sending={sending}>
        {text}
      </MessageTextWrapper>
      <TimeText>{haveSent() ? `${sender.firstName} sent this at ${sentTime}`:`Estimated Time of Arrival: ${recieveAt}`}</TimeText>
      {/* <TimeText>{haveSent() ? `Sent ${sentTime} > Received ${recieveAt}`:`Sent ${sentTime} > Sending... (will receive at ${recieveAt})`}</TimeText> */}
      {/* h:mma or HH:mm for military time*/}
      <CommentButtonWrapper onClick={()=>setDetails(messageDetails)}>
        <CommentButton sending={sending}><InsertCommentIcon/></CommentButton>
        {message?.nestedMessage?.length > 0 && <NotificationBubble/>}
      </CommentButtonWrapper>
    </MessageWrapper>
    </>
  );
};

export default Message