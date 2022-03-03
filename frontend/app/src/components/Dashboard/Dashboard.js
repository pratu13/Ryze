import React, { useState } from 'react'
import { MainContentContainer } from '../Custom/GenericStyledElements'
import {
  DashboardMainContentWrapper,
  DashboardHeader,
  HeaderLabel,
  DashboardHeaderRight,
  BellIcon,
  CreateAnnouncementButton
} from './DashboardStyledElements'
import Bell from '../../assets/BellIcon.png'
import { UserType } from '../Utilities/Utilities'

const Dashboard = ({ userInfo, updateAnnouncement }) => {
  return (
    <>
        <DashboardMainContentWrapper>
          <MainContentContainer>
            <DashboardHeader>
            <HeaderLabel>Welcome,</HeaderLabel>
            <DashboardHeaderRight>
              {
                (userInfo.role == UserType.TEACHER.title)  && 
                  <CreateAnnouncementButton>Create Announcement</CreateAnnouncementButton>
              }
              {
                (userInfo.role == UserType.ADMIN.title)  && 
                <CreateAnnouncementButton>Create Announcement</CreateAnnouncementButton>
              }
              <BellIcon src={Bell} onClick={updateAnnouncement}></BellIcon>
            </DashboardHeaderRight>
            </DashboardHeader>
        </MainContentContainer>
        </DashboardMainContentWrapper>
      </>

  )
}

export default Dashboard