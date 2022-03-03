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
    justify-content: center;
    border-radius: 20px;
    background: white;
    width: 85%;
    height: 80px;
    margin-top: 4%;
`
export const TodoSectionItemWrapper = styled.div`
    width: 85%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const DueDateLabel = styled.p`
    width: 25px;
    font-weight: lighter;
    font-size: small;
    text-align: center;
    text-decoration: none;
`

export const InfoSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`
export const ItemName = styled.p`
    font-weight: bold;
    font-size: medium;
`

export const ItemStatus = styled.p`
    font-weight: bold;
    color: ${({completed})  => completed ? 'green' : 'red'};
    font-size: small;
`

export const ItemSubject = styled.p`
    font-weight: bold;
    font-size: medium;
`
