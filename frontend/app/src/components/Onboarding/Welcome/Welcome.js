import React, { useState } from 'react'
import Login from '../Login/Login'
import { Animated } from 'react-animated-css';
import { LoginWrapper } from './WelcomeStyledElements'
import RecoveryQuestion from '../Login/ForgotPassword/RecoveryQuestion';
import ConfirmationPage from '../../Custom/ConfirmationPage';
import Success from '../../../assets/login.png'
import Error from '../../../assets/error.png'
import { useNavigate } from 'react-router';

const Welcome = () => {

  const [startForgotPasswordFlow, setForgotPasswordFlow] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [startOFlow, setStartOFlow] = useState(false);
  const [flowImage, setStartOFlowImage] = useState(Error);
  const [flowDescrition, setFlowDescription] = useState("Hold up. Logging you in...");

  const updatePasswordFlow = (show) => {
    setForgotPasswordFlow(show);
  }

  const updateEmail = (email) => {
    setRecoveryEmail(email);
  }

  const navigate = useNavigate()

  const completeOauthSignIn = (success, response) => {
    console.log(response)
    if (success) {
      console.log("hello")
      setFlowDescription("Hold up. Logging you in...")
      setStartOFlowImage(Success)
      setStartOFlow(true);
      setTimeout(() => {
        setStartOFlow(false);
        navigate(`/main`, {
          state: {
              email: response.profileObj.email,
              token: response.tokenId,
              userFirstTimeLogin: true,
              userId: response.userId,
              isAuthSignedIn: success
            }
        });
      }, 3000);
    } else {
      setFlowDescription("Opps, something went wrong")
      setStartOFlowImage(Error)
      setStartOFlow(true);
      setTimeout(() => {
        setStartOFlow(false);
        navigate(`/`)
      }, 3000);
    }
  }


  return (
      <>
      <LoginWrapper>
        { 
           (!startForgotPasswordFlow && !startOFlow) && 
           <Animated animationIn="bounceInLeft" animationOut="bounceOutRight"> 
              <Login updatePasswordFlow={updatePasswordFlow} updateEmail={updateEmail} completeOauthSignIn={ completeOauthSignIn}/>
           </Animated>
        }
        { 
          startForgotPasswordFlow &&
          <Animated animationIn="bounceInRight" animationOut="bounceOutLeft"> 
              <RecoveryQuestion updatePasswordFlow={updatePasswordFlow} email={recoveryEmail}/> 
          </Animated>
        }
        {
          startOFlow && 
          <ConfirmationPage success={flowImage == Success ? true : false} setupComplete={startOFlow} img={flowImage} description={ flowDescrition}/> 
        }
      </LoginWrapper>
      </>
  )
}

export default Welcome