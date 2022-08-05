import styled from 'styled-components'
import { lightGray, fadedPurple, darkPurple, accentYellow, lighterGray } from '../constants'

export const AvatarBubble = styled.img`
    height: ${props => props.size === 'small' ? '45px' : props.size === 'xs' ? '35px' : '100px'};
    width: ${props => props.size === 'small' ? '45px' : props.size === 'xs' ? '35px' : '100px'};
    background: ${lightGray};
    border-radius: 50%;
`

export const DefaultAvatarBubble = styled.div`
    height: ${props => props.size === 'small' ? '45px' : props.size === 'xs' ? '35px' : '100px'};
    width: ${props => props.size === 'small' ? '45px' : props.size === 'xs' ? '35px' : '100px'};
    background: ${props => props.white ? 'white': lightGray};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding-top: ${props => props.white && '4px'};

    & p {
        font-family: "Poppins", sans-serif; 
        font-weight: 600;
        color: black;
        font-size: 20px;
    }
`

export const MessageWrapper = styled.div`
    padding: 1rem;
    display: grid;
    grid-template-columns: minmax(auto, 70px) minmax(auto, 800px) auto;
    grid-template-areas: "avatar message comment" ". time comment";

    & ${AvatarBubble} ${DefaultAvatarBubble} {
        grid-area: avatar;
    }
`

export const MessageTextWrapper = styled.div`
    padding: 1rem;
    background: ${props => props.sending ? accentYellow: lighterGray};
    color: ${props => props.sending ? 'black': 'white'};
    border-radius: 10px;
    grid-area: message;
`

export const ChatHeader = styled.div`
    background: #eee;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
`

export const FriendBubble = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: ${props => props.selected && `2px solid blue`};
`

export const TimeText = styled.p`
    color: ${lightGray};
    grid-area: time;
`

export const ChatInput = styled.input`
    width: 100%;
    padding: 1rem;
    border-radius: 10px;
    border: none;
    background: ${lightGray};
    font-family: "Poppins", sans-serif; 
    font-size: 1rem;
    width: 800px;
`

export const ChatForm = styled.form`
    display: flex;
    padding: 1rem 0;
    position: sticky;
    bottom: 0;
    background: rgba(114, 114, 114, 0.5);
    padding: 1rem;
    justify-content: center;
`

export const SendButton = styled.button`
    background: ${accentYellow};
    color: black;
    border: none;
    border-radius: 10px;
    padding: 0 1rem;
    margin-left: 1rem;
    cursor: pointer;
`

export const CommentButtonWrapper = styled.div`
    grid-area: comment;
    cursor: pointer;
`

export const CommentButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 50px;
    margin-left: 1rem;
    border-radius: 10px;
    background: ${props => props.sending ? accentYellow: lighterGray};
    color: ${props => props.sending ? 'black': 'white'};
    border: none;
    cursor: pointer;
`

export const NotificationBubble = styled.div`
    border-radius: 50%;
    height: 15px;
    width: 15px;
    background-color: red;
    position: relative;
    bottom: 54px;
    left: 54px;
`

export const ChatMessageWrappers = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: ${props => props.all ? `calc(100vh - 90px)` : `calc(100vh - 240px)`};
    overflow-y: scroll;
`