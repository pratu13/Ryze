import { AnimatePresence } from 'framer-motion'
import React, { useState, useEffect }  from 'react'
import { ExitButton, ExitButtonContainer } from '../../Announcement/AnnouncementStyledElements'
import { FormButton, FormInputArea, FormLabel, ModalBackgroundWrapper, ModalContent } from '../../Custom/GenericStyledElements'
import ExitButtonIcon from '../../../assets/ExitButtonIcon.png'
import { AssigmentQuestionText, AssignmentSubHeader, AssignmentSubmissionContainer, SubmissionWrapper } from './AssignmentStyledElements'
import { API } from '../../Onboarding/Login/LoginUtilities'
import { handleErrors } from '../../Utilities/Utilities'

const AssignmentSubmission = ({ token, course, assignment, didTapCloseIcon }) => {
  console.log(assignment)
  const [answer, setAnswer] = useState("")
  const [message, setMessage] = useState("")
  const [isLate, setIsLate] = useState(false)

  const submitAssignment = async () => {
    // call the API
    const data = {
      answer: answer
    }
    console.log(data)
  const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Connection' : 'keep-alive',
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify(data)
    };
    let api = `${API}/v1/courses/${course.id}/assignments/${assignment.uid}/submission`
    console.log(api)

  await fetch(`${api}`, requestOptions)
      .then(response => handleErrors(response))
      .then(response => response.json())
      .then(data => {
        setTimeout(() => {
          setMessage("Assignment Submitted")
          setTimeout(() => {
             didTapCloseIcon(false)
          }, 1500);
      }, 1000);
      })
      .catch(error => console.log(error)) 

  }

  useEffect(() => {
    const submissionDate = new Date(assignment.due)
    const today = new Date()
    if (submissionDate < today) {
      setIsLate(true)
    }
  }, [])


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
                            
            <ExitButtonContainer>   
              <ExitButton src={ExitButtonIcon} onClick={() => { didTapCloseIcon(false) }} />
            </ExitButtonContainer>

            <AssignmentSubmissionContainer>
              <SubmissionWrapper>
                <AssignmentSubHeader>
                  <AssigmentQuestionText color="black">{assignment.description}</AssigmentQuestionText>
                  <AssigmentQuestionText color="red">Due: {assignment.due} { isLate ? "(LATE)" : ""}</AssigmentQuestionText>
                </AssignmentSubHeader>
                
                <FormInputArea width="80%" color="white" type="text" name="answer" value={answer} onChange={e => setAnswer(e.target.value)} required></FormInputArea>
                <FormButton isDisabled={answer === "" || isLate} onClick={() => { submitAssignment() }}>Submit</FormButton>
                {
                    message != "" && <FormLabel color='green'>{message}</FormLabel>
                }
              </SubmissionWrapper>
            </AssignmentSubmissionContainer>
          </ModalContent>
        </ModalBackgroundWrapper>
      </AnimatePresence>
      
    </>
  )
}

export default AssignmentSubmission