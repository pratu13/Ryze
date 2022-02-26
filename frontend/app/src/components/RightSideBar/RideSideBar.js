import React from 'react'
import { SideBarContainer, SideBarWrapper } from './RideSideBarStyledElements'
import TodoSection from './TodoSection/TodoSection'
import UserInfo from './UserInfoSection/UserInfo'

const RideSideBar = ({ userInfo}) => {
  return (
    <>
      <SideBarContainer>
          <SideBarWrapper>
            <UserInfo userInfo={ userInfo}/>
          <TodoSection/>
          </SideBarWrapper>
        </SideBarContainer>
    </>
  )
}

export default RideSideBar