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
import { UserType } from '../Utilities/Utilities'
import CourseCard from '../Courses/CourseCard'
import { useEffect } from 'react'

const Dashboard = ({ userInfo, updateAnnouncement }) => {

  const [onGoingCourses, setCourses] = useState([])

  useEffect(() => {
    setCourses({ "1": "Course 1", "2" : "Course 2", "3" : "Course 3", "4": "Course 4"})
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