import styled from "styled-components";

export const CourseCardWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
        transform: scale(1.15);
        transition: all 0.2s ease-in-out;
    }
`

export const CourseCardContainer = styled.div`
  display: flex;
  /* gap: 0.25rem; */
  /* padding: 0.25rem; */
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  height: 165px;
  margin-left: 20px;
  margin-right: 8px;
  margin-top: 20px;
  width: 250px;
  text-align: center;
  background-color: ${({color}) => color};
`

export const CourseCardTitle = styled.div`
    height: 34px;
    width: 190px;
    margin-top: -7%;
    background-color: #F9D9EB;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    color: black;
    font-size: 0.9rem;
`

export const CoursesTitle = styled.h1`
    font-size: 1.6em;
    text-decoration: none;
    text-align: left;
    display: flex;
    width: ${({width}) => width};
    justify-content: flex-start;
    margin-left: ${({width}) => width == "55vw" ? "10%" : "0%"}; 
    margin-top: 5%;
    color: ${({ dark }) => !dark ? "black" : "white" };
    background-clip: padding-box;
`

export const CourseTitle = styled.h1`
    font-size: 1.6em;
    text-decoration: none;
    text-align: left;
    display: flex;
    width: ${({width}) => width};
    justify-content: flex-start;
    color: ${({ dark }) => !dark ? "black" : "white" };
    margin-left: 5%;
`
export const CoursesMainContentWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 1%;
`

export const CardFooterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`

export const CardFooterImage = styled.img`
    height: 24px;
    width: 24px;
    object-fit: contain;
    vertical-align: auto;
    padding-right: 10px;
    cursor: pointer;
`

export const CardFooterMessageWrapper = styled.div`
    display: flex;
    border-radius: 10px;
    height: 34px;
    background-color: ${({ color }) => color};
    color: white;
    align-items: center;
    justify-content: center;
    padding-left: 10px;
    padding-right: 10px;
`

export const CourseEnrolledMessage = styled.p`
    font-size: 1.0em;
    text-decoration: none;
    text-align: left;
    display: flex;
    justify-content: flex-start;
`