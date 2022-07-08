import styled from 'styled-components'
import { accentOrange, darkGray } from '../constants'

export const TopNavBar = styled.nav`
  display: flex;
  flex-direction: column;
  grid-area: topnav;
  align-items: center;
  background: black;
`

export const ThreeTabs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
`

export const NavButton = styled.button`
  height: 100%;
  width: 100%;
  color: ${props => props.active ? accentOrange : darkGray};
  background: black;
  border: none;
  padding: 1rem;
  font-weight: 600;
  font-size: 20px;
  font-family: "Poppins", sans-serif; 
  box-sizing: border-box;
  cursor: pointer;
`

export const NameWrapper = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 1rem;
`


export const NameHeader = styled.h1`
  color: white;
  font-weight: 600;
  font-size: 20px;
  font-family: "Poppins", sans-serif; 
  box-sizing: border-box;
`

// User List

export const UserButton = styled.button`
  background: ${props => props.selected ? `white` : 'none'};
  border: none;
  color: ${props => props.selected ? 'black' : 'white'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
`

export const UserButtonText = styled.p`
  font-size: 12px;
  font-family: "Poppins", sans-serif; 
  font-weight: 400;
  margin-top: 8px;
  margin-bottom: 0;
`