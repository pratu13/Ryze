import React from 'react'
import { UserType } from '../Utilities/Utilities'
import { SideBarContainer, SideBarWrapper } from './RideSideBarStyledElements'
import TodoSection from './TodoSection/TodoSection'
import UserInfo from './UserInfoSection/UserInfo'

const RideSideBar = ({ userInfo, assignments, switchRole}) => {
  return (
    <>
      <SideBarContainer>
          <SideBarWrapper>
          <UserInfo switchRole={ switchRole } userInfo={userInfo} />
          {
            userInfo.role == UserType.STUDENT.title && 
              <TodoSection assignments={ assignments }/>
          }
        
          </SideBarWrapper>
        </SideBarContainer>
    </>
  )
}

export default RideSideBar