import styled from "styled-components";

export const AssignmentSubmissionContainer = styled.div`
    display: flex;
    width: 70%;
    border-radius: 20px;
    height: auto;
    background-color: #F3ACAA;
`

export const AssignmentSubContainer = styled.div`
    display: flex;
    width: 100%;
    border-radius: 20px;
    height: auto;
    flex-direction: column;
    background-color: #F3ACAA;
    margin: 1%;
    /* height: 70vw; */
`

export const AssigmentQuestionText = styled.div`
    font-weight: bold;
    font-size: 1.5em; 
    margin-bottom: 2%;
    color: ${({color}) => color};
`

export const AssignmentSubHeader = styled.div`
    width: 85%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const SubmissionWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    /* padding: 2%; */
    margin: 2%;
    width: 100%;
`
export const SubmissionCWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    padding: 5%;
    width: 100%;
`

export const FileUploaderWrapper = styled.div`
        padding: 5%;
`

export const TitleHeader = styled.h1`
    font-size: x-large;
    font-weight: bold;
    margin-bottom: 10px;
    color: white;
`

export const FooterTitle = styled.div`
    font-size: medium;
    font-weight: 100;
    background-color: #FEC7C8;
    padding: 10px;
    border-radius: 10px;
    width: auto;
    height: auto;
    color: white;
    margin-top: 70%;
`
export const GradeFeedbackWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 40%;
`

export const InputWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const SubmissionContent = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    margin: 2%;
`
export const TextLabel = styled.label`
    font-size: ${({isError})  => isError ? 'small' : 'larger'};
    font-weight: bold;
    color: ${({ isError, color }) => isError ? 'red' : color};
    text-align: center;
    width: auto;
    height: auto;
    margin: 10px;
`

export const GradeInput = styled.input`
    width: ${({widthGiven, width})=> widthGiven ? width : "335px"};
    height: auto;
    padding: 8px 10px 10px 10px;
    border: none;
    border-radius: 10px;
    background-color: ${({ color }) => color};
    transition: all 0.2 ease-in-out;

    @media screen and (max-width: 1000px) {
        width: 225px;
        transition: all 0.2s ease-in-out;
    }
`