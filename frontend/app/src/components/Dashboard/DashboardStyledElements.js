import styled from "styled-components"

export const  DashboardContainer =styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0;
    margin: 0;
`

export const DashboardMainContentWrapper = styled.div`
    height: 100vh;
    margin: 0;
    padding: 0;
    width: 55%;
    display: flex;
    flex-direction: column;
`

export const DashboardHeader = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 2%;
    margin-right: 2%;
`

export const DashboardHeaderRight = styled.div`
    width: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-left: 2%;
    margin-right: 2%;
`

export const BellIcon = styled.img`
    width: 34px;
    height: 34px;
    object-fit: contain;
    cursor: pointer;

    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        transform: scale(1.1);
    }
`

export const HeaderLabel = styled.label`
    font-size: 2.2rem;
    font-weight: bold;
`
export const CreateAnnouncementButton = styled.div`
    background-color: #FEC7C8;
    font-size: 1.1em;
    color: white;
    padding: 10px;
    width: 200px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
    margin-right: 20px;
    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        transform: scale(1.1);
    }
`