import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import Dashboard from '../Dashboard/Dashboard'
import { MainBoardContainer } from './MainBoardStyedElements'
import  LeftSideBar from '../LeftSideBar/LeftSideBar'
import RideSideBar from '../RightSideBar/RideSideBar'
import Courses from '../Courses/Courses'
import Settings from '../Settings/Settings'
import SettingsModal from '../Settings/SettingsModal'
import { randomHex, SampleAnnouncementsData, SampleAssignmentsData, UserType } from '../Utilities/Utilities'
import Profile from '../../assets/ProfileIcon.png'
import { API } from '../Onboarding/Login/LoginUtilities'
import Admin from "../../assets/admin.png"
import Student from "../../assets/student.png"
import Teacher from "../../assets/teacher.png"
import { Subjects } from '../Utilities/Utilities'

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
  const [announcementIsOpen, setIsOpen] = useState(false)
  const [assignments, setAssignments] = useState([])
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
    let api = ""
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
    if (role.title == UserType.STUDENT.title) {
      api = `${API}/v1/user`
    } else {
      api = `${API}/v1/teacher`
    }
    updateUserProfile(api, requestOptions, name_, role_, userImage)
  }
  
  const navigate = useNavigate()

  const updateAnnouncement = () => {
    navigate(`/announcement`, {
      state: {
        announcements: announcements
      }
    })
  }

  useEffect(() => {
    if (!userFirstTimeLogin) {
      let userImage_ = null
      let role_ = UserType.NOROLE
      if (role.title == UserType.STUDENT.title) {
        userImage_ = Student
        role_ = UserType.STUDENT
      } else if ((role.title == UserType.TEACHER.title)) {
        userImage_ = Teacher
        role_ = UserType.TEACHER
      } else if ((role.title == UserType.ADMIN.title)) {
        userImage_ = Admin
        role_ = UserType.ADMIN
      } else {
        userImage_ = Student
        role_ = UserType.STUDENT
      }
        setInfo(
          {
            name: name,
            role: role_.title,
            email: email,
            color: color,
            bgColor: randomHex(),
            userImage: userImage_
          }
        )
      console.log(userInfo)
    }
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

  const getAnnouncements = async (course) => {
    let announcements_ = {}
    let api = getAPI(true, course.id)

    await fetch(api[0], api[1])
      .then(response => response.json())
      .then(data => {
        if (data.message != "CoursePermission matching query does not exist.") {
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
        if (data.message != "Unauthorized") {
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
          getAnnouncements(course)
          getAssignments(course)
      });
        setCourses(courses)
      }) 
      .catch(error => console.log(error) )
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
                      <Dashboard userInfo={userInfo} updateAnnouncement={updateAnnouncement} onGoingCourses={ onGoingCourses}/>
                    </>
                  );
              case ENUM_STATES.Courses:
                return <Courses userInfo={userInfo} onGoingCourses={ onGoingCourses}/>
              case ENUM_STATES.Settings:
                    return <Settings/>
              default:
                <></>
            }
        })()}
        <RideSideBar switchRole={switchRoles} userInfo={userInfo} assignments={ assignments}/>
        {
          settingModal  &&
          <SettingsModal updateSettingModal={updateSettingModal} updateUserInfo={updateUserInfo} />
        }
        
      </MainBoardContainer> 
    </>
  )
}

export default MainBoard