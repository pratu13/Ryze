import React from 'react'
import { 
    FooterItems, 
    ItemIcon, 
    ItemLabel, 
    SideBarContainer, 
    SideBarItem, 
    SideBarItemWrapper, 
    SideBarWrapper, 
    SideBarFooterItem } from './LeftSideBarStyledElements'
import DashboardIcon from  '../../assets/dashboardIcon.png'
import CoursesIcon from  '../../assets/coursesIcon.png'
import SettingsIcon from  '../../assets/settingsIcon.png'
import DashboardSeletecIcon from  '../../assets/dashboardSelected.png'
import CoursesSelectedIcon from  '../../assets/coursesSelected.png'
import SettingsSelectedIcon from  '../../assets/settingsSelected.png'
import LogoutIcon from  '../../assets/logoutIcon.png'
import { ENUM_STATES } from '../Main/MainBoard'

const LeftSideBar = ({updateSelectedPage, selectedPage}) => {
  return (
    <>
        <SideBarContainer>
            <SideBarWrapper>
                <SideBarItemWrapper>
                    <SideBarItem onClick={e=> {updateSelectedPage(ENUM_STATES.Dashboard)}}>
                        <ItemIcon src = {selectedPage === "Dashboard" ? DashboardSeletecIcon : DashboardIcon}/>
                        <ItemLabel dark={true}selected={selectedPage === "Dashboard" ? true : false}>Dashboard</ItemLabel>
                    </SideBarItem>
                    <SideBarItem onClick={e=> {updateSelectedPage(ENUM_STATES.Courses)}}>
                        <ItemIcon src = {selectedPage === "Courses" ? CoursesSelectedIcon : CoursesIcon}/>
                        <ItemLabel dark={true} selected={selectedPage === "Courses" ? true : false}>Courses</ItemLabel>
                    </SideBarItem>
                    <SideBarItem onClick={e=> {updateSelectedPage(ENUM_STATES.Settings)}}>
                        <ItemIcon src = {selectedPage === "Settings" ? SettingsSelectedIcon : SettingsIcon}/>
                        <ItemLabel dark={true} selected={selectedPage === "Settings" ? true : false}>Settings</ItemLabel>
                    </SideBarItem>
                </SideBarItemWrapper>
                <FooterItems>
                    <SideBarFooterItem to='/'>
                        <ItemIcon src = {LogoutIcon}/>
                        <ItemLabel dark={false}>logout</ItemLabel>
                    </SideBarFooterItem>
                </FooterItems>
            </SideBarWrapper>
        </SideBarContainer>
    </>
  )
}

export default LeftSideBar

