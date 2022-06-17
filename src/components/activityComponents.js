import styled from 'styled-components'
import { Link } from "react-router-dom";

export const ActivityCardWrapper = styled.div`
  display: flex;
  border: 1px solid #aaa;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  flex-direction: column;
  max-width: 200px;
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