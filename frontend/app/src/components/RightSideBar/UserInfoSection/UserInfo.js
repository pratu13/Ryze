import React from 'react'
import { SectionCard } from '../../Custom/GenericStyledElements'
import { DescriptionSubtitleLabel, DescriptionTitleLabel, InfoWrapper, TermRoleSection, UserBackgroundColor, UserDescriptionSection, UserImageIcon, UserMailLabel, UserNameLabel, UserNameSection, UserProfileHeader } from './UserInfoStyledElements'
import DropDownMenu from '../../Custom/DropDownMenu'

const UserInfo = ({ userInfo, switchRole }) => {
  return (
    <>
        <SectionCard>
            <InfoWrapper>
              <UserProfileHeader>
                <UserBackgroundColor color={ userInfo.bgColor}/>
            <UserImageIcon src={ userInfo.userImage} color={ userInfo.color}/>
              </UserProfileHeader>
              <UserNameSection>
            <UserNameLabel>{userInfo.name}</UserNameLabel>
            <UserMailLabel>{userInfo.email}</UserMailLabel>
            <UserDescriptionSection>
              <TermRoleSection>
                    <DescriptionTitleLabel>Role</DescriptionTitleLabel>
                    <DescriptionSubtitleLabel>{userInfo.role}</DescriptionSubtitleLabel>
                  </TermRoleSection>
                  <TermRoleSection>
                <DropDownMenu color="transparent" width="10px" switchRole={switchRole} isSwitch={true} name={ userInfo.name}/>
                  </TermRoleSection>
                  
                </UserDescriptionSection>
              </UserNameSection>
            </InfoWrapper>
            
        </SectionCard>
    </>
  )
}

export default UserInfo