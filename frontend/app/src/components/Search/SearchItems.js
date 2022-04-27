import React from 'react'
import { EmptyCardTitle, EmptyCardTitleContainer, NoCourseImage } from '../Custom/GenericStyledElements';
import { CourseContentContainer, CourseContentSubtitle, CourseContentTitle, CourseItemBg, CourseItemContainer, SearchItemWrapper } from './SearchStyledComponents';
import NoSearch from '../../assets/nosearch.png'
const SearchItemType =  {
    COURSE: "course",
    ASSIGNMENT: "assigment",
    ANNOUNCEMENT: "announcement"
}

const CourseItem = ({ course, didTapCourseCard, dark }) => {
    
    return (
        <>
            <CourseItemContainer>
                <CourseItemBg onClick ={() => {didTapCourseCard(course)}} color={course.color} />
                <CourseContentContainer>
                    <CourseContentTitle dark={dark}>{course.name}</CourseContentTitle>
                    <CourseContentTitle dark={dark}>Created by: {course.created_by}</CourseContentTitle>
                    {/* <CourseContentSubtitle>{course.description}</CourseContentSubtitle> */}
                    <CourseContentSubtitle>{course.published_at}</CourseContentSubtitle>
                </CourseContentContainer>
            </CourseItemContainer>
        </>
    );
}

const AssignmentItem = ({assignment}) => {
    return (
        <>
             <div>Assignment</div>
        </>
    );
}

const AnnouncementItem = ({announcement}) => {
    return (
        <>
             <div>Announcement</div>
        </>
    );
}

const SearchItem = ({ type, courses, didTapCourseCard, dark }) => {
  return (
      <>
          {(() => {
            switch (type) {
                case SearchItemType.COURSE:
                    return (
                        <>
                            {
                                <SearchItemWrapper>
                                    {
                                        Object.keys(courses).map((key, index) => {
                                            return <CourseItem dark={dark} didTapCourseCard={didTapCourseCard} key={key} course={courses[index]} />

                                        })
                                    }     
                                </SearchItemWrapper>
                                
                            }
                        </>
                      );
                case SearchItemType.ASSIGNMENT:
                    return (
                        <>
                           <AssignmentItem/>
                        </>
                        );
                case SearchItemType.ANNOUNCEMENT:
                    return (
                        <>
                           <AnnouncementItem/>
                        </>
                    );
                default: return <div>SearchItem</div>
            }
          })() }
    </>
  )
}

const SearchItems = ({ data, didTapCourseCard, dark }) => {
    return (
        <>
            {
                (() => {
                    if ("courses" in data) {
                        return <SearchItem dark={dark} courses={data.courses} didTapCourseCard={didTapCourseCard} type={SearchItemType.COURSE}></SearchItem>
                    } else {
                        return 
                    }
                })()
            }
            {
                data.courses.length === 0 &&
                <>
                     <EmptyCardTitleContainer dark={dark}>
                     <NoCourseImage src={ NoSearch} />
                        <EmptyCardTitle>No Results found</EmptyCardTitle>
                    </EmptyCardTitleContainer> 
                </>
            }
            
        </>
  );
}

const SearchAdvItem = ({ data, didTapCourseCard }) => {
    return (
        <>
            {
                data.announcements.length != 0 &&
                <SearchItem data={data} didTapCourseCard={didTapCourseCard} type={SearchItemType.ANNOUNCEMENT}></SearchItem>
            }
            {
                data.assignments.length != 0 &&
                <SearchItem data={data} didTapCourseCard={didTapCourseCard} type={SearchItemType.ASSIGNMENT}></SearchItem>
            }
        </>
    )
}




export default SearchItems