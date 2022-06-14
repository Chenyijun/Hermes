import styled from 'styled-components'

export const Avatar = styled.img`
    height: ${props => props.small ? '50px' : '100px'};
    width: ${props => props.small ? '50px' : '100px'};
    background: blue;
    border-radius: 50%;
`

export const DefaultAvatar = styled.div`
    height: ${props => props.small ? '50px' : '100px'};
    width: ${props => props.small ? '50px' : '100px'};
    background: blue;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
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