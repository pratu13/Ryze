import styled from "styled-components";

export const SideBarContainer = styled.div`
    height: 100%;
    max-height: 100vh;
    /* border-left:  ${({ dark }) => dark ? "0.2px solid white" : "0.2px solid rgba(0,0,0,0.28)" } ; */
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ dark }) => dark ? "black" : "white" };
    border-left:  ${({ dark }) => dark ? "0.2px solid white" : "0.2px solid rgba(0,0,0,0.28)" } ;
    
    @media screen and (max-width: 1362px) {
        display: none;
    }
`

export const SideBarWrapper = styled.div`
    display: flex;
    width: 27vw;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`