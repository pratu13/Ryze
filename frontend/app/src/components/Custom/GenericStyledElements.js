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
    /* min-height: 60vh; */
    max-width: 500px;
    width: 500px;
    display: flex;
    background: white;
    border-radius: 50px;
    margin-left: 30px;
    margin-right: 30px;
`

export const FooterButtonContainer = styled.div`
    height: 16vh;  
    max-width: 500px;
    width: 500px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 50px;
    margin-left: 30px;
    margin-right: 30px;
`

export const Divider = styled.div`
    padding: 1em;
`

export const LoginContainer = styled.div`
    height: 100vh;  
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

export const EmptyCardTitle = styled.label`
    font-size: large;
    font-weight: bold;
    color: lightgray;
    text-align: center;
    width: 335px;
`

export const EmptyCardTitleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    width: 100%;
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
    z-index: 10;
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

export const SucessModalWrapper = styled.div`
    width: 100%;
    max-width: 30vw;
    position: fixed;
    border-radius: 20px;
    height: 40vh;
    background: #C3E5D1;
    transition: all 0.2s ease-in-out;

    @media screen and (max-width: 1000px) {
        height: 24vh;
        transition: all 0.2s ease-in-out;
    }

`

export const SucessModalContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    /* padding: 1.5rem; */
`

export const ModalImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    vertical-align: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-animation: scaleInOut 2.0s infinite ease-in-out;
    animation: scaleInOut 2.0s infinite ease-in-out;

    @keyframes scaleInOut {
    0%, 100% {
        transform: scale(0.0);
        -webkit-transform: scale(0.0);
    }
    50% {
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
    }
}

`

export const ModalDescription = styled.h1`
    font-size: 1.5rem;
    font-weight: bolder;
    color: white;
    margin-top: 2%;

    @media screen and (max-width: 1000px) {
       font-size: 1em;
    }
`

export const SucessModalContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`


export const MenuContainer = styled.div`
    width: 335px;
    height: 34px;
    padding: 12px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 10px;
    background-color: ${({ color }) => color};
    margin-bottom: 40px;
    transition: all 0.2 ease-in-out;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    @media screen and (max-width: 1000px) {
        width: 225px;
        transition: all 0.2s ease-in-out;
    }
`

export const CaretMenuItem = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 50px;
    border-radius: 20px;
    padding: 0.5rem;
    transition: background 300ms;
`

export const ItemIcon = styled.img`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    padding: 5px;
    margin: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: filter 300ms;

    &:hover {
        filter: brightness(1.2);
    }
`

export const Dropdown = styled.div`
    position: relative;
    top: 150px;
    width: 300px;
    transform: translate(-10%);
    background-color: aliceblue;
    border-radius: 20px;
    padding: 0.3rem;
    overflow: hidden;
`

export const DropMenuItem = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 50px;
    border-radius: 20px;
    padding: 0.5rem;

    transition: background 300ms;

    &:hover {
        background-color: #C3E5D1;
    }
`