import { AnimatePresence } from 'framer-motion'
import React, { useEffect, useState }  from 'react'
import { ExitButton, ExitButtonContainer } from '../../Announcement/AnnouncementStyledElements'
import { FormButton, FormInputArea, ModalBackgroundWrapper, ModalContent } from '../../Custom/GenericStyledElements'
import ExitButtonIcon from '../../../assets/ExitButtonIcon.png'
import { AssigmentQuestionText, AssignmentSubHeader, AssignmentSubContainer, SubmissionWrapper } from './AssignmentStyledElements'
import { API } from '../../Onboarding/Login/LoginUtilities'
import { handleErrors } from '../../Utilities/Utilities'
import { ItemName } from '../TodoSection/TodoSectionStyledElements'

const Grading = ({ token, course, assignment, didTapCloseIcon }) => {
  console.log(course)
  const [submissions, setsubmissions] = useState([])

  const viewSubmissions = async () => {
    // call the API
  const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Connection' : 'keep-alive',
        'Authorization' : `Bearer ${token}`
      }
    };
    let api = `${API}/v1/courses/${course.id}/assignments/${assignment.uid}/submission`

  await fetch(`${api}`, requestOptions)
      .then(response => handleErrors(response))
      .then(response => response.json())
      .then(data => {
        setsubmissions(data.submissions)
        console.log(submissions)
      })
      .catch(error => console.log(error)) 
  }

  useEffect(() => {
    viewSubmissions()
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

            {
              submissions.length != 0 &&
              submissions.map((submission) => {
                return (
                  <>
                    <SubmissionItem submission={submission} />
                  </>
                );
              })   
            }




{/* 
            <AssignmentSubmissionContainer>
              <SubmissionWrapper>
                <AssignmentSubHeader>
                  <AssigmentQuestionText color="black">{assignment.description}</AssigmentQuestionText>
                  <AssigmentQuestionText color="red">Due: {assignment.due}</AssigmentQuestionText>
                </AssignmentSubHeader>
                
                <FormInputArea width="80%" color="white" type="text" name="answer" value={answer} onChange={e => setAnswer(e.target.value)} required></FormInputArea>
                <FormButton onClick={() => {submitAssignment()}}>Submit</FormButton>
              </SubmissionWrapper>
              
                  
            </AssignmentSubmissionContainer> */}
          </ModalContent>
        </ModalBackgroundWrapper>
      </AnimatePresence>
      
    </>
  )
}

export default Grading

const SubmissionItem = ({ submission }) => {
  return (
    <>
      <AssignmentSubContainer>
          <SubmissionWrapper>
            {submission.title }
          </SubmissionWrapper>
      </AssignmentSubContainer>
      
    </>
  );
}