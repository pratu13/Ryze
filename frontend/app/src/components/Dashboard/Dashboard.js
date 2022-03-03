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

const Dashboard = ({ userInfo, updateAnnouncement }) => {

  const [onGoingCourses, setCourses] = useState([])

  useEffect(() => {
    setCourses(SampleCourses)
  }, [])
  

  return (
    <>
        <DashboardMainContentWrapper>
          <MainContentContainer>
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
          <CoursesTitle>On Going Courses</CoursesTitle>
          <CourseContainer>
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