import styled from "styled-components";

export const CourseDetailHeader = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    background-color: ${({ dark }) => dark ? "black" : "white" };

`
export const BackIcon = styled.img`
    height: 24px;
    width:24px ;
    object-fit: contain;
    cursor: pointer;
    margin-right: 5%;
    margin-left: 5%;
`
export const CourseSegmentControlContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    /* background-color: orange; */
    margin-top: 5%;
    margin-left: 8%;
`

export const CourseSegmentItemWrapper = styled.div`
    height:44px ;
    border-radius: 22px;
    /* min-width: 150px ; */
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({selected}) => selected ? '#3140C4' : 'rgba(49,64,196,0.4)' };
    /* background-color: rebeccapurple ; */
    padding-left: 2%;
    padding-right: 2%;
    /* margin-left: 10px; */
    cursor: pointer;
`
export const SegmentText = styled.p`
    color: white;
    font-size: 1.2em;
`


export const HomeContentContainer = styled.div`
    width: 90%;
    height: 100vh;
    margin-top: 5%;
`

export const HomeContent = styled.div`
    font-size: medium;
    text-align: justify;
    letter-spacing: 2px;
    line-height: 2.6em;
    color: ${({ dark }) => !dark ? "black" : "white" };
`
