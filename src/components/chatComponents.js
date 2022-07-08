import styled from 'styled-components'
import { lightGray, fadedPurple, darkPurple } from '../constants'

export const AvatarBubble = styled.img`
    height: ${props => props.small ? '50px' : '100px'};
    width: ${props => props.small ? '50px' : '100px'};
    background: ${lightGray};
    border-radius: 50%;
`

export const DefaultAvatarBubble = styled.div`
    height: ${props => props.small ? '50px' : '100px'};
    width: ${props => props.small ? '50px' : '100px'};
    background: ${lightGray};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

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
    grid-template-columns: minmax(auto, 70px) auto;
    grid-template-areas: "avatar message" ". time";

    & ${AvatarBubble} ${DefaultAvatarBubble} {
        grid-area: avatar;
    }
`

export const MessageTextWrapper = styled.div`
    padding: 1rem;
    background: ${props => props.sending ? fadedPurple : '#5730F3'};
    border-radius: 10px;
    grid-area: message;
    color: white;
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
`

export const ChatForm = styled.form`
    display: flex;
    padding: 1rem 0;
    position: sticky;
    bottom: 0;
    background: black;
`

export const SendButton = styled.button`
    background: ${darkPurple};
    color: white;
    border: none;
    border-radius: 10px;
    padding: 0 1rem;
    margin-left: 1rem;
`