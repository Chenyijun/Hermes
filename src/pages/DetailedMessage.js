import React, {useState, useEffect} from "react";
import { MessageTextWrapper, TimeText } from "../components/chatComponents";
import moment from 'moment'
import Avatar from "../components/Avatar";
import { TextAnnotator } from "react-text-annotate";
import { DetailedMessageWrapper } from "../components/messageComponents";

const DetailedMessage = ({message, setShowDetails, user}) => {
  const [value, setValue] = useState([])
  const [tag, setTag] = useState('')
  const [highlight, setHighlight] = useState(null)
  const [comment, setComment] = useState('')

  useEffect(() => {
    setHighlight(value?.slice(-1)[0] || null)
  }, [value]);

  const handleSubmit = (e) => {
    const newValue = value
    newValue[newValue.length-1].comment = comment
    setValue(newValue)
    setHighlight(null)
    setComment('')
  }

  const handleChange = (e) => {
    if (value.length === 0 || e.length > value.length) {
      setValue(e)
    } else {
      console.log('click')
    }

  }

  const deleteComment = (comment) => {
    console.log('delete', comment)
    const newValue = value.filter((v) => {
      return v.id !== comment.id;
    })
    setValue(newValue)
  }

  return (
    <DetailedMessageWrapper>
      <button onClick={()=>setShowDetails(false)}>Back</button>
      <Avatar user={message.sender}/>
      <MessageTextWrapper>
        {message?.text && <TextAnnotator
          content={message.text}
          value={value}
          onChange={e => handleChange(e)}
          getSpan={span => ({
            ...span,
            id: `${span.start}-${span.end}`,
            color: 'blue',
            comment: null,
            user: user
          })}
        />}
      </MessageTextWrapper>
      {highlight && <MessageTextWrapper sending>
        <p>Highlight: {highlight?.text}</p>
        <input type='text' value={comment} onChange={(e)=>setComment(e.target.value)} />
        <button onClick={()=>handleSubmit()}>Submit</button>
      </MessageTextWrapper>}
      {value?.map(v => {
        return (
          v?.comment && <div>
            <Avatar user={v?.user} />
            <MessageTextWrapper>
              <button onClick={()=> deleteComment(v)}>Delete</button>
              <p>Highlight: {v?.text}</p>
              {v?.comment}
            </MessageTextWrapper>
        </div>
        )
      })}
    </DetailedMessageWrapper>
  );
};

export default DetailedMessage