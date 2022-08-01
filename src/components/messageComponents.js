import styled from 'styled-components'

export const DetailedMessageWrapper = styled.div`
  background: black;
  display: grid;
  grid-template-columns: 3fr 2fr;
  height: 100%;
`

export const MessageTitle = styled.h1`
  font-family: "Poppins", sans-serif; 
  color: white;
  font-size: 24px;
`

export const DetailedMessageHeader = styled.div`
  display: grid;
  grid-template-columns: 50px auto;
`

export const MainText = styled.p`
  font-family: "Poppins", sans-serif; 
  color: white;
  font-size: 18px;
  padding: 1rem;
`

export const SmallText = styled.p`
  color: white;
  font-size: 14px;
  padding: ${props => props.padding};
  margin-top: ${props => props.marginTop};
`

export const NotesBackground = styled.div`
  background: #3E3E3E;
  padding: 0 1rem;
`

export const CommentWrapper = styled.div`
  display: grid;
  grid-template-columns: 45px auto;
  margin: 1rem 0;
`

export const CommentBody = styled.div`
  background: #727272;
  padding: 1rem;
  border-radius: 5px;
  font-family: "Poppins", sans-serif; 
  color: white;
  font-size: 1rem;
`

export const HighlightedText = styled.p`
  font-family: "Poppins", sans-serif; 
  color: white;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 0;
`

export const CommentHeader = styled.div`
  display: grid;
  grid-template-columns: auto 45px;
`