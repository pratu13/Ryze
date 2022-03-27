import styled from "styled-components";

export const SettingModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 10;
    background: #DFC3E6;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    height: 80vh;
    transition: all 0.2s ease-in-out;

    @media screen and (max-width: 1000px) {
        height: 70vh;
        transition: all 0.2s ease-in-out;
    }

`
export const SettingModalTitle = styled.h1`
    font-weight:  bold;
    font-size: 2em;
    color: white;
    transition: all 0.2s ease-in-out;

    @media screen and (max-width: 1000px) {
        font-size: 1.5em;
        transition: all 0.2s ease-in-out;
    }
`
export const ProfileContainer = styled.div`
    margin-top: 5%;
    width: 173px;
    height: 173px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease-in-out;

    @media screen and (max-width: 1000px) {
        transform: scale(0.7);
        transition: all 0.2s ease-in-out;
    }
`

export const ProfileIcon = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    transition: all 0.2s ease-in-out;

    @media screen and (max-width: 1000px) {
        transform: scale(0.7);
        transition: all 0.2s ease-in-out;
    }
`
export const InputSectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 7%;
    overflow: hidden;
`
export const InputSectionWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2 ease-in-out;
    margin: 10px;

    @media screen and (max-width: 1000px) {
        flex-direction: column;
        justify-content: flex-start;
    }
`

export const ButtonWrapper = styled.div`
    margin-top: 2%;
    display: flex;
    justify-content: space-around;
    width: 50%;
`

export const LabelWrapper = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5%;
`