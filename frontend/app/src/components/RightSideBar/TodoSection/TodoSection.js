import React from 'react'
import { SectionCard } from '../../GenericStyledElements'
import TodoSectionItem from './TodoSectionItem'
import { TodoSectionContainer, TodoSectionTitle } from './TodoSectionStyledElements'

const TodoSection = () => {
  return (
    <>
        <TodoSectionContainer>
            <TodoSectionTitle> Coming this Week ... </TodoSectionTitle>
            <SectionCard>
              <TodoSectionItem completed={true}/>
              <TodoSectionItem completed={false}/>
            </SectionCard>
               
        </TodoSectionContainer>
    </>
  )
}

export default TodoSection