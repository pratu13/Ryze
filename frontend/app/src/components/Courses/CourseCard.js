import React from 'react'
import { CardFooterContainer, CardFooterImage, CardFooterMessageWrapper, CourseCardContainer, CourseCardTitle, CourseCardWrapper, CourseEnrolledMessage } from './CoursesStyledElements'
import { useState } from 'react'
import { Animated } from 'react-animated-css'
import Publish from '../../assets/published.png'
import Unpublish from '../../assets/unpublished.png'
import { UserType } from '../Utilities/Utilities'
const CourseCard = ({ course, didTapCourseCard, canEnroll, userInfo }) => { 
    const [courseEnrolled, setcourseEnrolled] = useState(false)
    const [publishedIcon, setPublishedIcon] = useState(true)
    const courseCardClicked = () => {
        didTapCourseCard(course)
        // if (canEnroll) {
        //     setcourseEnrolled(true)
        //     setTimeout(() => {
        //         setcourseEnrolled(false)
        //     }, 2000);
        // }
    }

    const publishedIconTapped = () => {
        setPublishedIcon(!publishedIcon)
    }

  return (
      <>
          <CourseCardWrapper onClick={() => { canEnroll ? console.log("") : courseCardClicked() }}>
              <CourseCardContainer color={course.color}/>
              <CourseCardTitle>{course.title}</CourseCardTitle>
              {
                  canEnroll &&
                  <>
                    <CardFooterContainer>
                        {
                            userInfo.role === UserType.ADMIN.title &&
                            <CardFooterImage onClick={ () => { publishedIconTapped() } } src={ publishedIcon ?  Publish : Unpublish} />
                        }
                          
                        <CardFooterMessageWrapper onClick={() => { courseCardClicked() }} color={course.is_enrolled ? "green" : "red"}>
                            <CourseEnrolledMessage>{course.is_enrolled ? "Enrolled" : "Not Enrolled"}</CourseEnrolledMessage>
                        </CardFooterMessageWrapper>
                    </CardFooterContainer>
                  </>
              }
          </CourseCardWrapper>
         
      </>
  )
}

export default CourseCard