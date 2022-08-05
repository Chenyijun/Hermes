import styled from 'styled-components'
import { Link } from "react-router-dom";
import { periwinkle, accentYellow } from '../constants'

export const Header1 = styled.h1`
  color: white;
  font-family: "Poppins", sans-serif; 
`

export const Header2 = styled.h2`
  color: white;
  font-family: "Poppins", sans-serif; 
`

export const WhiteText = styled.p`
  color: white;
  font-family: "Poppins", sans-serif; 
  font-size: 1rem;
`

export const Stats = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`

export const YellowButton = styled.button`
  width: 130px;
  height: 50px;
  background: ${accentYellow};
  border-radius: 5px;
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  cursor: pointer;
  margin: 1rem;
`

export const IconButton = styled.button`
  cursor: pointer;
  ${props => props.modal && 
 `position: fixed;
  top: 20px;
  right: 20px; `
  }
  background: none;
  border: 0;
  color: ${props => props.white && 'white'};
`

export const StatButton = styled.button`
  border: 1px solid ${accentYellow};
  border-radius: 10px;
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 21px;
  color: white;
  background: black;
  padding: .5rem 1rem;
  width: fit-content;
`

// HighlightCard
export const HighlightCardWrapper = styled.div`
  width: 230px;
  height: 256px;
  border: 1px solid #000000;
  // filter: drop-shadow(0px 4px 40px rgba(87, 48, 243, 0.6));
  border-radius: 5px;
  display: grid;
  grid-template-rows: 52px auto;
  align-items: center;

`

export const HighlightCardBanner = styled.div`
  background: #2B2B2B;;
  display: flex;
  color: white;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  border-radius: 5px 5px 0 0;
  font-family: "Poppins", sans-serif; 
`

export const HighlightCardBody = styled.div`
  background: linear-gradient(180deg, rgba(255, 168, 0, 0.25) 0%, #000000 100%);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  color: white;
  font-family: "Poppins", sans-serif; 
  border-radius: 0 0 5px 5px;
  padding: 1rem;
  box-sizing: border-box;
`

export const HighlightTitle = styled.p`
  font-size: 28px;
  font-weight: 600;
  margin-top: 0;
`

export const SettingsForm = styled.div`
  display: flex;
  flex-direction: column;
`

//Login
export const LoginWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: black;
  color: white;
  font-family: "Poppins", sans-serif; 
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const WhiteLink = styled(Link)`
  color: white;
  font-size: 1rem;
`

export const LoginBottomWrapper = styled.div`
  padding-top: 1rem;
  min-width: 500px;
`

export const LoginFormWrapper = styled.div`
  display: grid;
  grid-template-columns: max-content auto;
  grid-gap: 1rem;
  min-width: 500px;
`