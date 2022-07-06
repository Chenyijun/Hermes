import styled from 'styled-components'
import { darkPurple } from '../constants'

export const MainFriendsListWrapper = styled.div`
    display: grid;
    grid-template-columns: 100px 150px auto;
`
export const MainWrapper = styled.div`
    display: grid;
    grid-template-columns: 100px auto;
`

export const HomeWrapper = styled.div`
    display: grid;
    grid-template-columns: 100px auto;
    grid-template-rows: minmax(auto, 175px) auto; // 145
    grid-template-areas: "sidenav topnav" "sidenav body";
`

export const SideNav = styled.nav`
    background: #aaa;
    width: 100px;
    box-sizing: border-box;
    padding: 1rem;
    height: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`

export const UserListWrapper = styled.div`
    background: ${darkPurple};
    width: 100px;
    box-sizing: border-box;
    padding: 1rem;
    height: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    grid-area: sidenav;
`

export const ChatWrapper = styled.div`
    padding: 1rem;
`

export const MessageWrapper = styled.div`
    padding: 1rem;
    display: grid;
    grid-template-columns: minmax(auto, 100px) auto;
`

export const MessageTextWrapper = styled.div`
    padding: 1rem;
    background: #eee;
    border-radius: 10px;
`

export const SimpleWrapper = styled.div`
    padding: 1rem;
`
export const BodyWrapper = styled.div`
    padding: 1rem;
    grid-area: body;
`