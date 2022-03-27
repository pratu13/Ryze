import React, { useState, useEffect }   from 'react'
import { EmptyCardTitle, EmptyCardTitleContainer, MainContentContainer, NoCourseImage } from '../Custom/GenericStyledElements'
import {
  DashboardMainContentWrapper,
  DashboardHeader,
  HeaderLabel,
  DashboardHeaderRight,
  BellIcon,
  CourseContainer
} from './DashboardStyledElements'
import Bell from '../../assets/BellIcon.png'
import { Segments } from '../Utilities/Utilities'
import CourseCard from '../Courses/CourseCard'
import { API } from '../Onboarding/Login/LoginUtilities'

import NoCouseImg from '../../assets/courses.png'

import { CoursesTitle } from '../Courses/CoursesStyledElements'
import CourseDetail from '../CourseDetail/CourseDetail'

const Dashboard = ({ token, role, updateAnnouncement, onGoingCourses, createAnnounceTapped, createAssignmentTapped }) => {
  const [couseCardTap, setCourseCardTapped] = useState(false)
  const [course, setCourse] = useState(null)
  const [assignments, setAssignments] = useState([])
  const [announcements, setAnnouncement] = useState([])
  const [isEnrolled, setIsEnrolled] = useState(false)

  const didTapCourseCard = (course_) => {
    setCourseCardTapped(true)
    setCourse(course_)
    getAnnouncements(course_)
    getAssignments(course_)
  } 

  const didTapBackButton = () => {
    setCourseCardTapped(false)
  }

  const [selectedSegment, setSelectedSegment] = useState(Segments.HOME)

  const updateSelectedSegment = (segment_) => {
    setSelectedSegment(segment_)
  }

  const getAPI = (isAnnouncement, courseId) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Connection' : 'keep-alive',
        'Authorization' : `Bearer ${token}`
      }
    }
    if (isAnnouncement) {
      return [`${API}/v1/courses/${courseId}/announcements`, requestOptions]
    } else {
      return [`${API}/v1/courses/${courseId}/assignments`, requestOptions]
    }
  }

  const getAnnouncements = async (course_) => {
    let announcements_ = {}
    let api = getAPI(true, course_.id)
    await fetch(api[0], api[1])
      .then(response => response.json())
      .then(data_ => {
        if (data_.message != "CoursePermission matching query does not exist." || data_.message != "Unauthorized" || data_.message != "Not enough segments" ) {
          data_.announcements.forEach((announcement, index, data_) => {
            let header = announcement.text.split("EOL")
            announcements_[index] = {
              header: header[0],
              time: announcement.created_at,
              subjectName: course_.name,
              color: course_.color,
              description: header[1],
              uid: announcement.uid,
              is_active: announcement.is_active
            }
          });
          setAnnouncement(announcements_)
        }
      })
    .catch(error => console.log(error) )

  }

  const getAssignments = async (course_) => {
    let assignments_ = {}
    let api = getAPI(false, course_.id)
    await fetch(api[0], api[1])
      .then(response => response.json())
      .then(data_ => {
        console.log(data_.assignments)
        if (data_.message != "CoursePermission matching query does not exist." || data_.message != "Unauthorized" || data_.message != "Not enough segments") {
          data_.assignments.forEach((assignment, index, data_) => {
            let duedate = new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "long",
              day: "2-digit"
            }).format(assignments.due_date)
            assignments_[index] = {
              title: assignment.title,
              due: duedate,
              subject: course_.name,
              start: assignment.start_date,
              description: assignment.description,
              completed: false,
              uid: assignment.uid,
              is_active: assignment.is_active
            }
          });
          
          setAssignments(assignments_)
          console.log(assignments)
        }
      })
    .catch(error => console.log(error) )
  }

  return (
    <>
      <DashboardMainContentWrapper>
        <MainContentContainer width="55vw">
          {
            !couseCardTap &&
            <RenderDashboard
              role={role}
              updateAnnouncement={updateAnnouncement}
              onGoingCourses={onGoingCourses}
              didTapCourseCard={didTapCourseCard}
              isEnrolled={isEnrolled}
              setIsEnrolled={setIsEnrolled}
            />
          }
          {
            couseCardTap &&
            <CourseDetail
              announcements={announcements}
              selectedSegment={selectedSegment}
              updateSelectedSegment={updateSelectedSegment}
              course={course}
              didTapBackButton={didTapBackButton}
              assignments={assignments}
              role={role}
              token={token}
              createAnnounceTapped={createAnnounceTapped}
              createAssignmentTapped={ createAssignmentTapped}
            />
          }
        </MainContentContainer>
        </DashboardMainContentWrapper>
      </>
  )
}

const RenderDashboard = ({ role, updateAnnouncement, onGoingCourses, didTapCourseCard, setIsEnrolled, isEnrolled }) => {
  
  return (
    <>
       <DashboardHeader>
              <HeaderLabel>Welcome,</HeaderLabel>
              {/* <DashboardHeaderRight>
                  <BellIcon src={Bell} onClick={() => { updateAnnouncement(true) }}></BellIcon>
              </DashboardHeaderRight> */}
        </DashboardHeader>
      <CoursesTitle width="55vw">On Going Courses</CoursesTitle>
      {
        Object.keys(onGoingCourses).length === 0 &&
        <EmptyCardTitleContainer>
            <NoCourseImage img={ NoCouseImg} />
            <EmptyCardTitle>No On-going courses</EmptyCardTitle>
        </EmptyCardTitleContainer>
      }
      {
        Object.keys(onGoingCourses).length !== 0 &&
        <CourseContainer width="55vw">
        {
          Object.keys(onGoingCourses).map((key, index) => {
            if (onGoingCourses[key].is_enrolled) {
              setIsEnrolled(true)
              return <CourseCard role={role} canEnroll={false}  didTapCourseCard={didTapCourseCard} key={key} course={onGoingCourses[key]} />
            }
          })
            }
            {
              !isEnrolled &&
              <EmptyCardTitleContainer>
                   <NoCourseImage src={ NoCouseImg} />
                    <EmptyCardTitle>No Enrolled courses</EmptyCardTitle>
              </EmptyCardTitleContainer> 
            }
        </CourseContainer>
      }
    </>
  );
}

export default Dashboard