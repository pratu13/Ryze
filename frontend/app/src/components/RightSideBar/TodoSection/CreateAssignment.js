import React from 'react'
import {
    InputSectionContainer,
    InputSectionWrapper,
    ButtonWrapper,
    LabelWrapper
} from '../../Settings/SettingStyledElements'

import {
    FormButton,
    FormInput,
    FormLabel,
    FormInputArea,
    ModalBackgroundWrapper,
    ModalContentContainer,
    ModalContent
} from '../../Custom/GenericStyledElements'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { SubjectTagContainer, SubjectText } from '../../Announcement/AnnouncementStyledElements'
import { API } from '../../Onboarding/Login/LoginUtilities'
import { CDatePicker } from '../../Custom/GenericStyledElements'
import { handleErrors } from '../../Utilities/Utilities'

const CreateAssignmentModal = ({ token, course, createAssignmentTapped }) => {
    
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [sDate, setStartDate] = useState(new Date())
    const [eDate, setEndDate] = useState(new Date())
    const [message, setMessage] = useState("")

    const publishAssignment = async () => {
        // call the API to publish an assignment
        const data = {
            title: title,
            start_date: sDate.toISOString().split('T')[0],
            due_date: eDate.toISOString().split('T')[0],
            description: description
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
        let api = `${API}/v1/courses/${course.id}/assignments`

        await fetch(`${api}`, requestOptions)
            .then(response => handleErrors(response))
            .then(response => response.json())
            .then(data => {
                setTimeout(() => {
                    setMessage("Assignment Published")
                    setTimeout(() => {
                        createAssignmentTapped(course)
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
                                                <FormLabel color='white'>Assignment Title</FormLabel>
                                            </LabelWrapper>
                                          <FormInput color="white" type="text" name="title"  value={title} onChange={e=> setTitle(e.target.value)} required></FormInput>
                                      </InputSectionWrapper>
                                    <InputSectionWrapper>
                                        <LabelWrapper>
                                                <FormLabel color='white'>Assignment Description</FormLabel>
                                         </LabelWrapper>
                                        <FormInputArea color="white" type="text" name="description"  value={description} onChange={e=> setDescription(e.target.value)} required></FormInputArea>
                              </InputSectionWrapper>
                              <InputSectionWrapper>
                                        <LabelWrapper>
                                                <FormLabel color='white'>Start Date</FormLabel>
                                  </LabelWrapper>
                                  <CDatePicker color="white" onChange={setStartDate} value={sDate} ></CDatePicker>
  
                                        {/* <FormInput color="white" type="text" name="description"  value={sDate} onChange={e=> setStartDate(e.target.value)} required></FormInput> */}
                              </InputSectionWrapper>
                              <InputSectionWrapper>
                                        <LabelWrapper>
                                                <FormLabel color='white'>Due Date</FormLabel>
                                  </LabelWrapper>
                                  <CDatePicker color="white" onChange={setEndDate} value={eDate} ></CDatePicker>
                                        {/* <FormInput color="white" type="text" name="description"  value={eDate} onChange={e=> setEndDate(e.target.value)} required></FormInput> */}
                                     </InputSectionWrapper>
                                            <ButtonWrapper>
                                          <FormButton onClick={() => {publishAssignment()}} isDisabled={ !title || !description || !sDate || !eDate }>Send</FormButton>
                                          <FormButton onClick={() => {createAssignmentTapped()}} isDisabled={false}>Cancel</FormButton>
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

export default CreateAssignmentModal