import React, { useState }  from 'react'
import { MainContentContainer } from '../Custom/GenericStyledElements'
import {
  DashboardMainContentWrapper,
  DashboardHeader,
  HeaderLabel,
  DashboardHeaderRight,
  BellIcon,
  CreateAnnouncementButton,
  CourseContainer
} from './DashboardStyledElements'
import Bell from '../../assets/BellIcon.png'
import { SampleCourses, UserType } from '../Utilities/Utilities'
import CourseCard from '../Courses/CourseCard'
import { useEffect } from 'react'

import { CoursesTitle } from '../Courses/CoursesStyledElements'

const Dashboard = ({ userInfo, updateAnnouncement, onGoingCourses }) => {

  return (
    <>
        <DashboardMainContentWrapper>
          <MainContentContainer width="55vw">
            <DashboardHeader>
              <HeaderLabel>Welcome,</HeaderLabel>
              <DashboardHeaderRight>
                {
                  (userInfo.role === UserType.TEACHER.title)  && 
                    <CreateAnnouncementButton>Create Announcement</CreateAnnouncementButton>
                }
                {
                  (userInfo.role === UserType.ADMIN.title)  && 
                  <CreateAnnouncementButton>Create Announcement</CreateAnnouncementButton>
                }
                <BellIcon src={Bell} onClick={updateAnnouncement}></BellIcon>
              </DashboardHeaderRight>
          </DashboardHeader>
          <CoursesTitle width="55vw">On Going Courses</CoursesTitle>
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
        </DashboardMainContentWrapper>
      </>

  )
}

export default Dashboard