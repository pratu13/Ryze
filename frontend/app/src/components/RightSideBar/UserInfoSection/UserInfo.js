import React from 'react'
import { SectionCard } from '../../Custom/GenericStyledElements'
import { DescriptionSubtitleLabel, DescriptionTitleLabel, InfoWrapper, TermRoleSection, UserBackgroundColor, UserDescriptionSection, UserImageIcon, UserMailLabel, UserNameLabel, UserNameSection, UserProfileHeader } from './UserInfoStyledElements'

const UserInfo = ({ userInfo }) => {
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
                    <DescriptionTitleLabel>Date Joined</DescriptionTitleLabel>
                    <DescriptionSubtitleLabel>2022</DescriptionSubtitleLabel>
                  </TermRoleSection>
                  <TermRoleSection>
                    <DescriptionTitleLabel>Role</DescriptionTitleLabel>
                <DescriptionSubtitleLabel>{userInfo.role}</DescriptionSubtitleLabel>
                  </TermRoleSection>
                </UserDescriptionSection>
              </UserNameSection>
            </InfoWrapper>
            
        </SectionCard>
    </>
  )
}

export default UserInfo