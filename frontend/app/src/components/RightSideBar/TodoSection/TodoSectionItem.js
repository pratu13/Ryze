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

const TodoSectionItem = ({completed}) => {
  return (
    <>
        <ItemContainer>
            <TodoSectionItemWrapper>
                <DueDateLabel>28 Mar</DueDateLabel>
                <InfoSection>
                    <ItemName>Assignment</ItemName>
                     <ItemStatus completed={completed}> {completed ? 'Submitted': 'Not Submitted'}</ItemStatus>
                </InfoSection>
                <ItemSubject>Python 1011</ItemSubject>
            </TodoSectionItemWrapper>
        </ItemContainer>
    </>
  )
}

export default TodoSectionItem