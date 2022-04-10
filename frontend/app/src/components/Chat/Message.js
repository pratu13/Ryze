import React from 'react'
import { MessageBox, MessageContainer, MessageText, MessageTextContainer, FromMessageText } from './ChatStyledElements'

const Message = ({message, dark, email, isGroup}) => {
  return (
    <MessageContainer from={message.from === email ? true : false}>
        {
          isGroup &&
        <MessageTextContainer from={message.from === email ? true : false} >
              <MessageBox from={message.from === email ? true : false}>
                    <MessageText>
                      {message.message}
                  </MessageText>
              </MessageBox>
            <FromMessageText dark={dark}>{message.from}</FromMessageText>
          </MessageTextContainer>
        }
        {
        !isGroup &&
        <MessageBox from={message.from === email ? true : false}>
          <MessageText dark={dark}>
            {message.message}
            </MessageText>
        </MessageBox>
        }


        
      
    </MessageContainer>
  )
}

export default Message