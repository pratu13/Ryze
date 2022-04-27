import React, { useState, useEffect } from 'react'
import {Animated} from "react-animated-css";
import { useNavigate } from 'react-router';
import { 
  FormButton, 
  Container,
  FormLabel, 
  FormInput,
  FormContent, 
  FormInputWrapper,
  LoginContainer,
  FooterButtonContainer,
  Divider
} from '../../Custom/GenericStyledElements';

import GoogleLogin from 'react-google-login'
import { 
  LoginFormTitle, 
  LoginFormWrapper, 
  PasswordResetSection,
  FooterSection,
  CreateAccountSection,
  FootP
} from './LoginStyledElements'
import { API, ENUM_LOGINERROR } from './LoginUtilities';
import { UserType } from '../../Utilities/Utilities';
import DropDownMenu from '../../Custom/DropDownMenu';

const Login = ({updatePasswordFlow, updateEmail, completeOauthSignIn}) => {
  const [showSignUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(UserType.NOROLE);
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityQuestionAnswer, setSecurityQuestionAnswer] = useState("");
  const [error, setError] = useState(ENUM_LOGINERROR.NoError);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Helper Functions
  const updateSignUp = () => {
    setSignUp(!showSignUp)
    setEmail(""); 
    setPassword("");
    setErrorMessage("")
    setSecurityQuestionAnswer("");
  }

  useEffect(() => {
    // getQuestions()
  }, []);

  const handleOAuthSignIn = async (response) => {
    if (response) {
      if (response.accessToken != "") {
        console.log(response)
  
        const data = {
          contact: {
            email: response.profileObj.email
          },
          oauth_token: response.tokenId
        }
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }
        await fetch(`${API}/v1/user/login/oauth`, requestOptions)
          .then(res => handleErrors(res))
          .then(res => res.json())
          .then(data => {
            completeOauthSignIn(true, data, response.profileObj.email)
          })
          .catch(error => error)
      } else {
        completeOauthSignIn(false, response, "")
      }
    }
  }

  const getQuestions = async () => {
      const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
      };
      await fetch(`${API}/v1/user/recovery_options`, requestOptions)
          .then(response => response.json())
        .then(data => {
              setSecurityQuestion(data.questions[0])
      });
  }

  const updateRole = (role_) => {
    setRole(role_)
  }

  const handlePasswordReset = () => {
    if (checkValidEmail()) {
      updatePasswordFlow(true)
      updateEmail(email)
    } else {
        setErrorMessage("Please enter your email to continue password recovery");
      setError(ENUM_LOGINERROR.EmailError)
    }
  }

  const handleLoginRoute = async() => {
    if (showSignUp) {
        if (isInputValid()) {
          const data = {
            contact: {
              email: email
            },
            password: password,
            recovery_options: [{
              question: securityQuestion,
              answer: securityQuestionAnswer
            }]
          }
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          }
          fetch(`${API}/v1/user`, requestOptions)
            .then(response => handleErrors(response))
            .then(response => {
                setSignUp(false);
                setEmail("");
                setPassword("");
                setSecurityQuestionAnswer("");
                setErrorMessage("")
           }) 
           .catch(error => error)
           .then(data => {
            setError(ENUM_LOGINERROR.EmailError)
            setErrorMessage(data.message);
            setPassword("");
            setEmail("");
          })
        }
    }
    else {
      if (isInputValid()) {
        const data = {
          email: email,
          password: password
        }
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        };
        await fetch(`${API}/v1/user/login`, requestOptions)
          .then(response => handleErrors(response))
          .then(response => response.json())
          .then(data => {
            document.cookie = `email=${email}`;
            document.cookie = `roleTitle=${role.title}`;
            setEmail("");
            setPassword("");
            setErrorMessage("")
         
            // redirect the user to duo
            window.location.href = data.redirect_url
          
            // navigate(`/main`, {
            //   state: {
            //     email: email,
            //     token: data.token,
            //     name: data.name,
            //     color: data.color,
            //     role: role,
            //     userFirstTimeLogin: !data.color || !data.name,
            //     isAuthSignedIn: false
            //   }
            // });
          })
          .catch(error => error)
          .then(data => {
            setError(ENUM_LOGINERROR.EmailError)
            setErrorMessage(data.message);
            setPassword("");
            setEmail("");
          })
      }
    }
  }

  function handleErrors(response) {
    if (response.status != 200) {
      throw response.json()
    }
    return response;
  }

  const checkValidEmail = () => {
      const regex = /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i;
      if(!email || regex.test(email) === false){
          setErrorMessage("Please Enter valid Email");
          setError(ENUM_LOGINERROR.EmailError)
          return false;
      }
      return true;
  }

  const isInputValid = () => {
      if (checkValidEmail()) {
          if (!password) {
              setErrorMessage("Please enter your password");
              setError(ENUM_LOGINERROR.PasswordError)
              return false;
          } else if (password.length <8) {
              setErrorMessage("Password must be of 8 or more characters");
              setError(ENUM_LOGINERROR.PasswordError)
              return false;
          } else {
            setError(ENUM_LOGINERROR.NoError)
            return true
          }
      } else {
        setError(ENUM_LOGINERROR.NoError)
        return true;
      }
  }
  return (
    <>
      <LoginContainer>
        <Container>
          <LoginFormWrapper>
            {
              !showSignUp &&
              <Animated animationIn="fadeInUp" animationOut="fadeInDown" isVisible={showSignUp}>
                <LoginFormTitle>WELCOME,</LoginFormTitle>
              </Animated>
            } 
            <FormContent>
                <FormInputWrapper>
                    <FormLabel color='black' isError={false} htmlFor="email">Your email</FormLabel>
                    {
                    error === "EmailError" && <FormLabel isError={true}>{errorMessage}</FormLabel>
                    }
                    <FormInput color="#EBF3F5" type="text" name="email" value={email} onChange={e=> setEmail(e.target.value)} required/>
                </FormInputWrapper>
                <FormInputWrapper>
                    <FormLabel color='black' isError={false} htmlFor="password">Your password</FormLabel>
                    {
                    error === "PasswordError" && <FormLabel isError={true}>{errorMessage}</FormLabel>
                    }
                    <FormInput color="#EBF3F5" type="password" name='password' value={password} onChange={e=> setPassword(e.target.value)} required/>
              </FormInputWrapper>
              {
                !showSignUp && 
                <FormInputWrapper>
                    <FormLabel color='black' isError={false} htmlFor="role">Your role</FormLabel>
                    <DropDownMenu color="#EBF3F5" width="335px" updateRole={updateRole} isSwitch={false}/>
                  </FormInputWrapper>
              }
                {/* {
                  showSignUp &&
                    <Animated animationIn="fadeInUp" animationOut="fadeInDown" isVisible={showSignUp}>
                      <FormInputWrapper>
                    <FormLabel color='black' isError={false} htmlFor="name">{ securityQuestion }</FormLabel>
                          {
                            error === "SecurityError" && <FormLabel isError={true}>{errorMessage}</FormLabel>
                          }
                          <FormInput color="#EBF3F5" type="text" name="name" value={securityQuestionAnswer} onChange={e=> setSecurityQuestionAnswer(e.target.value)} required/>
                      </FormInputWrapper>
                    </Animated>
                } */}
            <FormButton isDisabled={false} onClick={e => { handleLoginRoute()}}>
                  { showSignUp && "Sign Up" }
                  { !showSignUp && "Login" }
                </FormButton>
              <FooterSection>
                { !showSignUp &&  <PasswordResetSection onClick={e => handlePasswordReset()}>Forgot Password ?</PasswordResetSection> }
                  <CreateAccountSection onClick={updateSignUp}>
                      <FootP>
                      { showSignUp &&  "Already a user?"} 
                      { !showSignUp &&  "New Here ?"}
                      </FootP>
                      { showSignUp && "Login"}
                      { !showSignUp && "Create Account"}
                  </CreateAccountSection>
              </FooterSection>
            </FormContent>
          </LoginFormWrapper>
        </Container>

        <Divider/>

        <Container>
          <FooterButtonContainer>
            <GoogleLogin
              clientId='915523283178-st4hp6v16e3t7orm881iir2ipc1sifc5.apps.googleusercontent.com'
              onSuccess={handleOAuthSignIn}
              onFailure={handleOAuthSignIn} 
              cookiePolicy="single_host_origin"
            >Sign in with Google</GoogleLogin>
           
            {/* <FormButton onClick={e => handleFacebookSignIn()}>Facebook</FormButton> */}
          </FooterButtonContainer>
        </Container>
        </LoginContainer>
    </>
  );
}

export default Login;
