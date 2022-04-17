import React, { useState } from 'react'
import {
    InputSectionContainer,
    InputSectionWrapper,
    ButtonWrapper,
    LabelWrapper
} from '../Settings/SettingStyledElements'

import {
    FormButton,
    FormInput,
    FormLabel,
    FormInputArea,
    ModalBackgroundWrapper,
    ModalContentContainer,
    ModalContent
} from '../Custom/GenericStyledElements'
import { AnimatePresence } from 'framer-motion'
import { SubjectTagContainer, SubjectText } from './AnnouncementStyledElements'
import { API } from '../Onboarding/Login/LoginUtilities'
import { handleErrors } from '../Utilities/Utilities'

const CreateAnnouncementModal = ({ token, course, createAnnounceTapped, announcementIsOpen }) => {
    
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [message, setMessage] = useState("")

    const sendAnnouncement = async () => {
        // call the API to send the announcement

        const data = {
            text: title + " EOL " + description
        }
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Connection' : 'keep-alive',
              'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify(data)
          };
        let api = `${API}/v1/courses/${course.id}/announcements`

        await fetch(`${api}`, requestOptions)
            .then(response => handleErrors(response))
            .then(response => response.json())
            .then(data_ => {
                setTimeout(() => {
                    setMessage("Announcement Published")
                    setTimeout(() => {
                        createAnnounceTapped(course)
                    }, 1500);
                }, 1000);
        })
        .catch(error => console.log(error))   
    } 

  return (
      <>
          <AnimatePresence>
                    <ModalBackgroundWrapper
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1,
                        transition: {
                            duration: 0.3
                        }
                    }}
                      exit={{
                          opacity: 0
                      }}
                >
                    <ModalContentContainer
                        initial={{
                            scale: 0
                        }}
                        animate={{
                            scale: 1,
                            transition: {
                                duration: 0.3
                            }
                        }}
                        exit={{
                            scale: 0
                        }}
                    >
                        <ModalContent
                            initial={{
                                x: 100,
                                opacity: 0
                            }}
                            animate={{
                                x: 0,
                                opacity: 1,
                                transition: {
                                    delay: 0.3,
                                    duration: 0.3
                                }
                            }}
                              exit={{
                                x: 100,
                                opacity: 0
                            }}
                        >
                            <InputSectionContainer>
                                        <InputSectionWrapper>
                                            <SubjectTagContainer color={course.color}>
                                                <SubjectText>{course.title}</SubjectText>
                                            </SubjectTagContainer>
                                        </InputSectionWrapper>
                                        <InputSectionWrapper>
                                            <LabelWrapper>
                                                <FormLabel color='white'>Announcement Title</FormLabel>
                                            </LabelWrapper>
                                          <FormInput color="white" type="text" name="title"  value={title} onChange={e=> setTitle(e.target.value)} required></FormInput>
                                      </InputSectionWrapper>
                                    <InputSectionWrapper>
                                        <LabelWrapper>
                                                <FormLabel color='white'>Announcement Description</FormLabel>
                                         </LabelWrapper>
                                        <FormInputArea width="335px" color="white" type="text" name="description"  value={description} onChange={e=> setDescription(e.target.value)} required></FormInputArea>
                                     </InputSectionWrapper>
                                            <ButtonWrapper>
                                          <FormButton onClick={() => {sendAnnouncement()}} isDisabled={ !title || !description }>Send</FormButton>
                                          <FormButton onClick={() => {createAnnounceTapped()}} isDisabled={false}>Cancel</FormButton>
                              </ButtonWrapper>
                              {
                                  message != "" && <FormLabel color='green'>{message}</FormLabel>
                              }
                            </InputSectionContainer>
                        </ModalContent>
                    </ModalContentContainer>
                    </ModalBackgroundWrapper>
            
              </AnimatePresence>
      </>
  )
}

export default CreateAnnouncementModal