import styled from "styled-components"

export const  MainBoardContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    top: 0;
    left: 0;
    bottom: 0;
    justify-content: space-between;
    align-items: flex-start;
    background-color: ${({ dark }) => dark ? "black" : "white" };
    /* background-color: red; */
    @media screen and (max-width: 1301px) {
        width: 55vw;
    }
`