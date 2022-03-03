import React from 'react'
import { CourseCardContainer, CourseCardTitle, CourseCardWrapper } from './CoursesStyledElements'
const CourseCard = ({ course }) => {
  return (
      <>
          <CourseCardWrapper>
              <CourseCardContainer color={ course.color} />
              <CourseCardTitle>{ course.title }</CourseCardTitle>
          </CourseCardWrapper>
         
      </>
  )
}

export default CourseCard