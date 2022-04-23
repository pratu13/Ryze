import React, { useState, useEffect }   from 'react'
import { EmptyCardTitle, EmptyCardTitleContainer, MainContentContainer, NoCourseImage } from '../Custom/GenericStyledElements'
import {
  DashboardMainContentWrapper,
  DashboardHeader,
  HeaderLabel,
  CourseContainer,
  DashboardHeaderRight
} from './DashboardStyledElements'
import { handleErrors, SampleData, Segments, UserType } from '../Utilities/Utilities'
import CourseCard from '../Courses/CourseCard'
import { API } from '../Onboarding/Login/LoginUtilities'

import NoCouseImg from '../../assets/courses.png'

import { CoursesTitle } from '../Courses/CoursesStyledElements'
import CourseDetail from '../CourseDetail/CourseDetail'
import Search from '../Search/Search'
import { SearchContainer } from '../Search/SearchStyledComponents'
import SearchItems from '../Search/SearchItems'

const Dashboard = ({ assignments_, name, email, token, role, updateAnnouncement, onGoingCourses, createAnnounceTapped, createAssignmentTapped, toggle, dark, didTapAssignmentCard, setAssignmentSubCourse, didTapViewGrading, setAssignmentCourse, setTappedAssignment }) => {
  const [couseCardTap, setCourseCardTapped] = useState(false)
  const [course, setCourse] = useState(null)
  const [assignments, setAssignments] = useState([])
  const [announcements, setAnnouncement] = useState([])
  const [isEnrolled, setIsEnrolled] = useState(false)

  const [searchData, setSearchData] = useState()
  const [searchTapped, setSearchTapped] = useState(false)

  const didTapSearch = (show, query) => {
    setSearchTapped(show)
    if (show) {
      search(query)
    }
  }

  const search = async (query) => {
      // call the API
    const data = {
      query: query
    }
  const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Connection' : 'keep-alive',
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify(data)
    };
    let api = `${API}/v1/search/`

  await fetch(`${api}`, requestOptions)
      .then(response => handleErrors(response))
      .then(response => response.json())
      .then(data_ => {
        setSearchData(data_)
        console.log(searchData)
        console.log(data_)
      })
      .catch(error => console.log(error)) 
  }

  const didTapCourseCard = (course_) => {
    if (searchTapped) {
      const course__ = {
        color: course_.color,
        created_by: course_.created_by,
        description: course_.description,
        id: course_.id,
        is_enrolled: course_.is_enrolled,
        title: course_.name,
        published_at: course_.published_at
      }
      setCourse(course__)
      getAnnouncements(course__)
      getAssignments(course__)
      setCourseCardTapped(true)
    } else {
      setCourse(course_)
      getAnnouncements(course_)
      getAssignments(course_)
      setCourseCardTapped(true)
    }
  } 

  const didTapBackButton = () => {

    setCourseCardTapped(false)
  }
  
  useEffect(() => {
    if (Object.keys(assignments_).length !== 0) {
     setAssignments(assignments_)
    }
  }, [])
  


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
    const api = null
    if (searchTapped) {
       api = getAPI(true, course_.id)
    } else {
       api = getAPI(true, course_.uid)
    }
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
    const api = null
    if (searchTapped) {
       api = getAPI(true, course_.id)
    } else {
       api = getAPI(true, course_.uid)
    }
    await fetch(api[0], api[1])
      .then(response => response.json())
      .then(data_ => {
        if (data_.message != "CoursePermission matching query does not exist." || data_.message != "Unauthorized" || data_.message != "Not enough segments") {
          data_.assignments.forEach((assignment, index, data_) => {
            var date = new Date(assignment.due_date);
            assignments_[index] = {
              title: assignment.title,
              due: date.toDateString(),
              subject: course_.name,
              start: assignment.start_date,
              description: assignment.description,
              completed: false,
              uid: assignment.uid,
              is_active: assignment.is_active
            }
          });
          setAssignments(assignments_)
        }
      })
    .catch(error => console.log(error) )
  }

  return (
    <>
      <DashboardMainContentWrapper dark={dark}>
        <MainContentContainer width="55vw" dark={dark}>
          {
            !couseCardTap &&
            <RenderDashboard
              role={role}
              updateAnnouncement={updateAnnouncement}
              onGoingCourses={onGoingCourses}
              didTapCourseCard={didTapCourseCard}
              isEnrolled={isEnrolled}
              setIsEnrolled={setIsEnrolled}
              dark={dark}
              name={name}
              didTapSearch={didTapSearch}
              searchTapped={searchTapped}
              searchData={searchData}
            />
          }
          {
            couseCardTap &&
            <CourseDetail
              email={email}
              announcements={announcements}
              selectedSegment={selectedSegment}
              updateSelectedSegment={updateSelectedSegment}
              course={course}
              didTapBackButton={didTapBackButton}
              assignments={assignments}
              role={role}
              token={token}
              createAnnounceTapped={createAnnounceTapped}
              createAssignmentTapped={createAssignmentTapped}
              dark={dark}
              setTappedAssignment={setTappedAssignment}
              didTapAssignmentCard={didTapAssignmentCard}
              setAssignmentSubCourse={setAssignmentSubCourse}
              didTapViewGrading={didTapViewGrading}
              setAssignmentCourse={setAssignmentCourse}
            />
          }
        </MainContentContainer>
        </DashboardMainContentWrapper>
      </>
  )
}

const RenderDashboard = ({ name, role, onGoingCourses, didTapCourseCard, setIsEnrolled, isEnrolled, dark, didTapSearch, searchTapped, searchData }) => {
  
  return (
    <>
       <DashboardHeader dark ={dark}>
              <HeaderLabel dark={dark}>Welcome,</HeaderLabel>
               <DashboardHeaderRight>
          <Search dark={dark} didTapSearch={didTapSearch} />
              </DashboardHeaderRight> 
      </DashboardHeader>
      {
        searchTapped && 
        <>
          <SearchContainer>
            <CoursesTitle dark={dark} width="55vw">Search Results</CoursesTitle>
            <SearchItems dark={dark} didTapCourseCard={ didTapCourseCard} data={searchData}  />
          </SearchContainer>
        </>
      }
      {
        !searchTapped &&
        <>
          
          {
        role.title == UserType.TEACHER.title &&
        <>
          <CoursesTitle dark={dark} width="55vw">Your Published Courses</CoursesTitle>
          {
          Object.keys(onGoingCourses).length !== 0 &&
          <CourseContainer dark={dark} width="55vw">
            {
              Object.keys(onGoingCourses).map((key, index) => {
                if (onGoingCourses[key].created_by === name) {
                  return <CourseCard role={role} canEnroll={false}  didTapCourseCard={didTapCourseCard} key={key} course={onGoingCourses[key]} />
                }
              })
            }
          </CourseContainer>
          }
        </>
      }


      <CoursesTitle dark={dark} width="55vw">On Going Courses</CoursesTitle>
      {
        Object.keys(onGoingCourses).length === 0 &&
        <EmptyCardTitleContainer dark={dark}>
            <NoCourseImage img={ NoCouseImg} />
            <EmptyCardTitle>No On-going courses</EmptyCardTitle>
        </EmptyCardTitleContainer>
      }
      {
        Object.keys(onGoingCourses).length !== 0 &&
        <CourseContainer dark={dark} width="55vw">
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
              <EmptyCardTitleContainer dark={dark}>
                   <NoCourseImage src={ NoCouseImg} />
                    <EmptyCardTitle>No Enrolled courses</EmptyCardTitle>
              </EmptyCardTitleContainer> 
            }
        </CourseContainer>
      }

        </>
      }
      
    </>
  );
}

export default Dashboard