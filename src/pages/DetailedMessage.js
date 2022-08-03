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
    const lastValue = value?.slice(-1)[0]
    if ( lastValue?.comment !== null) {
      setHighlight(null)
    } else {
      setHighlight(lastValue || null)
    }
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
      console.log('1', e)
      if (e.length > 1 && e[e.length-1].comment === null) {
        console.log('2')
        const newValue = e.filter((v, i) => {
          return  i == e.length-1 || v.comment !== null;
        })
        setValue(newValue)
      } else{
        setValue(e)
      }
    } else {
      console.log('3', e)
      console.log('3v', value)
      const newValue = value.filter((v, i) => {
        return  v.comment !== null;
      })
      setValue(newValue)
      const test = value.filter(({ id: id1 }) => !e.some(({ id: id2 }) => id2 === id1));
      setHighlight(null)
    }

  }

  const deleteComment = (comment) => {
    const newValue = value.filter((v) => {
      return v.id !== comment?.id;
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
        <SmallText padding='0 3rem' marginTop='0'>{message.haveSent ? `Sent at ${message.sentTime}. Received at ${message.recieved}`:`Sent at ${message.sentTime}. Estimated time of arrival is ${message.recieved})`}</SmallText>
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
          return (<>
            {v?.comment && <CommentWrapper>
              <Avatar user={v?.user} size='xs' />
              <CommentBody>
                <CommentHeader>
                  <HighlightedText>"{v?.text}"</HighlightedText>
                  {v?.user.uid === user.uid && <IconButton onClick={()=> deleteComment(v)} white><DeleteIcon/></IconButton>}
                </CommentHeader>
                {v?.comment}
              </CommentBody>
          </CommentWrapper>}
          </>
          )
        })}
      </NotesBackground>
    </DetailedMessageWrapper>
  );
};
export default DetailedMessage