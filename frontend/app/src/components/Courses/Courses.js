import React from 'react'
import { MainContentContainer } from '../Custom/GenericStyledElements'
import {
  CourseContainer,
  DashboardHeader,
  DashboardHeaderRight,
  CreateAnnouncementButton
} from '../Dashboard/DashboardStyledElements'
import CourseCard from './CourseCard'
import { CoursesMainContentWrapper, CourseTitle } from './CoursesStyledElements'
import { UserType } from '../Utilities/Utilities'
import { useState } from 'react'
import { API } from '../Onboarding/Login/LoginUtilities'
const Courses = ({ onGoingCourses, userInfo, modalTapped, token }) => {


  const didTapCourseCard = (course_) => {
    enrollCourse(course_.id)
  } 

  const enrollCourse = async (course_id) => {
    let api = `${API}/v1/course/enroll/${course_id}`
    // console.log(api)
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Connection' : 'keep-alive',
        'Authorization' : `Bearer ${token}`
      }
    };
    await fetch(`${api}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        // console.log(data)
      })
      .catch(error => console.log(error))
  }

 
  return (
    <>
      <MainContentContainer width="55vw"> 
        <DashboardHeader>
          <CourseTitle width="55vw">All Courses</CourseTitle>
                <DashboardHeaderRight>
                  {
                    (userInfo.role === UserType.TEACHER.title)  && 
                      <CreateAnnouncementButton onClick={() => {modalTapped()}}>Create Course</CreateAnnouncementButton>
                  }
                  {
                    (userInfo.role === UserType.ADMIN.title)  && 
                    <CreateAnnouncementButton  onClick={() => {modalTapped()}}>Create Course</CreateAnnouncementButton>
                  }
                </DashboardHeaderRight>
            </DashboardHeader>
            <CourseContainer width="55vw">
              {
                Object.keys(onGoingCourses).map((key, index) => (       
                  <>
                    <CourseCard userInfo={userInfo} canEnroll={true} didTapCourseCard={didTapCourseCard} key={key} course = {onGoingCourses[key]} />
                  </>           
                ))      
              }
              </CourseContainer>
        </MainContentContainer>
      </>
  )
}

export default Courses


const RenderCourse = ({ didTapCourseCard, userInfo }) => {
  
}

const RenderCourseDetail = ({ didTapCourseCard, userInfo }) => {
  
}