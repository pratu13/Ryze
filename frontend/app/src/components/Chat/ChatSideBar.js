import React from 'react'
import ChatPeople from './ChatPeople'
import { ChatSideBarContainer, ChatSideBarTitle, ChatSideBarWrapper } from './ChatStyledElements'

const ChatSideBar = ({members,dark, didSelectMember, email}) => {
  return (
      <>
          <ChatSideBarContainer width="auto" dark={dark}>
              <ChatSideBarWrapper>
                  <ChatSideBarTitle dark={dark}>You</ChatSideBarTitle>
                  {
                      members.filter(member => member.user === email).map(member => {
                          return (
                                <ChatPeople dark={dark} member={member} />
                          );
                      })
                  }
                <ChatSideBarTitle dark={dark}>Group Channel</ChatSideBarTitle>
                  {
                    <ChatPeople didSelectMember={() => {didSelectMember("everyone")}} dark={dark} member={{user: "everyone"}} />
                  }
                  <ChatSideBarTitle dark={dark}>All Members</ChatSideBarTitle>
                  {
                      members.filter(member => member.user !== email).map(member => {
                          return (
                                <ChatPeople didSelectMember={didSelectMember} dark={dark} member={member} />
                          );
                      })
                  }
            </ChatSideBarWrapper>
          </ChatSideBarContainer>
      </>
  )
}

export default ChatSideBar