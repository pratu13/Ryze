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
const Courses = ({ onGoingCourses, userInfo }) => {

  return (
    <>
      <MainContentContainer width="55vw"> 
        <DashboardHeader>
          <CourseTitle width="55vw">All Courses</CourseTitle>
                <DashboardHeaderRight>
                  {
                    (userInfo.role === UserType.TEACHER.title)  && 
                      <CreateAnnouncementButton>Create Course</CreateAnnouncementButton>
                  }
                  {
                    (userInfo.role === UserType.ADMIN.title)  && 
                    <CreateAnnouncementButton>Create Course</CreateAnnouncementButton>
                  }
                </DashboardHeaderRight>
            </DashboardHeader>
            
            <CourseContainer width="55vw">
              {
                Object.keys(onGoingCourses).map((key, index) => (       
                  <>
                    <CourseCard key={key} course = {onGoingCourses[key]} />
                  </>           
                ))      
              }
              </CourseContainer>
        </MainContentContainer>
      </>
  )
}

export default Courses