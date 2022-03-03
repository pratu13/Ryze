import React from 'react'
import { SectionCard } from '../../GenericStyledElements'
import { DescriptionSubtitleLabel, DescriptionTitleLabel, InfoWrapper, TermRoleSection, UserBackgroundColor, UserDescriptionSection, UserImageIcon, UserMailLabel, UserNameLabel, UserNameSection, UserProfileHeader } from './UserInfoStyledElements'

const UserInfo = () => {
  return (
    <>
        <SectionCard>
            <InfoWrapper>
              <UserProfileHeader>
                <UserBackgroundColor/>
                <UserImageIcon/>
              </UserProfileHeader>
              <UserNameSection>
                <UserNameLabel>Carter</UserNameLabel>
                <UserMailLabel>carter@iu.edu</UserMailLabel>
                <UserDescriptionSection>
                  <TermRoleSection>
                    <DescriptionTitleLabel>Term</DescriptionTitleLabel>
                    <DescriptionSubtitleLabel>Fall 2020</DescriptionSubtitleLabel>
                  </TermRoleSection>
                  <TermRoleSection>
                    <DescriptionTitleLabel>Role</DescriptionTitleLabel>
                    <DescriptionSubtitleLabel>Student</DescriptionSubtitleLabel>
                  </TermRoleSection>
                </UserDescriptionSection>
              </UserNameSection>
            </InfoWrapper>
            
        </SectionCard>
    </>
  )
}

export default UserInfo