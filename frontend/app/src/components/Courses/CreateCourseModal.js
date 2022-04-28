import React from 'react'

import {
    FormButton,
    FormInput,
    FormLabel,
    FormInputArea,
    ModalBackgroundWrapper,
    ModalContentContainer,
    ModalContent,
    CDatePicker
} from '../Custom/GenericStyledElements'
import {
    InputSectionContainer,
    InputSectionWrapper,
    ButtonWrapper,
    LabelWrapper
} from './../Settings/SettingStyledElements'

import DatePicker from 'react-date-picker'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { API } from '../Onboarding/Login/LoginUtilities'
import { randHex, randomHex } from '../Utilities/Utilities'

const CreateCourseModal = ({ createCourseTapped, token  }) => {
    
    const [subject, setSubject] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [sDate, setStartDate] = useState(new Date())
    const [eDate, setEndDate] = useState(new Date())
    const [courseCreated, setCourseCreated] = useState(false)

    const createCourse = async () => {
        console.log("Gello")
        let api = `${API}/v1/courses`
        const data = {
            name: subject,
            description: description,
            color: randomHex()
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
        await fetch(`${api}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setTimeout(() => {
                    setCourseCreated(true)
                    setTimeout(() => {
                        createCourseTapped()
                    }, 2000);
                    
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
                                  <FormInputArea width={ "335px"}color="white" type="text" name="description"  value={description} onChange={e=> setDescription(e.target.value)} required></FormInputArea>
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
                                                <FormLabel color='white'>End Date</FormLabel>
                                  </LabelWrapper>
                                  <CDatePicker color="white" onChange={setEndDate} value={eDate} ></CDatePicker>
                                        {/* <FormInput color="white" type="text" name="description"  value={eDate} onChange={e=> setEndDate(e.target.value)} required></FormInput> */}
                                     </InputSectionWrapper>
                                            <ButtonWrapper>
                                          <FormButton isDisabled={!subject || !title || !description || !sDate || !eDate } onClick={() => {createCourse()}}>Add Course</FormButton>
                                          <FormButton onClick={() => {createCourseTapped()}} isDisabled={false}>Cancel</FormButton>
                              </ButtonWrapper>
                              {
                                  courseCreated &&
                                //   <InputSectionContainer>
                                        <FormLabel color='green'>Course Created Successfully</FormLabel>
                                //   </InputSectionContainer>   
                              }
                              
                            </InputSectionContainer>
                        </ModalContent>
                    </ModalContentContainer>
                    </ModalBackgroundWrapper>
            
              </AnimatePresence>
      </>
  )
}

export default CreateCourseModal