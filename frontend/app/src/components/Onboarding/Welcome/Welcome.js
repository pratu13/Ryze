import React, { useState } from 'react'
import ForgotPassword from '../Login/ForgotPassword/ForgotPassword'
import Login from '../Login/Login'
import { Animated } from 'react-animated-css';
import { LoginWrapper } from './WelcomeStyledElements'
import RecoveryQuestion from '../Login/ForgotPassword/RecoveryQuestion';

const Welcome = () => {

  const [startForgotPasswordFlow, setForgotPasswordFlow] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");

  const updatePasswordFlow = (show) => {
    setForgotPasswordFlow(show);
  }

  const updateEmail = (email) => {
    setRecoveryEmail(email);
  }

  return (
      <>
      <LoginWrapper>
        { 
           !startForgotPasswordFlow && 
           <Animated animationIn="bounceInLeft" animationOut="bounceOutRight"> 
              <Login updatePasswordFlow={updatePasswordFlow} updateEmail={updateEmail}/>
           </Animated>
        }
        { 
          startForgotPasswordFlow &&
          <Animated animationIn="bounceInRight" animationOut="bounceOutLeft"> 
              <RecoveryQuestion updatePasswordFlow={updatePasswordFlow} email={recoveryEmail}/> 
          </Animated>
        }
      </LoginWrapper>
      </>
  )
}

export default Welcome