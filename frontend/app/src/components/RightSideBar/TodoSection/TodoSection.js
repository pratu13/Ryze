import React from 'react'
import { SectionCard, EmptyCardTitle, EmptyCardTitleContainer } from '../../Custom/GenericStyledElements'
import TodoSectionItem from './TodoSectionItem'
import { TodoSectionContainer, TodoSectionTitle } from './TodoSectionStyledElements'

const TodoSection = () => {
  return (
    <>
        <TodoSectionContainer>
            <TodoSectionTitle> Coming this Week ... </TodoSectionTitle>
        <SectionCard>
          <EmptyCardTitleContainer>
              <EmptyCardTitle>Looks like you aced this week and completed all your homework</EmptyCardTitle>
          </EmptyCardTitleContainer>
              {/* <TodoSectionItem completed={true}/>
              <TodoSectionItem completed={false}/> */}
        </SectionCard>
               
        </TodoSectionContainer>
    </>
  )
}

export default TodoSection