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
    border-radius: 20px;
    width: 70%;
    padding: 15px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 2%;
    align-items: flex-start;
    background-color: ${({ dark, bgColor }) => dark ? "#1B2327" : "#F9D9EB" };
    cursor: pointer;
`
export const TodoSectionItemWrapper = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: none;
`

export const FooterButtonContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: none;
    margin-top: 10px;
    margin-bottom: 10px;
`

export const FooterGradesContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
   
    margin-top: 10px;
    margin-bottom: 10px;
    width: 40%;
`
export const GradeText = styled.p`
    font-weight: bold;
    color: white;
    background: green;
    border-radius: 10px;
    padding: 7px;
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
    margin-bottom: 1%;
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
