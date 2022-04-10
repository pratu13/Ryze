import React from 'react'
import { SectionCard } from '../../Custom/GenericStyledElements'
import { DescriptionSubtitleLabel, DescriptionTitleLabel, InfoWrapper, TermRoleSection, UserBackgroundColor, UserDescriptionSection, UserImageIcon, UserMailLabel, UserNameLabel, UserNameSection, UserProfileHeader } from './UserInfoStyledElements'
import DropDownMenu from '../../Custom/DropDownMenu'

const UserInfo = ({ userInfo, switchRole, dark }) => {
  return (
    <>
        <SectionCard dark={dark}>
            <InfoWrapper>
              <UserProfileHeader>
                <UserBackgroundColor color={ userInfo.bgColor}/>
            <UserImageIcon src={ userInfo.userImage} color={ userInfo.color}/>
              </UserProfileHeader>
              <UserNameSection>
            <UserNameLabel dark={dark}>{userInfo.name}</UserNameLabel>
            <UserMailLabel dark={dark}>{userInfo.email}</UserMailLabel>
            <UserDescriptionSection>
              <TermRoleSection>
                    <DescriptionTitleLabel dark={dark}>Role</DescriptionTitleLabel>
                    <DescriptionSubtitleLabel  dark={dark}>{userInfo.role}</DescriptionSubtitleLabel>
                  </TermRoleSection>
                  <TermRoleSection>
                <DropDownMenu dark={dark} color="transparent" width="10px" switchRole={switchRole} isSwitch={true} name={ userInfo.name}/>
                  </TermRoleSection>
                  
                </UserDescriptionSection>
              </UserNameSection>
            </InfoWrapper>
            
        </SectionCard>
    </>
  )
}

export default UserInfo