import React from 'react'
import { useState, useEffect } from 'react'
import { __esModule } from 'styled-components'
import { SampleMessageList } from '../Utilities/Utilities'
import ChatSideBar from './ChatSideBar'
import { ChatContainer, ChatDisplayContainer, MessageText, MessageTextWrapper, MessageTitle } from './ChatStyledElements'
import ChatView from './ChatView'

const Chat = ({ members, dark, email, token, course_id, messageList, didSelectMember, memberSelected }) => {
    
  const [memberMessages, setMemberMessages] = useState([])

  const didTapMember = (user) => {
    didSelectMember(user)
    filterMessage(user)
  }

  useEffect(() => {
      filterMessage(memberSelected)
  }, [])

  const filterMessage = (user) => {
    console.log(user)
    if (user === "everyone") {
      const groupMessages = messageList.filter(
        (message) => message.channel === "default"
      )
      setMemberMessages(groupMessages)
    } else {
      const filteredMessages = messageList.filter(
        (message) => message.members[0] === user
        )
      setMemberMessages(filteredMessages)
    }
   
  };

  return (
      <>
          <ChatContainer dark={dark}>
            <ChatSideBar email={email} dark={dark} members={members} didSelectMember={didTapMember} />
        <ChatDisplayContainer dark ={dark}>
          {(()=> {
             if (memberSelected == "") {
              return (
                <>
                  <MessageTextWrapper>
                      <MessageTitle dark={dark}> Select a member</MessageTitle>
                  </MessageTextWrapper>
                   
                </>
              );
             } else {
               return (
                 <ChatView
                   memberSelected={memberSelected}
                   messageList={memberMessages}
                   setMemberMessages= {setMemberMessages}
                   dark={dark}
                   token={token}
                   course_id={course_id}
                   email={email}
                 />
               );
            }
          })()
           
          }
           </ChatDisplayContainer>
          </ChatContainer>
      </>
  )
}

export default Chat