import React, { useEffect } from 'react'
import { FormInput } from '../Custom/GenericStyledElements'
import {
    ChatViewWrapper,
    ChatViewDisplay,
    ChatFooter,
    SendButton,
    MessageBox,
    MessageContainer,
    MessageText
} from './ChatStyledElements'

import Send from '../../assets/send.png'
import Message from './Message'
import { useState } from 'react'
import { handleErrors } from '../Utilities/Utilities'
import { API } from '../Onboarding/Login/LoginUtilities'
const ChatView = ({ memberSelected, messageList, dark, setMemberMessages, token, course_id, email}) => {
    const [messageToSend, setmessageToSend] = useState("")

    const sendGroupMessage = async () => {
        const data = {
            message: messageToSend,
            channel: "default"
        }
        console.log(data)
        let api = `${API}/v1/message/send/group/${course_id}`
        const requestOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Connection' : 'keep-alive',
                'Authorization' : `Bearer ${token}`
            },
              body: JSON.stringify(data)
        };

        await fetch(`${api}`, requestOptions)
            .then(response => handleErrors(response))
            .then(response => response.json())
            .then(data => {
                // data.messages.forEach(message => {
                //     setMemberMessages(messageList => [...messageList, message])
                // });
                setMemberMessages(data.messages)

                console.log(data)
            })
            .catch(error => console.log(error))
        console.log(messageList)
        setmessageToSend("")
    }

    const sendMessage = async () => {
        if (memberSelected === "everyone") {
            sendGroupMessage()
        } else {
            sendPrivateMessage()
        }
    }


    const sendPrivateMessage = async () => {
        const data = {
            to_user: memberSelected,
            message: messageToSend
        }
        console.log(data)
        let api = `${API}/v1/message/send/${course_id}`
        const requestOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Connection' : 'keep-alive',
                'Authorization' : `Bearer ${token}`
            },
              body: JSON.stringify(data)
        };

        await fetch(`${api}`, requestOptions)
            .then(response => handleErrors(response))
            .then(response => response.json())
            .then(data => {
                // data.messages.forEach(message => {
                //     setMemberMessages(messageList => [...messageList, message])
                // });
                setMemberMessages(data.messages)
            })
            .catch(error => console.log(error))
        console.log(messageList)
        setmessageToSend("")
        // send message to selected member
    }

  return (
      <ChatViewWrapper> 
          <ChatViewDisplay>
              {(() => {
                  if (messageList.length === 0) {
                      return (
                          <MessageText dark={dark}>
                              No conversation started with {memberSelected} yet. Send a message now
                          </MessageText>
                      );
                  } else {
                     return  messageList.map(message => {
                          return (
                              <>
                                  <Message isGroup = {memberSelected === "everyone"} email={email} message={message} dark={dark}/>
                              </>
                          );
                      })
                  }
              })()}
         </ChatViewDisplay>  
              
          <ChatFooter>
              <FormInput color={ dark ? "white" : "lightgray" } width="75%" widthGiven={true} value={messageToSend} onChange={e=> setmessageToSend(e.target.value)} placeholder='Type a message...' type="text" name='message' />
              <SendButton src={Send} onClick={() => { sendMessage() }}/>
          </ChatFooter>
      </ChatViewWrapper>
  )
}

export default ChatView