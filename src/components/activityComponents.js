import styled from 'styled-components'
import { Link } from "react-router-dom";
import { fadedPurple, periwinkle } from '../constants';

export const ActivityCardWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 4fr 1fr;
  grid-gap: 1rem;
  border-radius: 5px;
  align-items: center;
  width: 230px;
  height: 240px;
  background: #2B2B2B;
  box-sizing: border-box;
  padding: 1rem;
`

export const ActivityCardBanner = styled.div`
  height: 100%;
  width: 100%;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`
export const TurnBanner = styled.div`
  color: white;
  min-height: 19px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  font-family: "Poppins", sans-serif; 
  p{
    margin: 0;
    text-align: center;
  }
`

export const ActivityCardBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;  
  height: 100%;
  color: white;
  font-size: 16px;
  font-weight: 600;
  font-family: "Poppins", sans-serif; 

  p{
    margin: 0;
    text-align: center;
  }
`

export const ActivityCardImage = styled.div`
  height: 100%;
  width: 100%;
  background: ${fadedPurple};
  border-radius: 5px;
`

export const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #555;
  color: white;
  border-radius: 45%;
  padding: 5px 20px;
`

export const CardLink = styled(Link)`
  text-decoration: none;
  &:not(:last-child) {
    margin-right: 1rem;
  }
`

export const ActivityFlex = styled.div`
  display: flex;
  flex-direction: row;
`

export const LibraryFilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem 0;

  h2 {
    padding-right: 1rem;
  }
`

export const BoxHeader = styled.h3`
  color: white;
  font-size: 24px;
  font-family: "Poppins", sans-serif; ;
  font-weight: 600;
  text-align: center;
`

export const WhiteText = styled.p`
  color: white;
  font-family: "Poppins", sans-serif; ;
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 21px;
`