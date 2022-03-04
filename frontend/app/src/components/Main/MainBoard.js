import React, { useState } from 'react'
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
import { useEffect } from 'react'
import { SampleCourses } from '../Utilities/Utilities'


export const ENUM_STATES = {
  Dashboard: "Dashboard",
  Courses: "Courses",
  Settings: "Settings"
};

const MainBoard = () => {
  const location = useLocation();
  const { email, token, userFirstTimeLogin, userId, isAuthSignedIn } = location.state;

  const [userInfo, setInfo] = useState({name: "", email: "", role: UserType.NOROLE.title, color: "", bgColor: "", userImage: Profile})
  const [settingModal, setSettingModal] = useState(userFirstTimeLogin)
  const [selectedPage, setSelectedPage] = useState(ENUM_STATES.Dashboard)
  const [announcementIsOpen, setIsOpen] = useState(false)
  const [assignments, setAssignments] = useState([])
  const [onGoingCourses, setCourses] = useState([])
  
  const updateSelectedPage = (page) => {
    setSelectedPage(page)
  }

  const updateSettingModal = () => {
    setSettingModal(false)
  }

  const updateUserInfo = (name, role, userImage) => {
    setInfo(
      {
        name: name,
        role: role.title,
        email: email,
        color: randomHex(),
        bgColor: randomHex(),
        userImage: userImage
      }
    )
  }
  
  const navigate = useNavigate()
  const updateAnnouncement = () => {
    navigate(`/announcement`, {
      state: {
        announcements: SampleAnnouncementsData
      }
    })
  }

  useEffect(() => {
    setAssignments(SampleAssignmentsData)
    setCourses(SampleCourses)
  
  }, [])
  
  

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
        <RideSideBar switchRole={updateUserInfo} userInfo={userInfo} assignments={ assignments}/>
        {
          settingModal  &&
          <SettingsModal updateSettingModal={updateSettingModal} updateUserInfo={updateUserInfo} />
        }
        
      </MainBoardContainer> 
    </>
  )
}

export default MainBoard