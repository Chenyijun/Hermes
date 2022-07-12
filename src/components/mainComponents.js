import styled from 'styled-components'

import { periwinkle } from '../constants'


export const Header2 = styled.h2`
  color: white;
  font-family: "Poppins", sans-serif; 
`

export const WhiteText = styled.p`
  color: white;
  font-family: "Poppins", sans-serif; 
`

export const Stats = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`

// HighlightCard
export const HighlightCardWrapper = styled.div`
  width: 302px;
  height: 336px;
  border: 1px solid #000000;
  filter: drop-shadow(0px 4px 40px rgba(87, 48, 243, 0.6));
  border-radius: 5px;
  display: grid;
  grid-template-rows: 52px auto;
  align-items: center;

`

export const HighlightCardBanner = styled.div`
  background: ${periwinkle};
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