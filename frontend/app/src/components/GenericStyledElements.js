import styled from "styled-components"

export const FormButton = styled.button`
    height: 44px;
    width: 200px;
    background-color: #A0A5FE;
    text-decoration: none;
    color: white;
    border-radius: 10px;
    border: none;
    font-size: large;
    cursor: pointer;
    font-weight: bold;
    opacity: ${({isDisabled})  => isDisabled ? '0.5' : '1'};;
    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        transform: scale(1.1);
    }
`

export const Container = styled.div`
    height: auto;  
    min-height: 60vh;
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
    background-color: ${({ color }) => color};
    margin-bottom: 40px;
    transition: all 0.2 ease-in-out;

    @media screen and (max-width: 1000px) {
        width: 225px;
        transition: all 0.2s ease-in-out;
    }
`

export const FormLabel = styled.label`
    font-size: ${({isError})  => isError ? 'small' : 'larger'};
    font-weight: bold;
    color: ${({ isError, color }) => isError ? 'red' : color};
    text-align: start;
    width: 335px;
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

export const ModalContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    z-index: 1;
    opacity: 1;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const ModalWrapper = styled.div`
    width: 100%;
    max-width: 60vw;
    position: fixed;
    border-radius: 20px;
    height: 80vh;
    background: #DFC3E6;
    transition: all 0.2s ease-in-out;

    @media screen and (max-width: 1000px) {
        height: 75vh;
        transition: all 0.2s ease-in-out;
    }

`