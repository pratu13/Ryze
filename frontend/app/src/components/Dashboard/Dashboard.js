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
import { API } from '../Onboarding/Login/LoginUtilities'

import { CoursesTitle } from '../Courses/CoursesStyledElements'
import CourseDetail from '../CourseDetail/CourseDetail'

const Dashboard = ({ token, userInfo, updateAnnouncement, onGoingCourses, createAnnounceTapped, createAssignmentTapped }) => {
  const [couseCardTap, setCourseCardTapped] = useState(false)
  const [course, setCourse] = useState(null)
  const [assignments, setAssignments] = useState([])
  const [announcements, setAnnouncement] = useState([])

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

  const getAnnouncements = async (course) => {
    let announcements_ = {}
    let api = getAPI(true, course.id)

    await fetch(api[0], api[1])
      .then(response => response.json())
      .then(data => {
        if (data.message != "CoursePermission matching query does not exist." || data.message != "Unauthorized"  ) {
          data.announcements.forEach((announcement, index, data) => {
            let header = announcement.text.split("EOL")
            announcements_[index] = {
              header: header[0],
              time: announcement.created_at,
              subjectName: course.name,
              color: course.color,
              description: header[1]
            }
          });
          setAnnouncement(announcements_)
        }
      })
    .catch(error => console.log(error) )

  }

  const getAssignments = async (course) => {
    let assignments_ = {}
    let api = getAPI(false, course.id)
    await fetch(api[0], api[1])
      .then(response => response.json())
      .then(data => {
        if (data.message != "CoursePermission matching query does not exist." || data.message != "Unauthorized") {
          data.assignments.forEach((assignment, index, data) => {
            let duedate = new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "long",
              day: "2-digit"
            }).format(assignments.due_date)
            assignments_[index] = {
              title: assignment.title,
              due: duedate,
              subject: course.name,
              start: assignment.start_date,
              description: assignment.description,
              completed: false
            }
          });
          setAssignments(assignments_)
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
              userInfo={userInfo}
              updateAnnouncement={updateAnnouncement}
              onGoingCourses={onGoingCourses}
              didTapCourseCard={didTapCourseCard}
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
              userInfo={userInfo}
              createAnnounceTapped={createAnnounceTapped}
              createAssignmentTapped={ createAssignmentTapped}
            />
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
                  <BellIcon src={Bell} onClick={() => { updateAnnouncement(true) }}></BellIcon>
              </DashboardHeaderRight>
        </DashboardHeader>
        <CoursesTitle width="55vw">On Going Courses</CoursesTitle>
        <CourseContainer width="55vw">
        {
          Object.keys(onGoingCourses).map((key, index) => {
            if (onGoingCourses[key].is_enrolled) {
              return <CourseCard userInfo={userInfo} canEnroll={false}  didTapCourseCard={didTapCourseCard} key={key} course={onGoingCourses[key]} />
            }
          })      
          }
        </CourseContainer>
    </>
  );
}

export default Dashboard