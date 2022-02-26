import React, { useState } from 'react'
import {
    FormButton,
    FormInput,
    FormLabel,
    ModalContainer,
    ModalWrapper,
    SucessModalWrapper,
    SucessModalContainer,
    SucessModalContentWrapper,
    ModalImage,
    ModalDescription
} from '../Custom/GenericStyledElements'
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
import Success from '../../assets/success.png'
import Admin from "../../assets/admin.png"
import Student from "../../assets/student.png"
import Teacher from "../../assets/teacher.png"
import DropDownMenu from '../Custom/DropDownMenu'
import { Animated } from "react-animated-css";
const SettingsModal = ({updateSettingModal, updateUserInfo}) => {
    const [name, setName] =  useState("")
    const [role, setRole] = useState("")
    const [userImage, setImage] = useState(Profile)
    const [setupComplete, setComplete] =  useState(false)

    const updateRole = (role) => {
        setRole(role)
        switch(role) {
            case "Admin": setImage(Admin)
            break;
            case "Student": setImage(Student)
            break;
            case "Teacher": setImage(Teacher)
            break;
            default: setImage("")
            break;
          }
    }

    const completeSetup = () => {
        setComplete(true)
        setTimeout(() => {
            updateSettingModal()
            updateUserInfo(name, role, userImage)
          }, 3000);
    }
    return (
        <>
            <ModalContainer>
                {!setupComplete && 
                    <ModalWrapper>
                        <SettingModalContainer>
                            <SettingModalTitle>Let's get you setup</SettingModalTitle>
                            <ProfileContainer>
                                <ProfileIcon src={userImage}></ProfileIcon>
                            </ProfileContainer>
                            <InputSectionContainer>
                                <InputSectionWrapper>
                                    <LabelWrapper>
                                        <FormLabel color='white'>Choose your role</FormLabel>
                                    </LabelWrapper>
                                    <DropDownMenu updateRole={updateRole}/>
                                    {/* <FormInput color="white" type="text" name="name" value={role} onChange={e=> setRole(e.target.value)} required></FormInput> */}
                                </InputSectionWrapper>
                                <InputSectionWrapper>
                                    <LabelWrapper>
                                        <FormLabel color='white'>Enter your name</FormLabel>
                                    </LabelWrapper>
                                    <FormInput color="white" type="text" name="name" value={name} onChange={e=> setName(e.target.value)} required></FormInput>
                                </InputSectionWrapper>
                                    <ButtonWrapper>
                                        <FormButton isDisabled={!name || !role} onClick={completeSetup} >Continue</FormButton>
                                    </ButtonWrapper>
                            </InputSectionContainer>
                        </SettingModalContainer>
                    </ModalWrapper>
                }  
                {
                    setupComplete &&
                    <Animated animationIn="fadeIn" animationOut="fadeInOut" isVisible={ setupComplete }>  
                        <SucessModalContainer>
                                <SucessModalWrapper>
                                    <SucessModalContentWrapper>
                                        <ModalImage src={Success}/>
                                        <ModalDescription>Great!! You are all set</ModalDescription>
                                    </SucessModalContentWrapper>
                                </SucessModalWrapper>
                        </SucessModalContainer>
                    </Animated>
                } 
            </ModalContainer>
        </>
  )
}

export default SettingsModal