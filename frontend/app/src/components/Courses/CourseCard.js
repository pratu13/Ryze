import React from 'react'
import { CourseCardContainer } from './CoursesStyledElements'
const CourseCard = ({ course }) => {
  return (
      <>
          <CourseCardContainer>
              { course }
          </CourseCardContainer>
      </>
  )
}

export default CourseCard