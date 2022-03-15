import React from 'react'
import { HeaderLabel } from '../Dashboard/DashboardStyledElements'
import { CourseDetailHeader,BackIcon } from './CourseDetailStyledElements'
import BackButton from '../../assets/BackIcon2.png'
import CourseSegmentControl from './CourseSegmentControl'
import { Segments } from '../Utilities/Utilities'
import { useState } from 'react/cjs/react.production.min'
import { useEffect } from 'react/cjs/react.production.min'
const CourseDetail = ({ course, didTapBackButton, selectedSegment, updateSelectedSegment }) => {
    
  return (
      <>
          <CourseDetailHeader> 
              <BackIcon onClick={() => {didTapBackButton()}} src={BackButton}></BackIcon>
              <HeaderLabel>{course.title}</HeaderLabel>
          </CourseDetailHeader>
          <CourseSegmentControl
              segments={Segments}
              selectedSegment={selectedSegment}
              updateSelectedSegment={ updateSelectedSegment}
          />
          {(() => {
              switch (selectedSegment) {
                  case Segments.HOME:
                      return (
                        <>
                              <div>{ course.description}</div>
                        </>
                      );
                case Segments.ANNOUNCEMENT: 
                return (
                    <>
                        <div>{ course.id}</div>
                    </>
                  );
                case Segments.FILES: 
                return (
                    <>
                           <div>This is Files</div>
                    </>
                  );
                case Segments.SYLLABUS: 
                return (
                    <>
                           <div>This is Syllabus</div>
                    </>
                  );
                case Segments.ASSIGNMENTS: 
                return (
                    <>
                           <div>This is Assigments</div>
                    </>
                  );
                    
                // case Segments.MODULES: 
                // return (
                //     <>
                //            <div>This is Modules</div>
                //     </>
                // );
                default:
                  break
            }
          })()}
      </>
  )
}

export default CourseDetail