import React, { useState, useEffect } from 'react'
import {Animated} from "react-animated-css";
import { useNavigate } from 'react-router';
import { 
  FormButton, 
  Container,
  FormLabel, 
  FormInput,
  FormContent, 
  FormInputWrapper
} from '../../GenericStyledElements';

import { 
  LoginFormTitle, 
  LoginFormWrapper, 
  PasswordResetSection,
  FooterSection,
  CreateAccountSection,
  FootP
} from './LoginStyledElements'
import { API, ENUM_LOGINERROR } from './LoginUtilities';

const Login = ({updatePasswordFlow, updateEmail}) => {
  const [showSignUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    getQuestions()
  }, []);

  const getQuestions = async () => {
      const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
      };
      console.log(requestOptions)
      await fetch(`${API}/v1/user/recovery_options`, requestOptions)
          .then(response => response.json())
        .then(data => {
              setSecurityQuestion(data.questions[0])
      });
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
            .then(handleErrors)
            .then(response => {
              console.log(response.json())
              setSignUp(false);
              setEmail("");
              setPassword("");
              setSecurityQuestionAnswer("");
            })
            .catch(error => console.log(error) );
            
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
            fetch(`${API}/v1/user/login`, requestOptions) 
            // .then(handleErrors)
            .then(response => response.json())  
            .then(data => {
                if (data.message === "Incorrect login/password.") {
                  setError(ENUM_LOGINERROR.PasswordError)
                  setErrorMessage("Wrong Password, Please try again");
                  setPassword("");
                } else if (data.message === "Invalid input") {
                  setError(ENUM_LOGINERROR.EmailError)
                  setErrorMessage("Email does not exist. Please create an account");
                  setEmail("");
                  setPassword("");
                } else if (data.message.includes("is not a 'email'")) {
                  setError(ENUM_LOGINERROR.EmailError)
                  setErrorMessage("Please enter your email");
                  setEmail("");
                  setPassword("");
                }else {
                  setEmail(""); 
                  setPassword("");
                  navigate(`/main`, {
                      state: {
                          token: data.token,
                      }
                  });
              }
            })
            .catch(error => console.log(error) );
        }
    }
  }

  function handleErrors(response) {
    if (!response.ok) {
      setError(ENUM_LOGINERROR.EmailError)
      setErrorMessage(response.JSON().message)
      throw Error(response.statusText);
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
          if (showSignUp) {
              if (!securityQuestionAnswer) {
                  setErrorMessage("Please answer for security purposes")
                setError(ENUM_LOGINERROR.SecurityError)
                console.log(error)
                  return false;
              } 
          }
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
                    <FormLabel isError={false} htmlFor="email">Your email</FormLabel>
                    {
                    error === "EmailError" && <FormLabel isError={true}>{errorMessage}</FormLabel>
                    }
                    <FormInput type="text" name="email" value={email} onChange={e=> setEmail(e.target.value)} required/>
                </FormInputWrapper>
                <FormInputWrapper>
                    <FormLabel isError={false} htmlFor="password">Your password</FormLabel>
                    {
                    error === "PasswordError" && <FormLabel isError={true}>{errorMessage}</FormLabel>
                    }
                    <FormInput type="password" name='password' value={password} onChange={e=> setPassword(e.target.value)} required/>
                  </FormInputWrapper>
                {
                  showSignUp &&
                    <Animated animationIn="fadeInUp" animationOut="fadeInDown" isVisible={showSignUp}>
                      <FormInputWrapper>
                    <FormLabel isError={false} htmlFor="name">{ securityQuestion }</FormLabel>
                          {
                            error === "SecurityError" && <FormLabel isError={true}>{errorMessage}</FormLabel>
                          }
                          <FormInput type="text" name="name" value={securityQuestionAnswer} onChange={e=> setSecurityQuestionAnswer(e.target.value)} required/>
                      </FormInputWrapper>
                    </Animated>
                }
                <FormButton onClick={e => { handleLoginRoute()}}>
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
    </>
  );
}

export default Login;

