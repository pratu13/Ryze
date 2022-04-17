import React, {useState} from 'react'
import { 
    ItemContainer, 
    TodoSectionItemWrapper,
    DueDateLabel,
    InfoSection,
    ItemName,
    ItemStatus,
    ItemSubject
 } from './TodoSectionStyledElements'

import { CardFooterImage } from '../../Courses/CoursesStyledElements'
import Publish from '../../../assets/published.png'
import Unpublish from '../../../assets/unpublished.png'
import { UserType } from '../../Utilities/Utilities'
import { API } from '../../Onboarding/Login/LoginUtilities'
import { CreateAnnouncementButton } from '../../Dashboard/DashboardStyledElements'
const TodoSectionItem = ({ assignment, course, token, role, dark, setTappedAssignment, didTapAssignmentCard, setAssignmentSubCourse, didTapViewGrading}) => {
  const [publishedIcon, setPublishedIcon] = useState(assignment.is_active)
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
          .then(response => response.json())
          .then(data => {
              setPublishedIcon(!publishedIcon)
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
  
  return (
    <>
        <ItemContainer dark={dark} onClick={() => {didTapAssignment()}} >
            <TodoSectionItemWrapper dark={dark}>
           <DueDateLabel dark={dark}>{assignment.due}</DueDateLabel>
                <InfoSection dark={dark}>
                    <ItemName dark={dark}>{assignment.title}</ItemName>
                     <ItemStatus completed={assignment.completed}> {assignment.completed ? 'Submitted': 'Not Submitted'}</ItemStatus>
                </InfoSection>
          <ItemSubject dark={dark}>{course.title}</ItemSubject>
          {
            role.title === UserType.ADMIN.title &&
            <CardFooterImage onClick={ () => { publishedIconTapped() } } src={ publishedIcon ?  Publish : Unpublish} />
           }
        </TodoSectionItemWrapper>
        <ItemName dark={dark}>Description:</ItemName>
        <ItemName dark={dark}>{assignment.description}</ItemName>
        {
          (role.title === UserType.TEACHER.title) &&
          <CreateAnnouncementButton onClick={() => {tappedViewGrading()}}>View Submissions</CreateAnnouncementButton>
        }
       
        </ItemContainer>
    </>
  )
}

export default TodoSectionItem