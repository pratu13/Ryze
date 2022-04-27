import styled from "styled-components";

export const LoginWrapper = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #EBF3F5;
    height: 100vh;
`

export const BgImage = styled.img`
    object-fit: contain;
    vertical-align: auto;
    width: 50vw;
    height: 300px;
`

export const ContentContainer = styled.div`
    height: 85vh;
    border-radius: 20px;
    width: 50vw;
    /* background-color: #F9D9EB; */
    background-color: white;
    margin-left: 10%;
    padding-left: 20px;
    display: flex;
    justify-content: center;
    align-items: flex-start;

`
export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 90vh;
    margin-left: 10%;
    /* margin-right: 4%; */
  
`

export const MainTitle = styled.p`
    font-size: 2.5em;
    margin-top: 10%;
    font-weight: bolder;
    margin-bottom: 2%;
    color: #A0A5FE;
    text-align: center;
`

export const ContentDescription = styled.p`
    font-size: 1.5rem;
    text-align: justify;
    font-weight: lighter;
    width: 95%;
`