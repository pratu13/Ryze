import { AnimatePresence } from 'framer-motion'
import React, { useEffect, useState }  from 'react'
import { ExitButton, ExitButtonContainer } from '../../Announcement/AnnouncementStyledElements'
import { FormButton, FormInput, FormInputArea, FormLabel, ModalBackgroundWrapper, ModalContent } from '../../Custom/GenericStyledElements'
import ExitButtonIcon from '../../../assets/ExitButtonIcon.png'
import { AssigmentQuestionText, AssignmentSubHeader, AssignmentSubContainer, SubmissionWrapper, GradeFeedbackWrapper, TextLabel, InputWrapper, GradeInput, TitleHeader, FooterTitle, SubmissionContent } from './AssignmentStyledElements'
import { API } from '../../Onboarding/Login/LoginUtilities'
import { handleErrors } from '../../Utilities/Utilities'
import { ItemName } from '../TodoSection/TodoSectionStyledElements'
import { LabelWrapper } from '../../Settings/SettingStyledElements'

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
                    <SubmissionItem assignment={assignment} submission={submission} id={assignment.uid} token={token} didTapCloseIcon={didTapCloseIcon}/>
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

const SubmissionItem = ({ submission, id, token, didTapCloseIcon, assignment }) => {
  console.log(submission)
  const [comment, setComment] = useState("")
  const [grade, setGrade] = useState("")
  const [message, setMessage] = useState("")
  const [alreadyGraded, setAlreadyGraded] = useState(false)

  const gradeSubmission = async () => {
    const data = {
      user: submission.created_by.uid, 
      score: grade,
      max_score: "100",
      comment: comment
    }
    const requestOptions = {
      method: getRequestMethod(),
      headers: {
        'Content-Type': 'application/json',
        'Connection' : 'keep-alive',
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify(data)
    };

    let api = `${API}/v1/grade/${id}`
    await fetch(`${api}`, requestOptions)
        .then(response => handleErrors(response))
        .then(response => response.json())
        .then(data => {
          setTimeout(() => {
            setMessage("Graded")
            // setTimeout(() => {
            //   didTapCloseIcon(false)
            // }, 1500);
        }, 1000);
        })
        .catch(error => console.log(error)) 
  }

  useEffect(() => {
    getGrades()
  }, [])

  const getRequestMethod = () => {
    if (alreadyGraded) {
      return 'PATCH'
    } else {
      return 'POST'
    }
  }
    
  
  const getGrades = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Connection' : 'keep-alive',
        'Authorization' : `Bearer ${token}`
      }
    };
    let api = `${API}/v1/grade/${assignment.uid}`

  await fetch(`${api}`, requestOptions)
      .then(response => handleErrors(response))
      .then(response => response.json())
      .then(data => {  
        if (data.grades.length === 0) {
          setAlreadyGraded(false)
          setGrade("")
        } else {
          data.grades.forEach(grade => {
            if (grade.assignment === assignment.uid && submission.created_by.uid === grade.user.uid ) {
              setAlreadyGraded(true)
              setGrade(grade.score)
            } else {
              setAlreadyGraded(false)
              setGrade("")
            }
          });
         
        }
      })
      .catch(error => console.log(error)) 
  }

  return (
    <>
      <AssignmentSubContainer>
        <SubmissionWrapper>
          <SubmissionContent>
            <TitleHeader>{submission.title} </TitleHeader>
            {submission.user_response}
            {
              submission.submission_link.length >= 5 &&
                <a href = {submission.submission_link} target="_blank"> Download File </a>
            }
            <FooterTitle> {submission.created_by.name} </FooterTitle>
            
          </SubmissionContent>
         
          <GradeFeedbackWrapper>
            <TextLabel color='white'>Grade</TextLabel>
            <InputWrapper>
              <GradeInput widthGiven={true} width={"40px"} color="white" type="text" name="grade" value={grade} onChange={e => setGrade(e.target.value)} required></GradeInput>
              <TextLabel color='white'>/100</TextLabel>

            </InputWrapper>
               
                <TextLabel color='white'>Feedback</TextLabel>
            <FormInputArea color="white" type="text" name="comment" value={comment} onChange={e => setComment(e.target.value)} required></FormInputArea>
            
            <FormButton onClick={() => { gradeSubmission() }} isDisabled={!grade}>{alreadyGraded ? "Update Grade" : "Grade"}</FormButton>
            {
               message != "" && <FormLabel color='green'>{message}</FormLabel>
            }
          </GradeFeedbackWrapper>
          </SubmissionWrapper>
             
      </AssignmentSubContainer>
      
    </>
  );
}