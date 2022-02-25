import styled from "styled-components";

export const SideBarContainer = styled.div`
    height: 100%;
    max-height: 100vh;
    border-left: 0.2px solid rgba(0,0,0,0.28);
    
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