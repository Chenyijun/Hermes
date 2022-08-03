import styled from 'styled-components'
import { offBlack, lightGray, accentYellow, offWhite } from '../constants'

export const TopNavBar = styled.nav`
  display: flex;
  flex-direction: column;
  grid-area: topnav;
  align-items: center;
  background: black;
  z-index: 1;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('https://firebasestorage.googleapis.com/v0/b/hermes-95b99.appspot.com/o/assets%2Flandscape.png?alt=media&token=94b1c28f-2495-4720-9aeb-f89c590f3d9c') 
`

export const TwoTabs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10rem;
`

export const NavButton = styled.button`
  height: 100%;
  width: 100%;
  color: ${props => props.active ? offWhite : offBlack};
  background: ${props => props.active ? offBlack : 'transparent'};
  border: none;
  padding: .5rem 1rem;
  font-weight: 600;
  font-size: 20px;
  font-family: "Poppins", sans-serif; 
  box-sizing: border-box;
  cursor: pointer;
  width: fit-content;
  border-radius: 5px;
`

export const NameWrapper = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 1rem;
`


export const NameHeader = styled.h1`
  color: ${props => props.black ? 'black' : 'white'};
  font-weight: 600;
  font-size: 20px;
  font-family: "Poppins", sans-serif; 
  box-sizing: border-box;
`

export const DashHeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: .5fr .75fr 1fr; //fix this later
  justify-content: center;
  align-items: center;
  justify-items: flex-end;
`

// User List

export const UserButton = styled.button`
  background: ${props => props.selected ? `${accentYellow}` : 'none'};
  border: none;
  color: ${props => props.selected ? 'black' : 'white'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  padding: 0.5rem 0;
`

export const UserButtonText = styled.p`
  font-size: 12px;
  font-family: "Poppins", sans-serif; 
  font-weight: 400;
  margin-top: 8px;
  margin-bottom: 0;
`

export const Divider = styled.hr`
  color: white;
  width: 100%;
`