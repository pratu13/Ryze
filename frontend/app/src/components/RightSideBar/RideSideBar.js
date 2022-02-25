import React from 'react'
import { SideBarContainer, SideBarWrapper } from './RideSideBarStyledElements'
import TodoSection from './TodoSection/TodoSection'
import UserInfo from './UserInfoSection/UserInfo'

const RideSideBar = () => {
  return (
    <>
        <SideBarContainer>
            <SideBarWrapper>
                <UserInfo/>
                <TodoSection/>
            </SideBarWrapper>
        </SideBarContainer>
    </>
  )
}

export default RideSideBar