import React, {useState, useEffect} from 'react'
import { 
    ItemContainer, 
    TodoSectionItemWrapper,
    DueDateLabel,
    InfoSection,
    ItemName,
    ItemStatus,
    ItemSubject,
    FooterButtonContainer,
    FooterGradesContainer,
    GradeText,
    FooterWrapper,
    CommentText,
    GradeTextField
 } from './TodoSectionStyledElements'

import { CardFooterImage } from '../../Courses/CoursesStyledElements'
import Publish from '../../../assets/published.png'
import Unpublish from '../../../assets/unpublished.png'
import { getGrade, handleErrors, UserType } from '../../Utilities/Utilities'
import { API } from '../../Onboarding/Login/LoginUtilities'
import { CreateAnnouncementButton } from '../../Dashboard/DashboardStyledElements'
import { FormButton } from '../../Custom/GenericStyledElements'
import { GradeInput } from '../Assignment/AssignmentStyledElements'
import PublishDark from '../../../assets/publishedDark.png'
import UnpublishDark from '../../../assets/unpublishedDark.png'

const TodoSectionItem = ({ assignment, course, token, role, dark, setTappedAssignment, didTapAssignmentCard, setAssignmentSubCourse, didTapViewGrading}) => {
  const [publishedIcon, setPublishedIcon] = useState(assignment.is_active)
  const [completed, setIsCompleted] = useState(false)
  const [isGraded, setIsGraded] = useState(false)
  const [viewGradesTapped, setViewGrades] = useState(false)
  const [grade, setGrade] = useState()
  const [tempGrade, setTempGrade] = useState()
  const [maxGrade, setMaxGrade] = useState()
  const [comments, setComments] = useState("")

  const [localScore, seTlocalScore] = useState()

  const [showWhatIfGrade, setShowWhatIf] = useState(false)
  const [whatIfGrade, setWhatIf] = useState("")
  
  const publishedIconTapped = async () => {

        const data = {
            entities: [assignment.uid]
        }
        let api = `${API}/v1/entities?strategy=assignments&block=${assignment.is_active}`
        const requestOptions = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Connection' : 'keep-alive',
            'Authorization' : `Bearer ${token}`
            },
          body: JSON.stringify(data)
        };
    await fetch(`${api}`, requestOptions)
      .then(response => handleErrors(response))
          .then(response => response.json())
          .then(data => {
              setPublishedIcon(!publishedIcon)
          })
          .catch(error => console.log(error))
  }
  
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
      if (data.submissions.length != 0) {
        data.submissions.forEach(submission => {
          if (submission.title == assignment.title) {
            setIsCompleted(true)
          }
        });
        } else {
          setIsCompleted(false)
        }
      })
      .catch(error => console.log(error)) 
  }
  
  const didTapAssignment = () => {
    setTappedAssignment(assignment)
    didTapAssignmentCard(true)
    setAssignmentSubCourse(course)
  }
  const tappedViewGrading = () => {
    didTapViewGrading(true)
    setTappedAssignment(assignment)
  }

  useEffect(() => {
    viewSubmissions()
    getGrades()
  }, [])
  
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
          setIsGraded(false)
        } else {
          console.log(data.grades)
          data.grades.forEach(grade => {
            if (grade.assignment == assignment.uid) {
              setGrade(grade.score)
              setTempGrade(grade.score)
              setMaxGrade(grade.max_score)
              setComments(grade.comment)
            }
          });
          setIsGraded(true)
        }
      })
      .catch(error => console.log(error)) 
  }

  const gradeChanged = () => {
    viewGrades()
    setShowWhatIf(!showWhatIfGrade)
    // scores = scores.map(score => parseInt(score));
    // scores.push(parseInt(grade))
  }

  const viewGrades = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Connection' : 'keep-alive',
        'Authorization' : `Bearer ${token}`
      }
    };
    let api = `${API}/v1/grade/course/${course.id}`

  await fetch(`${api}`, requestOptions)
      .then(response => handleErrors(response))
      .then(response => response.json())
    .then(data => {  
        const gradeScores = []
      Object.keys(data.grades).map((key) => {
          if (data.grades[key].assignment != assignment.uid) {
            gradeScores.push(parseInt(data.grades[key].score))
          }
        })
      console.log(gradeScores)
      gradeScores.push(parseInt(grade))
      console.log(gradeScores)
      setWhatIf(getGrade(gradeScores))
      setGrade(tempGrade)
      })
      .catch(error => console.log(error)) 
  }
  
  return (
    <>
        <ItemContainer dark={dark} bgColor={course.color}>
            <TodoSectionItemWrapper dark={dark}>
           <DueDateLabel dark={dark}>{assignment.due}</DueDateLabel>
                <InfoSection dark={dark} onClick={() => {didTapAssignment()}}>
            <ItemName dark={dark}>{assignment.title}</ItemName>
            {
              (role.title === UserType.STUDENT.title) &&
              <ItemStatus completed={(role.title === UserType.STUDENT.title) && completed}> { (role.title === UserType.STUDENT.title) && completed ? 'Submitted': 'Not Submitted'}</ItemStatus>
            }     
                </InfoSection>
          <ItemSubject dark={dark}>{course.title}</ItemSubject>
          {
            role.title === UserType.ADMIN.title &&
            <CardFooterImage onClick={ () => { publishedIconTapped() } } src={ !dark ? (publishedIcon ?  Publish : Unpublish) : (publishedIcon ?  PublishDark : UnpublishDark) } />
           }
        </TodoSectionItemWrapper>
        <ItemName dark={dark}>Description:</ItemName>
        <ItemName dark={dark}>{assignment.description}</ItemName>
        <FooterWrapper>
            <FooterButtonContainer>
              {
                (role.title === UserType.TEACHER.title) &&
                <CreateAnnouncementButton onClick={() => {tappedViewGrading()}}>View Submissions</CreateAnnouncementButton>
              }
              {
                (role.title === UserType.STUDENT.title) &&
                  <>
                  <CreateAnnouncementButton>View My Submissions</CreateAnnouncementButton>
                  <CreateAnnouncementButton isDisabled={!isGraded} onClick={() => { setViewGrades(!viewGradesTapped) }}> { isGraded ? (viewGradesTapped ? "Hide" : "View Grades") : "Not graded yet"}</CreateAnnouncementButton>
                {viewGradesTapped &&
                  
                  <FooterGradesContainer place={"flex-end"}>
                     <CreateAnnouncementButton isDisabled={!grade} onClick={() => { gradeChanged() }}> Grade Lookup </CreateAnnouncementButton>
                     <GradeInput widthGiven={true} width={"40px"} color="white" type="text" name="grade" value={grade} onChange={e => setGrade(e.target.value)} required></GradeInput>
                      <GradeText>
                      / { maxGrade}
                    </GradeText>
                    {
                      showWhatIfGrade &&
                      <GradeText>
                      { whatIfGrade }
                      </GradeText>
                    }
                    </FooterGradesContainer>
                }
                 </>
              }
            </FooterButtonContainer>
            {
              viewGradesTapped &&
              <>
                <ItemName dark={dark}>Feedback</ItemName>
                  <FooterGradesContainer place={"flex-start"}>
                        <CommentText>{comments}</CommentText>
                      </FooterGradesContainer>
           
                </>
            }
        </FooterWrapper>
       
        </ItemContainer>
    </>
  )
}

export default TodoSectionItem