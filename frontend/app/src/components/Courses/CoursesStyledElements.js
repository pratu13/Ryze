import styled from "styled-components";

export const CourseCardWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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
  width: 280px;
  background-color: ${({color}) => color};;
`

export const CourseCardTitle = styled.div`
    height: 44px;
    width: 237px;
    margin-top: -9%;
    background-color: #F9D9EB;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    color: black;
    font-weight: bold;
    font-size: 1.5rem;
`

export const CoursesTitle = styled.h1`
    font-size: 1.6em;
    text-decoration: none;
    text-align: left;
    display: flex;
    width: 55vw;
    justify-content: flex-start;
    margin-left: 10%;
    margin-top: 5%;
`