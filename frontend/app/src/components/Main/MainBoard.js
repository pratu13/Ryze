import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import Dashboard from '../Dashboard/Dashboard'
import { MainBoardContainer } from './MainBoardStyedElements'
import  LeftSideBar from '../LeftSideBar/LeftSideBar'
import RideSideBar from '../RightSideBar/RideSideBar'
import Courses from '../Courses/Courses'
import Settings from '../Settings/Settings'
import SettingsModal from '../Settings/SettingsModal'
import { randomHex, UserType } from '../Utilities/Utilities'
import Profile from '../../assets/ProfileIcon.png'
import { API } from '../Onboarding/Login/LoginUtilities'
import CreateAnnouncementModal from '../Announcement/CreateAnnouncement'
import CreateCourseModal from '../Courses/CreateCourseModal'
import Announcement from '../Announcement/Announcement'
import CreateAssignmentModal from '../RightSideBar/TodoSection/CreateAssignment'

export const ENUM_STATES = {
  Dashboard: "Dashboard",
  Courses: "Courses",
  Settings: "Settings"
};

const MainBoard = () => {
  const location = useLocation();
  const { email, token, name, color, role, userFirstTimeLogin, isAuthSignedIn } = location.state;

  const [userInfo, setInfo] = useState({name: "", email: "", role: UserType.NOROLE.title, color: "", bgColor: "", userImage: Profile})
  const [settingModal, setSettingModal] = useState(userFirstTimeLogin)
  const [selectedPage, setSelectedPage] = useState(ENUM_STATES.Dashboard)
  const [announcementIsOpen, setAnnouncementIsOpen] = useState(false)
  const [assignmentIsOpen, setAssignmentIsOpen] = useState(false)

  const [openAnnouncement, setOpenAnnouncement] = useState(false)
  const [courseIsOpen,setCourseIsOpen] = useState(false)
  // const [assignments, setAssignments] = useState([])
  const [onGoingCourses, setCourses] = useState([])
  const [announcements, setAnnouncement] = useState([])
  
  const updateSelectedPage = (page) => {
    setSelectedPage(page)
  }

  const updateSettingModal = () => {
    setSettingModal(false)
  }

  const updateUserProfile = async (api, requestOptions, name_, role_, color_, userImage) => {
    await fetch(`${api}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        setInfo({
            name: name_,
            role: role_.title,
            email: email,
            color: color_,
            bgColor: randomHex(),
            userImage: userImage
          }
        )
      })
      .catch(error => console.log(error))
  }


  const switchRoles = (name_, role_, userImage) => {
    setInfo({
      name: name_,
      role: role_.title,
      email: email,
      color: color,
      bgColor: randomHex(),
      userImage: userImage
    })
    getCourses()
  }

  const updateUserInfo = (name_, role_, userImage) => {
    const color = randomHex()
    const data = {
      name: name_,
      color: color
    }
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Connection' : 'keep-alive',
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify(data)
    };
    let api = `${API}/v1/user`
    updateUserProfile(api, requestOptions, name_, role_, userImage)
  }


  const updateAnnouncement = (isOpen) => {
    // navigate(`/announcement`, {
    //   state: {
    //     announcements: announcements
    //   }
    // })
    setOpenAnnouncement(isOpen)
  }

  useEffect(() => {
    if (!userFirstTimeLogin) {
      let role_ = UserType.STUDENT
      if (role.title == UserType.STUDENT.title) {
        role_ = UserType.STUDENT
      } else if ((role.title == UserType.TEACHER.title)) {
        role_ = UserType.TEACHER
      } else if ((role.title == UserType.ADMIN.title)) {
        role_ = UserType.ADMIN
      } 
        setInfo(
          {
            name: name,
            role: role_.title,
            email: email,
            color: color,
            bgColor: randomHex(),
            userImage: role_.img
          }
        )
       
    } else {
      setInfo({
        name: name,
        role: role.title,
        email: email,
        color: color,
        bgColor: randomHex(),
        userImage: role.img
      })
     
    }
    updateUserInfo(name, role, role.img)
    getCourses()
  }, [])

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

  // const getAnnouncements = async (course) => {
  //   let announcements_ = {}
  //   let api = getAPI(true, course.id)

  //   await fetch(api[0], api[1])
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data.message != "CoursePermission matching query does not exist.") {
  //         data.announcements.forEach((announcement, index, data) => {
  //           let header = announcement.text.split("EOL")
  //           announcements_[index] = {
  //             header: header[0],
  //             time: announcement.created_at,
  //             subjectName: course.name,
  //             color: course.color,
  //             description: header[1]
  //           }
  //         });
  //         setAnnouncement(announcements_)
  //       }
  //     })
  //   .catch(error => console.log(error) )

  // }

  // const getAssignments = async (course) => {
  //   let assignments_ = {}
  //   let api = getAPI(false, course.id)
  //   await fetch(api[0], api[1])
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data.message != "Unauthorized") {
  //         data.assignments.forEach((assignment, index, data) => {
  //           let duedate = new Intl.DateTimeFormat("en-GB", {
  //             year: "numeric",
  //             month: "long",
  //             day: "2-digit"
  //           }).format(assignments.due_date)
  //           assignments_[index] = {
  //             title: assignment.title,
  //             due: duedate,
  //             subject: course.name,
  //             start: assignment.start_date,
  //             description: assignment.description,
  //             completed: false
  //           }
  //         });
  //         setAssignments(assignments_)
  //       }
  //     })
  //   .catch(error => console.log(error) )
  // }
  
  const getCourses = async () => {
    let courses = {}
    let api = ""
    if (userInfo.role == UserType.STUDENT.title) {
      api = `${API}/v1/courses/user`
    } else {
      api = `${API}/v1/courses/teacher`
    }
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
        data.courses.forEach((course, index, data) => {
          courses[index] = {
            color: course.color,
            created_by: course.created_by,
            description: course.description,
            id: course.id,
            is_enrolled: true,
            title: course.name,
            published_at: course.published_at
          }
      });
        setCourses(courses)
      }) 
      .catch(error => console.log(error) )
  }

  const createAnnounceTapped = (course) => {
    getCourses()
    setAnnouncementIsOpen(!announcementIsOpen)
    setAnnouncementCourse(course)
  }

  const createAssignmentTapped = (course) => {
    getCourses()
    setAssignmentIsOpen(!assignmentIsOpen)
    setAssignmentCourse(course)
  }

  const [announcementCourse, setAnnouncementCourse] = useState()
  const [assignmentCourse, setAssignmentCourse] = useState()

  const createCourseTapped = () => {
    getCourses()
    setCourseIsOpen(!courseIsOpen)
  }
  return (
    <>
      <MainBoardContainer>
          <LeftSideBar updateSelectedPage = {updateSelectedPage} selectedPage={selectedPage} isAuthSignedIn ={isAuthSignedIn} />
          {(() => {
            switch(selectedPage) {
              case ENUM_STATES.Dashboard:
                  return (
                    <>
                      <Dashboard
                        // announcements={announcements}
                        userInfo={userInfo}
                        updateAnnouncement={updateAnnouncement}
                        createAnnounceTapped={createAnnounceTapped}
                        onGoingCourses={onGoingCourses}
                        createAssignmentTapped={ createAssignmentTapped}
                      />
                    </>
                  );
              case ENUM_STATES.Courses:
                return <Courses
                  modalTapped={createCourseTapped}
                  userInfo={userInfo}
                  onGoingCourses={onGoingCourses}
                  token={ token}
                />
              case ENUM_STATES.Settings:
                    return <Settings/>
              default:
                <></>
            }
        })()}
        <RideSideBar
          switchRole={switchRoles}
          userInfo={userInfo}
          // assignments={assignments}
        />
        {
          settingModal  &&
          <SettingsModal updateSettingModal={updateSettingModal} updateUserInfo={updateUserInfo} />
        }
        {
          announcementIsOpen &&
          <CreateAnnouncementModal token={token} course={announcementCourse} createAnnounceTapped={createAnnounceTapped} announcementIsOpen={ announcementIsOpen} />
        }
        {
          assignmentIsOpen && 
          <CreateAssignmentModal token={token}  course={assignmentCourse} createAssignmentTapped={ createAssignmentTapped }  />
        }
        {
          courseIsOpen &&
          <CreateCourseModal token={token} createCourseTapped={createCourseTapped}/>
        }

        {
          openAnnouncement &&
          <Announcement announcements={announcements} updateAnnouncement={updateAnnouncement}></Announcement>
          // <CreateCourseModal token={token} createCourseTapped={createCourseTapped}/>
        }
      </MainBoardContainer> 
    </>
  )
}

export default MainBoard