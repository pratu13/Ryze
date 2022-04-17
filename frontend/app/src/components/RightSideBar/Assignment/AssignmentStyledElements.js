import styled from "styled-components";

export const AssignmentSubmissionContainer = styled.div`
    display: flex;
    width: 70%;
    border-radius: 20px;
    height: auto;
    background-color: #FFDEC6;
`

export const AssignmentSubContainer = styled.div`
    display: flex;
    width: 80%;
    border-radius: 20px;
    height: auto;
    flex-direction: column;
    background-color: #FFDEC6;
    margin: 1%;
`

export const AssigmentQuestionText = styled.div`
    font-weight: bold;
    font-size: 1.5em; 
    margin-bottom: 2%;
    color: ${({color}) => color}
`

export const AssignmentSubHeader = styled.div`
    width: 85%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const SubmissionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 5%;
    width: 100%;
`