import React from 'react'
import { CourseCardContainer, CourseCardTitle, CourseCardWrapper } from './CoursesStyledElements'
const CourseCard = ({ course, didTapCourseCard }) => {
  return (
      <>
          <CourseCardWrapper onClick={() => { didTapCourseCard(course) }} >
              <CourseCardContainer color={ course.color} />
              <CourseCardTitle>{ course.title }</CourseCardTitle>
          </CourseCardWrapper>
         
      </>
  )
}

export default CourseCard