import styled from "styled-components";
import { Link as LinkR } from 'react-router-dom';

export const SideBarContainer = styled.div`
    height: ${({ height }) => height} ;
    margin: 0;
    padding: 0;
    width:  ${({ width }) => width} ;
    border-right:  ${({ dark }) => dark ? "0.2px solid white" : "0.2px solid rgba(0,0,0,0.28)" } ;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: ${({ dark }) => dark ? "black" : "white" };
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

export const SwitchTitle = styled.p`
    font-size: medium;
    font-weight: 500;
    color: ${({dark}) => dark ? "white" : "black"};
`

export const SwitchContainer = styled.div`
    display: flex;
    border-radius: 20px;
    align-items: center;
    flex-direction: column;
    width: 200px;
    height: 100px;
    justify-content: space-around;
    margin-left: 10px;
    background-color: ${({ dark }) => dark ? "#1B2327" : "rgba(254, 199, 200, 0.7)" };
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
    cursor: pointer;
`

export const ItemLabel = styled.p`
    margin-left: 40px;
    font-weight: bolder;
    font-size: large;
    color: ${({selected, dark})  => (selected ? '#F28482' : dark ? '#000' : '#c4c4c4')};

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
