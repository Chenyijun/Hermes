import styled from 'styled-components'
import { Link } from "react-router-dom";
import { fadedPurple, periwinkle } from '../constants';

export const ActivityCardWrapper = styled.div`
  display: grid;
  grid-template-rows: ${props => props.started ? '41px auto': 'auto'};
  border-radius: 5px;
  align-items: center;
  width: 230px;
  height: 230px;
  background: #2B2B2B;
`

export const ActivityCardBanner = styled.div`
  background: ${props => props.started && props.yourTurn ? fadedPurple : periwinkle};
  display: ${props => !props.started ? 'none' : 'flex'};
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

export const ActivityCardBody = styled.div`
  background: linear-gradient(180deg, rgba(50, 1, 188, 0.2) 0%, #000000 91.52%), white;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: end;
  color: white;
  font-size: 16px;
  font-weight: 600;
  font-family: "Poppins", sans-serif; 
  border-radius: 0 0 5px 5px;

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