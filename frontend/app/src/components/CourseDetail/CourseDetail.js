import React from 'react'
import { HeaderLabel, DashboardHeaderRight, CreateAnnouncementButton } from '../Dashboard/DashboardStyledElements'
import { CourseDetailHeader,BackIcon } from './CourseDetailStyledElements'
import BackButton from '../../assets/BackIcon2.png'
import CourseSegmentControl from './CourseSegmentControl'
import { Segments, UserType } from '../Utilities/Utilities'
import { AnnouncementItem } from '../Announcement/Announcement'
import { Divider, EmptyCardTitle, EmptyCardTitleContainer } from '../Custom/GenericStyledElements'
import { ItemsContainer } from '../Announcement/AnnouncementStyledElements'
import TodoSectionItem from '../RightSideBar/TodoSection/TodoSectionItem'
const CourseDetail = ({ token, course, didTapBackButton, selectedSegment, updateSelectedSegment, announcements, assignments, role, createAnnounceTapped, createAssignmentTapped }) => {
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
                role={role}
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
                        token={token}
                        role={role}
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
                      course={course}
                      token={token}
                      role={role}
                    />
                    
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

const RenderHeaderButton = ({ selectedSegment, buttonTapped, role}) => {
  return (
    <>
      <DashboardHeaderRight>
          {(() => {
            switch (selectedSegment) {
              case Segments.ANNOUNCEMENT:
                return (
                  <>
                    {
                      (role.title === UserType.TEACHER.title) &&
                      <CreateAnnouncementButton onClick={() => { buttonTapped() }}>Create Announcement</CreateAnnouncementButton>
                    }
                    {
                      (role.title === UserType.ADMIN.title) &&
                      <CreateAnnouncementButton onClick={() => { buttonTapped() }} >Create Announcement</CreateAnnouncementButton>
                     }
                  </>
              );
              case Segments.ASSIGNMENTS:
                return (
                  <>
                    {
                      (role.title === UserType.TEACHER.title) &&
                      <CreateAnnouncementButton onClick={() => { buttonTapped() }}>Create Assignment</CreateAnnouncementButton>
                    }
                    {
                      (role.title === UserType.ADMIN.title) &&
                      <CreateAnnouncementButton onClick={() => { buttonTapped() }} >Create Assignment</CreateAnnouncementButton>
                     }
                  </>
                );
                case Segments.FILES:
                  return (
                    <>
                      {
                        (role.title === UserType.TEACHER.title) &&
                        <CreateAnnouncementButton>Add Files</CreateAnnouncementButton>
                      }
                      {
                        (role.title === UserType.ADMIN.title) &&
                        <CreateAnnouncementButton>Add Files</CreateAnnouncementButton>
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


const RenderAssignments = ({ assignments, course, token, role }) => {


  return (
    <>
      {
        Object.keys(assignments).length !== 0 &&
        Object.keys(assignments).map((key, index) => {
          if (role.title === UserType.ADMIN.title) {
            return (
              <TodoSectionItem
                course={course}
                key={key}
                assignment={assignments[key]}
                token={token}
                role={role}
              />
            );
          }
          else if(role.title === UserType.TEACHER.title) {
            if (assignments[key].is_active) {
              return (
                <TodoSectionItem
                  course={course}
                  key={key}
                  assignment={assignments[key]}
                  token={token}
                  role={role}
                />
              );
            }
          } else {
            return (
              <TodoSectionItem
                course={course}
                key={key}
                assignment={assignments[key]}
                token={token}
                role={role}
              />
            );
          }
        // if (assignments[key].subject === course.title) return (
          //   <>
             
          //   </>
          // );
          // else {
          //   return (
          //     <>
          //       <EmptyCardTitleContainer>
          //         <EmptyCardTitle>Looks like you aced this week and completed all your homework for {course.title}</EmptyCardTitle>
          //       </EmptyCardTitleContainer>
          //     </>
          //   );
          // }
        })
      }
          {
              Object.keys(assignments).length === 0 &&
              <EmptyCardTitleContainer>
                <EmptyCardTitle>Looks like you aced this week and completed all your homework for {course.title}</EmptyCardTitle>
              </EmptyCardTitleContainer>
            }
    </>
      
  );

}

const RenderAnnouncements = ({ announcements, course, token, role }) => {
  console.log(announcements)
  return (
    <>
        {
        Object.keys(announcements).length !== 0 &&
        Object.keys(announcements).map((key, index) => {
          if (role.title === UserType.ADMIN.title) {
            return (
              <>
                <AnnouncementItem
                  course={course}
                  key={key}
                  announcement={announcements[key]}
                  token={token}
                  role={role}
                />
                <Divider />
              </>
            );
          }
          else {
            if (announcements[key].is_active) {
              return (
                <>
                  <AnnouncementItem
                    course={course}
                    key={key}
                    announcement={announcements[key]}
                    token={token}
                    role={role}
                  />
                  <Divider />
                </>
              );
            }
          }
            // if (announcements[key].subjectName === course.title) return (
            //   <>
              
            //   </>
            // );
            // else {
            //   return (
            //     <>
            //      <EmptyCardTitleContainer>
            //       <EmptyCardTitle>No announcements for {course.title}</EmptyCardTitle>
            //     </EmptyCardTitleContainer>
            //       </>
            //   );
            // }
            })
        }
         {
          Object.keys(announcements).length === 0 &&
            <EmptyCardTitleContainer>
                <EmptyCardTitle>No announcements for {course.title}</EmptyCardTitle>
            </EmptyCardTitleContainer>
        }
    </>
  );

}