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
  console.log(userInfo.role)
  return (
    <>
        <DashboardMainContentWrapper>
          <MainContentContainer>
            <DashboardHeader>
            <HeaderLabel>Welcome,</HeaderLabel>
            <DashboardHeaderRight>
              {
              (userInfo.role == UserType.TEACHER.title || UserType.ADMIN.title) && 
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