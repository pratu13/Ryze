import React, { useState } from 'react'
import Dashboard from '../Dashboard/Dashboard'
import { MainBoardContainer } from './MainBoardStyedElements'
import  LeftSideBar from '../LeftSideBar/LeftSideBar'
import RideSideBar from '../RightSideBar/RideSideBar'
import Courses from '../Courses/Courses'
import Settings from '../Settings/Settings'

export const ENUM_STATES = {
  Dashboard: "Dashboard",
  Courses: "Courses",
  Settings: "Settings"
};

const MainBoard = () => {

  const [selectedPage, setSelectedPage] = useState(ENUM_STATES.Dashboard)
  const updateSelectedPage = (page) => {
    setSelectedPage(page)
  }
  return (
    <>
      <MainBoardContainer>
          <LeftSideBar updateSelectedPage = {updateSelectedPage} selectedPage={selectedPage}/>
          {(function() {
            switch(selectedPage) {
              case ENUM_STATES.Dashboard:
                  return (
                    <>
                    <Dashboard/>
                    <RideSideBar/>
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
         
      </MainBoardContainer> 
    </>
  )
}

export default MainBoard