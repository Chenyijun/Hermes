import React, {useState, useEffect} from "react";
import { MessageTextWrapper, TimeText } from "../components/chatComponents";
import moment from 'moment'
import Avatar from "../components/Avatar";
import { TextAnnotator } from "react-text-annotate";
import { DetailedMessageWrapper, DetailedMessageHeader, MessageTitle, MainText, SmallText, NotesBackground, CommentBody, CommentWrapper, HighlightedText, CommentHeader } from "../components/messageComponents";
import { doc, updateDoc} from '@firebase/firestore';
import {db} from '../firebase'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "../components/mainComponents";
import { accentYellow } from "../constants";


const DetailedMessage = ({message, setShowDetails, user}) => {
  const [value, setValue] = useState(message.nestedMessage || [])
  const [tag, setTag] = useState('')
  const [highlight, setHighlight] = useState(null)
  const [comment, setComment] = useState('')

  const updateMessage = async () => {
    const docRef = doc(db, "messages", message.id)
    await updateDoc(docRef, {
      nestedMessage: value
    });
    console.log('updateMessage')
  }

  useEffect(() => {
    setHighlight(value?.slice(-1)[0] || null)
  }, [value]);

  const handleSubmit = (e) => {
    const newValue = value
    newValue[newValue.length-1].comment = comment
    setValue(newValue)
    setHighlight(null)
    setComment('')
    updateMessage()
  }

  const handleChange = (e) => {
    if (value.length === 0 || e.length > value.length) {
      if (value.length > 0 && value[value.length-1].comment === null) {
        console.log('empty')
        const newValue = value.filter((v) => {
          return v.id !== comment.id;
        })
        setValue(newValue)
        console.log('HERE', newValue)
      }
      setValue(e)
    } else {
      console.log('click')
    }

  }

  const deleteComment = (comment) => {
    console.log('COMMENT', comment)
    const newValue = value.filter((v) => {
      return v.id !== comment.id;
    })
    setValue(newValue)
    updateMessage()
    console.log('message deleted')
  }

  return (
    <DetailedMessageWrapper>
      <div>
        <DetailedMessageHeader>
          <IconButton onClick={()=>setShowDetails(false)} white><ArrowBackIosIcon/></IconButton>
          <MessageTitle>Message from {message.sender.firstName} </MessageTitle>
        </DetailedMessageHeader>
        <SmallText padding='0 3rem' marginTop='0'>{message.haveSent ? `Sent ${message.sentTime} > Received ${message.recieved}`:`Sent ${message.sentTime} > Sending... (will receive at ${message.recieved})`}</SmallText>
        <MainText>
          {message?.text && <TextAnnotator
            content={message.text}
            value={value}
            onChange={e => handleChange(e)}
            getSpan={span => ({
              ...span,
              id: `${span.start}-${span.end}`,
              color: accentYellow,
              comment: null,
              user: user
            })}
          />}
        </MainText>
      </div>
      <NotesBackground>
        <MessageTitle>Notes</MessageTitle>
        {value.length === 0 && <SmallText>Highlight text to start annotating!</SmallText>}
        {highlight && <CommentWrapper>
          <Avatar user={user} size='xs' />
          <CommentBody>
            <CommentHeader>
              <HighlightedText>"{highlight?.text}"</HighlightedText>
            </CommentHeader>
            <input type='text' value={comment} onChange={(e)=>setComment(e.target.value)} />
            <button onClick={()=>handleSubmit()}>Submit</button>
          </CommentBody>
        </CommentWrapper>}
        {value?.map(v => {
          return (
            <CommentWrapper>
              <Avatar user={v?.user} size='xs' />
              <CommentBody>
                <CommentHeader>
                  <HighlightedText>"{v?.text}"</HighlightedText>
                  <IconButton onClick={()=> deleteComment(v)} white><DeleteIcon/></IconButton>
                </CommentHeader>
                {v?.comment}
              </CommentBody>
          </CommentWrapper>
          )
        })}
      </NotesBackground>
    </DetailedMessageWrapper>
  );
};
export default DetailedMessage