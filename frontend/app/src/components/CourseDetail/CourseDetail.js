import React, { useState, useEffect } from 'react'
import { HeaderLabel, DashboardHeaderRight, CreateAnnouncementButton, GradeLabel } from '../Dashboard/DashboardStyledElements'
import { CourseDetailHeader,BackIcon, HomeContentContainer, HomeContent } from './CourseDetailStyledElements'
import BackButton from '../../assets/BackIcon2.png'
import BackButtonDark from '../../assets/backButtonDark.png'
import CourseSegmentControl from './CourseSegmentControl'
import { getGrade, handleErrors, Segments, UserType } from '../Utilities/Utilities'
import { AnnouncementItem } from '../Announcement/Announcement'
import { Divider, EmptyCardTitle, EmptyCardTitleContainer } from '../Custom/GenericStyledElements'
import { ItemsContainer } from '../Announcement/AnnouncementStyledElements'
import TodoSectionItem from '../RightSideBar/TodoSection/TodoSectionItem'
import Chat from '../Chat/Chat'
import { API } from '../Onboarding/Login/LoginUtilities'
import { ContentContainer } from '../Onboarding/Welcome/WelcomeStyledElements'
const CourseDetail = ({ token, course, didTapBackButton, selectedSegment, updateSelectedSegment, announcements, assignments, role, createAnnounceTapped, createAssignmentTapped, dark, email, setTappedAssignment, didTapAssignmentCard, setAssignmentSubCourse, didTapViewGrading, setAssignmentCourse}) => {
  const [members, setMembers] = useState([])
  const [messageList, setMessageList] = useState([])
  const [scores, setScores] = useState([])
  
  const viewGrades = async (course) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Connection' : 'keep-alive',
        'Authorization' : `Bearer ${token}`
      }
    };
    let api = `${API}/v1/grade/course/${course.id}`

  await fetch(`${api}`, requestOptions)
      .then(response => handleErrors(response))
      .then(response => response.json())
    .then(data => {  
          console.log(data)
          const gradeScores = []
          Object.keys(data.grades).map((key) => {
              gradeScores.push(parseInt(data.grades[key].score))
          })
          setScores(gradeScores)
      })
      .catch(error => console.log(error)) 
  }

  const getMembers = async () => {
    let api = `${API}/v1/course/members/${course.id}`
    const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Connection' : 'keep-alive',
            'Authorization' : `Bearer ${token}`
          },
        };
    await fetch(`${api}`, requestOptions)
        .then(response => handleErrors(response))
        .then(response => response.json())
        .then(data => {
          setMembers(data.course_permissions)
        })
        .catch(error => console.log(error))
  }

  const getChats = async () => {
    let api = `${API}/v1/message/${course.id}`
    const requestOptions = {
          method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Connection': 'keep-alive',
            'Authorization': `Bearer ${token}`
        }
    };

    await fetch(`${api}`, requestOptions)
        .then(response => handleErrors(response))
        .then(response => response.json())
        .then(data => {
          setMessageList(data.messages)
        })
      .catch(error => console.log(error))
  }
  
  useEffect(() => {
    getMembers()
    getChats()
    viewGrades(course)
    setAssignmentCourse(course)
    const timer = setInterval(getChats, 5000);
    return () => clearInterval(timer);
  }, [])

  const [memberSelected, setmemberSelected] = useState("")
  
  const didSelectMember = (user) => {
    setmemberSelected(user)
  }

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
          <CourseDetailHeader dark={dark}> 
              <BackIcon onClick={() => {didTapBackButton()}} src={ dark ? BackButtonDark : BackButton}></BackIcon>
        <HeaderLabel dark={dark}>{course.title}</HeaderLabel>
        
              <RenderHeaderButton
                selectedSegment={selectedSegment}
          buttonTapped={buttonTapped}
          role={role}
          dark={dark}
          scores={scores}
          assignments={assignments}
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
                          <HomeContentContainer>
                            <HomeContent dark={dark}>
                                { course.description}
                              </HomeContent>
                          </HomeContentContainer>
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
                        dark={dark}
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
                      dark={dark}
                      setTappedAssignment={setTappedAssignment}
                      didTapAssignmentCard={didTapAssignmentCard}
                      setAssignmentSubCourse={setAssignmentSubCourse}
                      didTapViewGrading={didTapViewGrading}    
                    />
                    
                    </>
                  );
                    
                case Segments.CHAT: 
                return (
                  <>
                    <Chat
                      email={email}
                      dark={dark}
                      members={members}
                      token={token}
                      course_id={course.id}
                      messageList={messageList}
                      memberSelected={memberSelected}
                      didSelectMember = {didSelectMember}
                    />
                    </>
                );
                default:
                  break
            }
          })()}
      </>
  )
}

export default CourseDetail

const RenderHeaderButton = ({ selectedSegment, buttonTapped, role, dark, scores}) => {
  
  const [grade, setGrade] = useState("")
  const [gradeTapped, setGradeTapped] = useState(false)

  const didTapViewGrading = async () => {
    console.log(scores)
    setGradeTapped(!gradeTapped)
    scores = scores.map(score => parseInt(score));
    setGrade(getGrade(scores))
  }

  return (
    <>
      <DashboardHeaderRight dark ={dark}>
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
                    <>
                      <CreateAnnouncementButton onClick={() => { buttonTapped() }}>Create Assignment</CreateAnnouncementButton>
                
                    </>
                  }
                  {
                    (role.title === UserType.ADMIN.title) &&
                    <>
                      <CreateAnnouncementButton onClick={() => { buttonTapped() }}>Create Assignment</CreateAnnouncementButton>
                    </>
                  }
                  {
                    (role.title === UserType.STUDENT.title) &&
                      <>
                          {
                              gradeTapped && 
                              <GradeLabel onClick={() => { didTapViewGrading() }}>Course Grade: {grade}</GradeLabel>
                      }
                      {
                        !gradeTapped && 
                        <CreateAnnouncementButton onClick={() => { didTapViewGrading() }}>View Grades</CreateAnnouncementButton>
                      }
                      </>
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


const RenderAssignments = ({ assignments, course, token, role, dark, setTappedAssignment, didTapAssignmentCard, setAssignmentSubCourse, didTapViewGrading, setGrade }) => {


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
                dark={dark}
                didTapViewGrading={didTapViewGrading}
                setTappedAssignment={setTappedAssignment}
                // setTappedAssignemnt={setTappedAssignemnt}
                didTapAssignmentCard={didTapAssignmentCard}
                // setAssignmentSubCourse={setAssignmentSubCourse}
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
                  dark={dark}
                  didTapViewGrading={didTapViewGrading}
                  setTappedAssignment={setTappedAssignment}
                  // setTappedAssignemnt={setTappedAssignemnt}
                  didTapAssignmentCard={didTapAssignmentCard}
            
                  // setAssignmentSubCourse={setAssignmentSubCourse}
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
                dark={dark}
                setTappedAssignment={setTappedAssignment}
                didTapAssignmentCard={didTapAssignmentCard}
                setAssignmentSubCourse={setAssignmentSubCourse}
                setGrade={setGrade}
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
              <EmptyCardTitleContainer dark={dark}>
                <EmptyCardTitle>Looks like you aced this week and completed all your homework for {course.title}</EmptyCardTitle>
              </EmptyCardTitleContainer>
            }
    </>
      
  );

}

const RenderAnnouncements = ({ announcements, course, token, role, dark }) => {
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
                  dark={dark}
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
                    dark={dark}
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
            <EmptyCardTitleContainer dark={dark}>
                <EmptyCardTitle>No announcements for {course.title}</EmptyCardTitle>
            </EmptyCardTitleContainer>
        }
    </>
  );

}