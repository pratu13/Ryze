import styled from "styled-components";
import { Link as LinkR } from 'react-router-dom';

export const SideBarContainer = styled.div`
    height: 100vh;
    margin: 0;
    padding: 0;
    width: 18vw;
    border-right: 0.2px solid rgba(0,0,0,0.28);
`

export const SideBarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10%;
    margin-top: 100px;
    height: 80vh;
    justify-content: space-between;
`

export const SideBarItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

`

export const SideBarFooterItem =  styled(LinkR)`
    display: flex;
    justify-content: flex-start;
    cursor: pointer;
    align-items: center;
    padding: 25px;
    margin-right: -30px;
    white-space: nowrap;
    text-decoration: none;

`

export const SideBarItem = styled.div`
    display: flex;
    justify-content: flex-start;
    cursor: pointer;
    align-items: center;
    padding: 25px;
    margin-right: -30px;
    white-space: nowrap;
    text-decoration: none;
`

export const ItemIcon = styled.img`
    vertical-align: auto;
    width: 27px;
    height: 27px;
    object-fit: fill;
`

export const ItemLabel = styled.p`
    margin-left: 40px;
    font-weight: bolder;
    font-size: large;
    color: ${({selected, dark})  => dark ? (selected ? '#FEC7C8' : '#000') : '#c4c4c4'};

    @media screen and (max-width: 1026px) {
        display: none;
    }
`

export const FooterItems = styled.div`
    display: flex;
    flex-direction: column;
    color: #C4C4C4;
    text-decoration: none;
`
