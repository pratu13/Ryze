import styled from "styled-components";


export const AnnouncementContainer =styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    transition: all 0.3s ease-in-out;
    flex-direction: column;
    align-items: center;
    background-color: transparent;
`

export const ExitButtonContainer = styled.div`
    background: transparent;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 2%;
    width: 90vw;
`

export const ExitButton = styled.img`
    width: 24px;
    height: 24px;
    object-fit: contain;
    cursor: pointer;
`

export const AnnouncementItemsContainer = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    margin-top: 5%;
    justify-content: space-between;
`

export const ItemsContainer = styled.div`
    width: 55vw;
    display: flex;
    flex-direction: column;
    margin-top: 5%;
    justify-content: space-between;
`

export const AnnouncementItemContainer = styled.div`
    width: auto;
    /* height: 150px; */
    /* background-color: #FEC7C8; */
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    margin-left: 5%;
    margin-right: 5%;
    padding: 10px;
`

export const AnnouncementItemWrapper = styled.div`
    width: 100vw;
    /* height: 150px; */
    background-color: transparent;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 20px;
    margin-top: 20px;
`

export const AnnouncementPublisherImg = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 3px solid white;
    object-fit: contain;
    margin-right: 20px;
`

export const AnnouncemntContentWrapper = styled.div`
    /* height: 100px; */
    background-color: transparent;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    
`

export const AnnouncementHeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`

export const AnnouncementHeader = styled.h1`
    font-size: 1.5em;
    color: ${({ dark }) => !dark ? "black" : "white" };

`

export const TimePublishedLabel = styled.p`
    font-size: smaller;
    color: ${({ dark }) => !dark ? "black" : "white" };
`

export const AnnouncementDescriptionText = styled.p`
    font-size: small;
    text-align: justify;
    text-overflow: ellipsis;
    color: ${({ dark }) => !dark ? "black" : "white" };
`
export const Divider = styled.div`
    height: 1px;
    width: 90%;
    background-color: lightcoral;
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 2%;
`

export const AnnouncementHeaderInfoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const SubjectTagContainer = styled.div`
    height: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: ${({ color }) => color};
    margin-left: 20px;
    font-weight: bold;
    margin-right: 20px;
`

export const SubjectText = styled.label`
    color: white;
    font-size: medium;
    padding-left: 10px;
    padding-right: 10px;
`

