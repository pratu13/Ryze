import React from 'react'
import { HeaderLabel, DashboardHeaderRight } from '../Dashboard/DashboardStyledElements'
import { CourseDetailHeader,BackIcon } from './CourseDetailStyledElements'
import BackButton from '../../assets/BackIcon2.png'
import CourseSegmentControl from './CourseSegmentControl'
import { Segments } from '../Utilities/Utilities'
import { AnnouncementItem } from '../Announcement/Announcement'
import { Divider, EmptyCardTitle, EmptyCardTitleContainer } from '../Custom/GenericStyledElements'
import { ItemsContainer } from '../Announcement/AnnouncementStyledElements'
import TodoSectionItem from '../RightSideBar/TodoSection/TodoSectionItem'
import { CreateAnnouncementButton } from '../Dashboard/DashboardStyledElements'
import { UserType } from '../Utilities/Utilities'
const CourseDetail = ({ course, didTapBackButton, selectedSegment, updateSelectedSegment, announcements, assignments, userInfo, createAnnounceTapped, createAssignmentTapped }) => {

  const buttonTapped = () => {
    switch (selectedSegment) {
      case Segments.ANNOUNCEMENT:
        createAnnounceTapped(course)
        break
      case Segments.ASSIGNMENTS:
        createAssignmentTapped(course)
        break
    }
  }

  return (
      <>
          <CourseDetailHeader> 
              <BackIcon onClick={() => {didTapBackButton()}} src={BackButton}></BackIcon>
              <HeaderLabel>{course.title}</HeaderLabel>
              <RenderHeaderButton
                selectedSegment={selectedSegment}
                buttonTapped={buttonTapped}
                userInfo={userInfo}
              />
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
                    <ItemsContainer>
                      <RenderAnnouncements
                        announcements={announcements}
                        course={course}
                      />
                    </ItemsContainer>
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
                    <RenderAssignments
                      assignments={assignments}
                      course={ course}/>
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

const RenderHeaderButton = ({ selectedSegment, buttonTapped, userInfo}) => {
  console.log(selectedSegment)
  return (
    <>
      <DashboardHeaderRight>
          {(() => {
            switch (selectedSegment) {
              case Segments.ANNOUNCEMENT:
                return (
                  <>
                    {
                      (userInfo.role === UserType.TEACHER.title) &&
                      <CreateAnnouncementButton onClick={() => { buttonTapped() }}>Create Announcement</CreateAnnouncementButton>
                    }
                    {
                      (userInfo.role === UserType.ADMIN.title) &&
                      <CreateAnnouncementButton onClick={() => { buttonTapped() }} >Create Announcement</CreateAnnouncementButton>
                     }
                  </>
              );
              case Segments.ASSIGNMENTS:
                return (
                  <>
                    {
                      (userInfo.role === UserType.TEACHER.title) &&
                      <CreateAnnouncementButton onClick={() => { buttonTapped() }}>Create Assignment</CreateAnnouncementButton>
                    }
                    {
                      (userInfo.role === UserType.ADMIN.title) &&
                      <CreateAnnouncementButton onClick={() => { buttonTapped() }} >Create Assignment</CreateAnnouncementButton>
                     }
                  </>
                );

            }
          })()
         }    
        </DashboardHeaderRight>
    </>
  );
}


const RenderAssignments = ({ assignments, course }) => {

  return (
    <>
      {
        assignments.length != 0 &&
        Object.keys(assignments).map((key, index) => {
          if (assignments[key].subject === course.title) return (
            <>
              <TodoSectionItem key={key} assignment={assignments[key]} />
            </>
          );
          else {
            return (
              <>
                <EmptyCardTitleContainer>
                  <EmptyCardTitle>Looks like you aced this week and completed all your homework for {course.title}</EmptyCardTitle>
                </EmptyCardTitleContainer>
              </>
            );
          }
        })
      }
      {
              assignments.length === 0 &&
              <>
              <EmptyCardTitleContainer>
                <EmptyCardTitle>Looks like you aced this week and completed all your homework for {course.title}</EmptyCardTitle>
              </EmptyCardTitleContainer>
            </>
            }
    </>
      
  );

}

const RenderAnnouncements = ({ announcements, course }) => {

  return (
    <>
      {
          Object.keys(announcements).map((key, index) => {
            if (announcements[key].subjectName === course.title) return (
              <>
              <AnnouncementItem key={key} announcement={announcements[key]} />
              <Divider />
              </>
            );
            else {
              return (
                <>
                 <EmptyCardTitleContainer>
                  <EmptyCardTitle>No announcements for {course.title}</EmptyCardTitle>
                </EmptyCardTitleContainer>
                  </>
              );
            }
            })
      }
        {
              announcements.length === 0 &&
              <>
              <EmptyCardTitleContainer>
                <EmptyCardTitle>Looks like you aced this week and completed all your homework for {course.title}</EmptyCardTitle>
              </EmptyCardTitleContainer>
            </>
            }
    </>
      
  );

}