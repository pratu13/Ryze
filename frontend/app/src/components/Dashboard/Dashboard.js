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
import { SampleCourses, Segments, UserType } from '../Utilities/Utilities'
import CourseCard from '../Courses/CourseCard'
import { useEffect } from 'react'

import { CoursesTitle } from '../Courses/CoursesStyledElements'
import CourseDetail from '../CourseDetail/CourseDetail'

const Dashboard = ({ userInfo, updateAnnouncement, onGoingCourses }) => {
  const [couseCardTap, setCourseCardTapped] = useState(false)
  const [course, setCourse] = useState(null)

  const didTapCourseCard = (course_) => {
    setCourseCardTapped(true)
    setCourse(course_)
  } 

  const didTapBackButton = () => {
    setCourseCardTapped(false)
  }

  const [selectedSegment, setSelectedSegment] = useState(Segments.HOME)

  const updateSelectedSegment = (segment_) => {
    setSelectedSegment(segment_)
}
  return (
    <>
      <DashboardMainContentWrapper>
        <MainContentContainer width="55vw">
          {
            !couseCardTap &&
            <RenderDashboard
              userInfo={userInfo}
              updateAnnouncement={updateAnnouncement}
              onGoingCourses={onGoingCourses}
              didTapCourseCard={didTapCourseCard} />
          }
          {
            couseCardTap && <CourseDetail selectedSegment={selectedSegment} updateSelectedSegment={ updateSelectedSegment} course={course} didTapBackButton={didTapBackButton}/>
          }
        </MainContentContainer>
        </DashboardMainContentWrapper>
      </>
  )
}

const RenderDashboard = ({ userInfo, updateAnnouncement, onGoingCourses, didTapCourseCard }) => {
  return (
    <>
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
                <CourseCard didTapCourseCard={ didTapCourseCard} key={key} course = {onGoingCourses[key]} />
              </>           
            ))      
          }
        </CourseContainer>
    </>
  );
}

export default Dashboard