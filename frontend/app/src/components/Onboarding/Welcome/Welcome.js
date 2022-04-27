import React, { useState } from 'react'
import Login from '../Login/Login'
import { Animated } from 'react-animated-css';
import { BgImage, ContentDescription, ContentWrapper, LoginWrapper, MainTitle } from './WelcomeStyledElements'
import RecoveryQuestion from '../Login/ForgotPassword/RecoveryQuestion';
import ConfirmationPage from '../../Custom/ConfirmationPage';
import Success from '../../../assets/login.png'
import Error from '../../../assets/error.png'
import { useNavigate } from 'react-router';
import ForgotPasswordEmail from '../Login/ForgotPassword/ForgotPasswordEmail';
import { UserType } from '../../Utilities/Utilities';
import MainImage from "../../../assets/abc.png"
import { LoginFormTitle } from '../Login/LoginStyledElements';
import Main from "../../../assets/main.svg"


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
           <>
                <ContentWrapper>
                <Animated animationIn="bounceInLeft" animationOut="bounceOutRight"> 
                  <BgImage src = {Main}/>
                  <MainTitle>Together we will Ryze</MainTitle>
                  {/* <ContentDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </ContentDescription> */}
                </Animated> 
                </ContentWrapper>

            </> 
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