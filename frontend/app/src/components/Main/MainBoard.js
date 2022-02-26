import React, { useState } from 'react'
import { useLocation } from 'react-router'
import Dashboard from '../Dashboard/Dashboard'
import { MainBoardContainer } from './MainBoardStyedElements'
import  LeftSideBar from '../LeftSideBar/LeftSideBar'
import RideSideBar from '../RightSideBar/RideSideBar'
import Courses from '../Courses/Courses'
import Settings from '../Settings/Settings'
import SettingsModal from '../Settings/SettingsModal'
import { randomHex } from '../Utilities/Utilities'
import Profile from '../../assets/ProfileIcon.png'

export const ENUM_STATES = {
  Dashboard: "Dashboard",
  Courses: "Courses",
  Settings: "Settings"
};

const MainBoard = () => {
  // const location = useLocation();
  // const { token, userFirstTimeLogin } = location.state;
  const userFirstTimeLogin = true

  const [userInfo, setInfo] = useState({name: "", email: "", role: "", color: "", bgColor: "", userImage: Profile})
  const [settingModel, setSettingModal] = useState(true)
  const [selectedPage, setSelectedPage] = useState(ENUM_STATES.Dashboard)
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
        role: role,
        email: "pratu@iu.edu",
        color: randomHex(),
        bgColor: randomHex(),
        userImage: userImage
      }
    )
  }

  return (
    <>
      <MainBoardContainer>
          <LeftSideBar updateSelectedPage = {updateSelectedPage} selectedPage={selectedPage}/>
          {(() => {
            switch(selectedPage) {
              case ENUM_STATES.Dashboard:
                  return (
                    <>
                    <Dashboard/>
                    <RideSideBar userInfo={userInfo}/>
                    </>
                  );
              case ENUM_STATES.Courses:
                  return <Courses/>
              case ENUM_STATES.Settings:
                    return <Settings/>
              default:
                <></>
            }
        })()}
        {
          settingModel  &&
          <SettingsModal updateSettingModal={updateSettingModal} updateUserInfo={updateUserInfo} />
        }
      </MainBoardContainer> 
    </>
  )
}

export default MainBoard