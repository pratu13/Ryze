import React from 'react'
import {
    CourseSegmentControlContainer,
    CourseSegmentItemWrapper,
    SegmentText
} from './CourseDetailStyledElements';

const CourseSegmentControl = ({ segments, selectedSegment, updateSelectedSegment }) => {

  return (
      <>
          <CourseSegmentControlContainer>
              {
                  Object.keys(segments).map((key, index) => (
                      <CourseSegmentItem
                          key={key}
                          selectedSegment={selectedSegment}
                          segment={segments[key]}
                          updateSelectedSegment={updateSelectedSegment}
                      />       
                ))
              } 
          </CourseSegmentControlContainer>
      </>
  )
}

const CourseSegmentItem = ({ key, selectedSegment, segment, updateSelectedSegment }) => {
    return (
        <>
            <CourseSegmentItemWrapper onClick={() => {
                updateSelectedSegment(segment)
            }} selected={selectedSegment == segment}>
                <SegmentText>{ segment }</SegmentText>
            </CourseSegmentItemWrapper>
        </>
    );

}

export default CourseSegmentControl