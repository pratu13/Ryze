import React, { useState } from 'react'
import Login from '../Login/Login'
import { Animated } from 'react-animated-css';
import { BgImage, ContentContainer, LoginWrapper } from './WelcomeStyledElements'
import RecoveryQuestion from '../Login/ForgotPassword/RecoveryQuestion';
import ConfirmationPage from '../../Custom/ConfirmationPage';
import Success from '../../../assets/login.png'
import Error from '../../../assets/error.png'
import { useNavigate } from 'react-router';
import ForgotPasswordEmail from '../Login/ForgotPassword/ForgotPasswordEmail';
import { UserType } from '../../Utilities/Utilities';
import MainImage from "../../../assets/mainImage.png"
import { LoginFormTitle } from '../Login/LoginStyledElements';

const Welcome = ({dark}) => {

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

  const completeOauthSignIn = (success, response, email) => {
    console.log(response)
    if (success) {
      setFlowDescription("Hold up. Logging you in...")
      setStartOFlowImage(Success)
      setStartOFlow(true);
      setTimeout(() => {
        setStartOFlow(false);
        navigate(`/main`, {
          state: {
                email: email,
                token: response.token,
                name:  response.name,
                color: response.color,
                role:  UserType.STUDENT,
                userFirstTimeLogin: !response.name || !response.color ,
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
          <>
            {/* <>
              <ContentContainer>
                <LoginFormTitle>Together We will Ryze,</LoginFormTitle>
              </ContentContainer>
            
            </> */}
           {/* <BgImage src={ MainImage}/> */}
           <Animated animationIn="bounceInLeft" animationOut="bounceOutRight"> 
              <Login dark={dark} updatePasswordFlow={updatePasswordFlow} updateEmail={updateEmail} completeOauthSignIn={ completeOauthSignIn}/>
           </Animated>
          </>
         
        }
        { 
          startForgotPasswordFlow &&
          <Animated animationIn="bounceInRight" animationOut="bounceOutLeft"> 
              <ForgotPasswordEmail updatePasswordFlow={updatePasswordFlow} email={recoveryEmail}/> 
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