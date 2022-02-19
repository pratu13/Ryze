import styled from "styled-components"

export const FormButton = styled.button`
    height: 44px;
    width: 50%;
    background-color: #A0A5FE;
    text-decoration: none;
    color: white;
    border-radius: 10px;
    border: none;
    font-size: large;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        transform: scale(1.1);
    }
`

export const Container = styled.div`
    height: 70vh;  
    max-width: 500px;
    width: 500px;
    display: flex;
    background: white;
    border-radius: 50px;
    margin-left: 30px;
    margin-right: 30px;
`

export const FormInput = styled.input`
    width: 335px;
    height: 34px;
    padding: 12px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 10px;
    background-color: #EBF3F5;
    margin-bottom: 40px;
`

export const FormLabel = styled.label`
    font-size: large;
    font-weight: bold;
    color: ${({isError})  => isError ? 'red' : '#000'};
`

export const FormContent = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const FormInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    font-size: large;
`

export const MainContentContainer = styled.div`
    min-height: 100vh;
    margin: 0;
    padding: 0;
    width: 55vw;
    transition: all 0.2s ease-in-out;
`

export const SectionCard = styled.div`
    background-color: #F8FAFB;
    margin-top: 20px;
    border: none;
    border-radius: 20px;
    width: 362px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 400px;
`