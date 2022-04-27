import React from 'react'
import { SectionCard, EmptyCardTitle, EmptyCardTitleContainer } from '../../Custom/GenericStyledElements'
import TodoSectionItem from './TodoSectionItem'
import { TodoSectionContainer, TodoSectionTitle } from './TodoSectionStyledElements'

const TodoSection = ({ assignments }) => {
  console.log(assignments)
  return (
    <>
        <TodoSectionContainer>
            <TodoSectionTitle> Coming this Week ... </TodoSectionTitle>
        <SectionCard>
          {
            assignments.length != 0 &&
              Object.keys(assignments).map((key, index) => (       
                <>
                  <TodoSectionItem key={key} assignment = {assignments[key]} />
                </>
        
              ))      
          }
          {
            assignments.length == 0 &&
              <EmptyCardTitleContainer>
                <EmptyCardTitle>Looks like you aced this week and completed all your homework</EmptyCardTitle>
            </EmptyCardTitleContainer>
          }
              {/* <TodoSectionItem completed={true}/>
              <TodoSectionItem completed={false}/> */}
        </SectionCard>
               
        </TodoSectionContainer>
    </>
  )
}

export default TodoSection