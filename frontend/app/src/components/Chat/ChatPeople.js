import React from 'react'
import { randomHex } from '../Utilities/Utilities'
import {
    PersonContainer,
    PersonColor,
    PersonName
} from './ChatStyledElements'

const ChatPeople = ({member, dark, didSelectMember}) => {
  return (
      <>
          <PersonContainer dark={dark} onClick={() => {didSelectMember(member.user)}}>
              <PersonColor color={ randomHex() }/>
              <PersonName dark={dark}>{member.user}</PersonName>
          </PersonContainer>
      </>
  )
}

export default ChatPeople