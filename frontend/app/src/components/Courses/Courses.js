import React, { useState} from 'react'
import { MainContentContainer } from '../Custom/GenericStyledElements'
import {
  CourseContainer,
  DashboardHeader,
  DashboardHeaderRight,
  CreateAnnouncementButton
} from '../Dashboard/DashboardStyledElements'
import CourseCard from './CourseCard'
import { CourseTitle } from './CoursesStyledElements'
import { UserType } from '../Utilities/Utilities'
import { API } from '../Onboarding/Login/LoginUtilities'
import CourseDetail from '../CourseDetail/CourseDetail'
import { Segments } from '../Utilities/Utilities'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

const Courses = ({ onGoingCourses, role, modalTapped, token, getCourses, createAnnounceTapped, createAssignmentTapped, dark }) => {
  const [couseCardTap, setCourseCardTapped] = useState(false)
  const [course, setCourse] = useState(null)
  const [assignments, setAssignments] = useState([])
  const [announcements, setAnnouncement] = useState([])
  const [isEnrolled, setIsEnrolled] = useState(false)

  const didTapCourseCard = (course_) => {
    enrollCourse(course_.id)
  }

  const enrollCourse = async (course_id) => {
    let api = `${API}/v1/course/enroll/${course_id}`
    console.log(api)
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
        console.log(data)
        getCourses()
      })
      .catch(error => console.log(error))
  }

  const restrictedTapCourse = (course_) => {
    setCourseCardTapped(true)
    setCourse(course_)
    getAnnouncements(course_)
    getAssignments(course_)
  } 

  const didTapBackButton = () => {
    setAnnouncement([])
    setAssignments([])
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
        console.log(data_)
        if (data_.message != "CoursePermission matching query does not exist." || data_.message != "Unauthorized" || data_.message != "Not enough segments" ) {
          data_.announcements.forEach((announcement, index, data_) => {
            let header = announcement.text.split("EOL")
            announcements_[index] = {
              header: header[0],
              is_active: announcement.is_active,
              time: announcement.created_at,
              subjectName: course_.name,
              color: course_.color,
              description: header[1],
              uid: announcement.uid
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
              is_active: assignment.is_active,
              subject: course_.name,
              start: assignment.start_date,
              description: assignment.description,
              completed: false,
              uid: assignment.uid
            }
          });
          
          setAssignments(assignments_)
        }
      })
    .catch(error => console.log(error) )
  }

 
  return (
    <>
      <MainContentContainer dark={dark} width="55vw"> 
        {
          !couseCardTap &&
            <>
              <DashboardHeader dark={dark}>
                      <CourseTitle dark={dark} width="55vw">All Courses</CourseTitle>
                            <DashboardHeaderRight dark={dark}>
                              {
                                (role.title == UserType.TEACHER.title)  && 
                                  <CreateAnnouncementButton onClick={() => {modalTapped()}}>Create Course</CreateAnnouncementButton>
                              }
                              {
                                (role.title == UserType.ADMIN.title)  && 
                                <CreateAnnouncementButton  onClick={() => {modalTapped()}}>Create Course</CreateAnnouncementButton>
                              }
                            </DashboardHeaderRight>
                        </DashboardHeader>
                    <CourseContainer dark={dark} width="55vw">
              {
                (role.title === UserType.TEACHER.title) &&
                Object.keys(onGoingCourses).map((key, index) => {
                    if (onGoingCourses[key].is_active) {
                      return (
                        <CourseCard restrictedTapCourse={restrictedTapCourse} token={token} role={role} canEnroll={true} didTapCourseCard={didTapCourseCard} key={key} course={onGoingCourses[key]} />
                      );
                    }
                  }) 
              }
              {
              (role.title === UserType.ADMIN.title) &&
              Object.keys(onGoingCourses).map((key, index) => {
                return (
                  <CourseCard restrictedTapCourse={restrictedTapCourse} token={token} role={role} canEnroll={true} didTapCourseCard={didTapCourseCard} key={key} course={onGoingCourses[key]} />
                );
                }) 
              }
              {
                (role.title === UserType.STUDENT.title ) &&
                Object.keys(onGoingCourses).map((key, index) => (       
                  <>
                    <CourseCard restrictedTapCourse={ restrictedTapCourse}token={token} role={role} canEnroll={true} didTapCourseCard={didTapCourseCard} key={key} course = {onGoingCourses[key]} />
                  </>           
                ))      
              }
             </CourseContainer>         
            </>
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
            dark= {dark}
            role={role}
            token={token}
              createAnnounceTapped={createAnnounceTapped}
              createAssignmentTapped={ createAssignmentTapped}
            />
         }
        </MainContentContainer>
      </>
  )
}

export default Courses

