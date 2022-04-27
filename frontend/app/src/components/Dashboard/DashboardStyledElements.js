import styled from "styled-components"

export const  DashboardContainer =styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0;
    margin: 0;
    background-color: ${({ dark }) => dark ? "red" : "white" };
    /* border-left:  ${({ dark }) => dark ? "0.2px solid white" : "0.2px solid rgba(0,0,0,0.28)" } ;
    border-right:  ${({ dark }) => dark ? "0.2px solid white" : "0.2px solid rgba(0,0,0,0.28)" } ; */
`

export const DashboardMainContentWrapper = styled.div`
    height: 100vh;
    margin: 0;
    padding: 0;
    width: 73vw;
    display: flex;
    flex-direction: column;
    top: 0;
    bottom:0;
    background-color: ${({ dark }) => dark ? "" : "white" };
    /* border-left:  ${({ dark }) => dark ? "0.2px solid white" : "0.2px solid rgba(0,0,0,0.28)" } ;
    border-right:  ${({ dark }) => dark ? "0.2px solid white" : "0.2px solid rgba(0,0,0,0.28)" } ; */
`

export const DashboardHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* margin-left: 2%;
    margin-right: 2%; */
    background-color: ${({ dark }) => dark ? "" : "white" };
`

export const DashboardHeaderRight = styled.div`
    width: 65%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-left: 2%;
    margin-right: 2%;
    background-color: ${({ dark }) => dark ? "black" : "white" };
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
    color: ${({ dark }) => !dark ? "black" : "white" };
    margin-left: 5%;
`
export const GradeLabel = styled.label`
    font-size: 1.2rem;
    font-weight: bold;
    color: green;
    margin-right: 20px;
    padding: 10px;
`

export const CreateAnnouncementButton = styled.div`
    background-color: #F28482;
    font-size: 0.9em;
    color: white;
    padding: 10px;
    width: auto;
    /* height: 24px; */
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
    margin-right: 20px;
    transition: all 0.2s ease-in-out;
    opacity: ${({isDisabled})  => isDisabled ? '0.5' : '1'};
    pointer-events: ${({isDisabled})  => isDisabled ? 'none' : 'all'};

    &:hover {
        transition: all 0.2s ease-in-out;
        transform: scale(1.1);
    }
`

export const CourseContainer = styled.div`
    display: flex;
    width: ${({width}) => width};
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    /* padding-left: 1%;
    margin: 1%; */
    background-color: ${({ dark }) => dark ? "" : "white" };
    height: auto;
    /* background-color: red; */
    /* background: none; */
    /* grid-template-rows: 0.5fr 0.5fr;
    grid-template-areas: "course course"; */
    /* text-align: center; */
    /* grid-gap: 0.25rem; */
`
