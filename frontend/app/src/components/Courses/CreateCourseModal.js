import React from 'react'

import {
    FormButton,
    FormInput,
    FormLabel,
    FormInputArea,
    ModalBackgroundWrapper,
    ModalContentContainer,
    ModalContent
} from '../Custom/GenericStyledElements'
import {
    InputSectionContainer,
    InputSectionWrapper,
    ButtonWrapper,
    LabelWrapper
} from './../Settings/SettingStyledElements'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

const CreateCourseModal = ({ createCourseTapped  }) => {
    
    const [subject, setSubject] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [sDate, setStartDate] = useState("")
    const [eDate, setEndDate] = useState("")

    const createCourse = () => {
        // call the API to create a new course

        // createCourseTapped()
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
                                            <LabelWrapper>
                                                <FormLabel color='white'>Subject</FormLabel>
                                            </LabelWrapper>
                                            <FormInput color="white" type="text"  value={subject} onChange={e=> setSubject(e.target.value)} name="subject" required></FormInput>
                                            {/* <FormInput color="white" type="text" name="name" value={role} onChange={e=> setRole(e.target.value)} required></FormInput> */}
                                        </InputSectionWrapper>
                                        <InputSectionWrapper>
                                            <LabelWrapper>
                                                <FormLabel color='white'>Course Title</FormLabel>
                                            </LabelWrapper>
                                          <FormInput color="white" type="text" name="title"  value={title} onChange={e=> setTitle(e.target.value)} required></FormInput>
                                      </InputSectionWrapper>
                                    <InputSectionWrapper>
                                        <LabelWrapper>
                                                <FormLabel color='white'>Course Description</FormLabel>
                                         </LabelWrapper>
                                        <FormInputArea color="white" type="text" name="description"  value={description} onChange={e=> setDescription(e.target.value)} required></FormInputArea>
                              </InputSectionWrapper>
                              <InputSectionWrapper>
                                        <LabelWrapper>
                                                <FormLabel color='white'>Start Date</FormLabel>
                                         </LabelWrapper>
                                        <FormInput color="white" type="text" name="description"  value={sDate} onChange={e=> setStartDate(e.target.value)} required></FormInput>
                              </InputSectionWrapper>
                              <InputSectionWrapper>
                                        <LabelWrapper>
                                                <FormLabel color='white'>End Date</FormLabel>
                                         </LabelWrapper>
                                        <FormInput color="white" type="text" name="description"  value={eDate} onChange={e=> setEndDate(e.target.value)} required></FormInput>
                                     </InputSectionWrapper>
                                            <ButtonWrapper>
                                          <FormButton isDisabled={!subject || !title || !description || !sDate || !eDate } onClick={() => {createCourse()}}>Add Course</FormButton>
                                          <FormButton onClick={() => {createCourseTapped()}} isDisabled={false}>Cancel</FormButton>
                                            </ButtonWrapper>
                            </InputSectionContainer>
                        </ModalContent>
                    </ModalContentContainer>
                    </ModalBackgroundWrapper>
            
              </AnimatePresence>
      </>
  )
}

export default CreateCourseModal