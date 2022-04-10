import styled from "styled-components";

export const TodoSectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    max-width: 362px;
    margin-top: 10%;
    
`
export const TodoSectionTitle = styled.h1`
    font-weight: bold;
    font-size: larger;
`
export const ItemContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    border-radius: 20px;
    background: white;
    width: 75%;
    padding: 15px;
    /* height: 80px; */
    flex-direction: column;
    margin-top: 2%;
    align-items: flex-start;
    background-color: ${({ dark }) => dark ? "#1B2327" : "white" };
`
export const TodoSectionItemWrapper = styled.div`
    width: 75%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: none;
`

export const DueDateLabel = styled.p`
    width: 25px;
    font-weight: lighter;
    font-size: small;
    text-align: center;
    text-decoration: none;
    color: ${({ dark }) => !dark ? "black" : "white" };
`

export const InfoSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background: none;
`
export const ItemName = styled.p`
    margin-top: 10px;
    font-weight: bold;
    font-size: medium;
    color: ${({ dark }) => !dark ? "black" : "white" };
`

export const ItemStatus = styled.p`
    font-weight: bold;
    color: ${({completed})  => completed ? 'green' : 'red'};
    font-size: small;
`

export const ItemSubject = styled.p`
    font-weight: bold;
    font-size: medium;
    margin-right: 20px;
    color: ${({ dark }) => !dark ? "black" : "white" };
`
