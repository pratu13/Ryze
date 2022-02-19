import React, { useState } from 'react'
import ForgotPassword from '../Login/ForgotPassword/ForgotPassword'
import Login from '../Login/Login'
import { Animated } from 'react-animated-css';
import { LoginWrapper } from './WelcomeStyledElements'

const Welcome = () => {

  const [startForgotPasswordFlow, setForgotPasswordFlow] = useState(false);

  const updatePasswordFlow = (show) => {
    setForgotPasswordFlow(show);
  }

  return (
      <>
      <LoginWrapper>
        { 
           !startForgotPasswordFlow && 
           <Animated animationIn="bounceInLeft" animationOut="bounceOutRight"> 
             <Login updatePasswordFlow = {updatePasswordFlow}/>
           </Animated>
        }
        { 
          startForgotPasswordFlow &&
          <Animated animationIn="bounceInRight" animationOut="bounceOutLeft"> 
            <ForgotPassword updatePasswordFlow = {updatePasswordFlow}/> 
          </Animated>
        }
      </LoginWrapper>
      </>
  )
}

export default Welcome