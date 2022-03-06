import styled from "styled-components";
import SetNewPassword from "./SetNewPassword";


export const ForgotPasswordWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    margin-top: 40px;
`

export const BackButtonIcon = styled.img`
    vertical-align: auto;
    width: 27px;
    height: 27px;
    object-fit: fill;

    &:hover {
        transition: all 0.2s ease-in-out;
        transform: scale(1.1);
    }
`
export const ForgotPasswordHeader = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 90%;
    padding: 12px 20px;
    margin: 8px 0;
    margin-left: 40px;
    margin-bottom: 50px;
`
export const HeaderTitle= styled.h1`
    font-size: larger;
    font-weight: bolder;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    /* margin-left: 5%; */
`

export const CenterImage = styled.img`
    vertical-align: auto;
    width: 80%;
    height: 45%;
    object-fit: contain;  
`
export const FormButtonWrapper = styled.div`
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`

export const OTPContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 10%;
`

export const OTPInput = styled.input`
    width: 40px;
    height: 44px;
    padding: 12px 20px;
    border: none;
    border-radius: 10px;
    background-color: #EBF3F5;
    margin-left: 20px;
`

export const SetNewPasswordWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 500px;
`

export const SetPasswordTitle = styled.h1`
    font-size: x-large;
    font-weight: 800;
    margin-top: 10%;
`