import React from 'react'
import { 
    ItemContainer, 
    TodoSectionItemWrapper,
    DueDateLabel,
    InfoSection,
    ItemName,
    ItemStatus,
    ItemSubject
 } from './TodoSectionStyledElements'

const TodoSectionItem = ({assignment}) => {
  return (
    <>
        <ItemContainer>
            <TodoSectionItemWrapper>
          <DueDateLabel>{assignment.due}</DueDateLabel>
                <InfoSection>
                    <ItemName>{assignment.title}</ItemName>
                     <ItemStatus completed={assignment.completed}> {assignment.completed ? 'Submitted': 'Not Submitted'}</ItemStatus>
                </InfoSection>
          <ItemSubject>{assignment.subject.name}</ItemSubject>
            </TodoSectionItemWrapper>
        </ItemContainer>
    </>
  )
}

export default TodoSectionItem