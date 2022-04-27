import React, { useState } from 'react'
import { CardFooterContainer, CardFooterImage, CardFooterMessageWrapper, CourseCardContainer, CourseCardTitle, CourseCardWrapper, CourseEnrolledMessage } from './CoursesStyledElements'
import Publish from '../../assets/published.png'
import Unpublish from '../../assets/unpublished.png'

import PublishDark from '../../assets/publishedDark.png'
import UnpublishDark from '../../assets/unpublishedDark.png'


import { UserType } from '../Utilities/Utilities'
import { API } from '../Onboarding/Login/LoginUtilities'
const CourseCard = ({ course, didTapCourseCard, canEnroll, role, token, restrictedTapCourse, dark }) => { 
    const [courseEnrolled, setcourseEnrolled] = useState(false)
    const [publishedIcon, setPublishedIcon] = useState(course.is_active)
    const courseCardClicked = () => {
        if (canEnroll) {
            switch (role.title) {
                case UserType.STUDENT.title:
                    didTapCourseCard(course)
                    break;
                case UserType.TEACHER.title: 
                    restrictedTapCourse(course)
                break;
              case UserType.ADMIN.title:
                if (course.is_active) {
                  restrictedTapCourse(course)
                }
                   
                    break;
                default:
                    break;
            }
        } else {
           didTapCourseCard(course)
        }
    }

  const publishedIconTapped = async () => {
     
        const data = {
            entities: [course.id]
        }
        let api = `${API}/v1/entities?strategy=courses&block=${course.is_active}`
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

  return (
      <>
          <CourseCardWrapper>
        <CourseCardContainer onClick={() => { (role.title === UserType.TEACHER.title || UserType.ADMIN.title) ? courseCardClicked() : console.log("") }} color={course.color}>{ course.title} </CourseCardContainer>
              <CourseCardTitle>{course.created_by}</CourseCardTitle>
              {
                  canEnroll &&
                  <>
                    <CardFooterContainer>
                        {
                            role.title === UserType.ADMIN.title &&
                            <CardFooterImage onClick={ () => { publishedIconTapped() } } src={!dark ? (publishedIcon ?  Publish : Unpublish) : (publishedIcon ?  PublishDark : UnpublishDark)} />
                        }
                        <CardFooterMessageWrapper onClick={() => { courseCardClicked() }} color={course.is_enrolled ? "green" : "red"}>
                              <CourseEnrolledMessage>
                                  {(() => {
                                      switch (role.title) {
                                          case UserType.STUDENT.title:
                                            if (course.is_enrolled) {
                                                return "Enrolled"
                                            } else {
                                              return "Not Enrolled"
                                            }
                                          case UserType.TEACHER.title:
                                            if (course.is_enrolled) return "Enrolled"
                                            return "Not Enrolled"
                                          case UserType.ADMIN.title:
                                            if (course.is_enrolled) return "Enrolled"
                                            return "Not Enrolled"
                                              break;
                                      }
                                    })()}
                              </CourseEnrolledMessage>
                        </CardFooterMessageWrapper>
                    </CardFooterContainer>
                  </>
              }
          </CourseCardWrapper>
         
      </>
  )
}

export default CourseCard