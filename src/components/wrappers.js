import styled from 'styled-components'

import { darkerGray } from '../constants'

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
    grid-template-rows: minmax(auto, 145px) auto;
    grid-template-areas: ${props => props.noTopNav ? `"sidenav body" "sidenav body"` : `"sidenav topnav" "sidenav body"`};
    height: 100vh;
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
    background: ${darkerGray};
    width: 100px;
    box-sizing: border-box;
    padding: 1rem;
    height: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    grid-area: sidenav;
    z-index: 2;
`

export const ChatWrapper = styled.div`
    display: grid;
    grid-template-rows: auto 82px;
    padding-top: 1rem;
`

export const SimpleWrapper = styled.div`
    padding: 1rem;
`
export const BodyWrapper = styled.div`
    padding: ${props => !props.noPadding && '1rem'};
    grid-area: body;
    background: black;
    overflow-y: auto;
`

export const ActivitiesWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1rem;
`

export const DashboardWrapper = styled.div`
    display: grid;
    grid-template-rows: 110px auto;
    height: 100%;
    width: 100%;
    background: black;
`

export const BoxActivitiesWrapper = styled(ActivitiesWrapper)`
    padding: 2rem 0;

`

export const SettingsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 500px;
    margin: auto;
`

export const SettingsFormWrapper = styled.form`
    display: grid;
    grid-template-columns: max-content auto;
    max-width: 500px;
    grid-gap: 1rem;
`
export const ProfileAvatarWrapper = styled.div`
    display: grid;
    grid-template-columns: max-content auto;
    align-items: center;
    grid-gap: 1rem;
`