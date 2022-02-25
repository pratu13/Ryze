import React, { useState } from 'react'
import {
    FormButton,
    FormInput,
    FormLabel,
    ModalContainer,
    ModalWrapper
} from '../GenericStyledElements'
import {
    ProfileContainer,
    SettingModalTitle,
    SettingModalContainer,
    ProfileIcon,
    InputSectionContainer,
    InputSectionWrapper,
    ButtonWrapper,
    LabelWrapper
} from './SettingStyledElements'
import Profile from '../../assets/ProfileIcon.png'
const SettingsModal = () => {
    const [name, setName] =  useState("")
    const [role, setRole] =  useState("")

    return (
        <>
            <ModalContainer>
                <ModalWrapper>
                    <SettingModalContainer>
                        <SettingModalTitle>Let's get you setup</SettingModalTitle>
                        <ProfileContainer>
                            <ProfileIcon src={Profile}></ProfileIcon>
                        </ProfileContainer>
                        <InputSectionContainer>
                            <InputSectionWrapper>
                                <LabelWrapper>
                                    <FormLabel color='white'>Enter your name</FormLabel>
                                </LabelWrapper>
                                <FormInput color="white" type="text" name="name" value={name} onChange={e=> setName(e.target.value)} required></FormInput>
                            </InputSectionWrapper>
                            <InputSectionWrapper>
                                <LabelWrapper>
                                    <FormLabel color='white'>Choose your role</FormLabel>
                                </LabelWrapper>
                                <FormInput color="white" type="text" name="name" value={role} onChange={e=> setRole(e.target.value)} required></FormInput>
                            </InputSectionWrapper>
                            <ButtonWrapper>
                                <FormButton isDisabled={!name || !role} >Continue</FormButton>
                            </ButtonWrapper>
                        </InputSectionContainer>
                    </SettingModalContainer>
                </ModalWrapper>
            </ModalContainer>
        </>
  )
}

export default SettingsModal