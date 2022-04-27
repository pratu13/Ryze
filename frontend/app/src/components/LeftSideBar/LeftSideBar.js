import React from 'react'
import { 
    FooterItems, 
    ItemIcon, 
    ItemLabel, 
    SideBarContainer, 
    SideBarItem, 
    SideBarItemWrapper, 
    SideBarWrapper, 
    SideBarFooterItem, 
    SwitchContainer,
    SwitchTitle} from './LeftSideBarStyledElements'
import DashboardIcon from '../../assets/dashboardIcon.png'
import DashboardDark from '../../assets/darkboardDark.png'
import CoursesIcon from '../../assets/coursesIcon.png'
import CoursesDark from  '../../assets/coursesDark.png'
import SettingsIcon from '../../assets/settingsIcon.png'
import SettingsDark from  '../../assets/settingsDark.png'
import DashboardSeletecIcon from  '../../assets/dashboardSelected.png'
import CoursesSelectedIcon from  '../../assets/coursesSelected.png'
import SettingsSelectedIcon from  '../../assets/settingsSelected.png'
import LogoutIcon from  '../../assets/logoutIcon.png'
import { ENUM_STATES } from '../Main/MainBoard'
import { useNavigate } from 'react-router'
import Light from '../../assets/light.png'
import Dark from '../../assets/dark.png'
import DatePicker from 'react-date-picker'

const LeftSideBar = ({ updateSelectedPage, selectedPage, isAuthSignedIn, toggle, dark }) => {
    const navigate = useNavigate()
  return (
    <>
        <SideBarContainer height="100vh" width="18vw" dark={dark}>
            <SideBarWrapper>
                <SideBarItemWrapper>
                    <SideBarItem onClick={e=> {updateSelectedPage(ENUM_STATES.Dashboard)}}>
                        <ItemIcon src = {(selectedPage === "Dashboard") ? DashboardSeletecIcon : dark ? DashboardDark : DashboardIcon}/>
                        <ItemLabel dark={!dark} selected={selectedPage === "Dashboard" ? true : false}>Dashboard</ItemLabel>
                    </SideBarItem>
                    <SideBarItem onClick={e=> {updateSelectedPage(ENUM_STATES.Courses)}}>
                        <ItemIcon src = {selectedPage === "Courses" ? CoursesSelectedIcon : dark ? CoursesDark : CoursesIcon}/>
                        <ItemLabel dark={!dark} selected={selectedPage === "Courses" ? true : false}>Courses</ItemLabel>
                    </SideBarItem>
                    {/* <SideBarItem onClick={e=> {updateSelectedPage(ENUM_STATES.Settings)}}>
                        <ItemIcon src = {selectedPage === "Settings" ? SettingsSelectedIcon : dark ? SettingsDark : SettingsIcon}/>
                        <ItemLabel dark={!dark} selected={selectedPage === "Settings" ? true : false}>Settings</ItemLabel>
                    </SideBarItem> */}
                </SideBarItemWrapper>
                  <FooterItems>
                      <SwitchContainer dark={dark}>
                          <SwitchTitle dark= {dark}> Switch </SwitchTitle>
                         <ItemIcon src={!dark ? Dark : Light} onClick={() => {toggle()}} />
                      </SwitchContainer>
                        
                    <SideBarFooterItem to='/'>
                            <ItemIcon src={LogoutIcon} />
                            <ItemLabel dark={false}>logout</ItemLabel>
                  </SideBarFooterItem>
                </FooterItems>
            </SideBarWrapper>
        </SideBarContainer>
    </>
  )
}

export default LeftSideBar

