import React, { useState } from 'react'
import {Animated} from "react-animated-css";
import { useNavigate } from 'react-router';
import { 
  FormButton, 
  Container,
  FormLabel, 
  FormInput,
  FormContent, 
  Form,  
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

const ENUM_LOGINERROR = {
  EmailError: 'EmailError',
  PasswordError: 'PasswordError',
  UnknownError: 'UnknownError',
  NameError: 'NameError',
  NoError: 'NoError'
}
const Login = ({updatePasswordFlow}) => {
  const [showSignUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(ENUM_LOGINERROR.NoError);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Helper Functions
  const updateSignUp = () => {
    setSignUp(!showSignUp)
    setEmail(""); 
    setPassword("");
    setName("");
  }

  const handleLoginRoute = async() => {
    if (showSignUp) {
        if (isInputValid()) {
            var details = name.split(' ');
            fetch(``,  {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                }
            })
            .then(handleErrors)
            .then(response => {
                setSignUp(false);
            })
            .catch(error => console.log(error) );
            setEmail("");
            setPassword("");
            setName("");
        }
    }
    else {
        if (isInputValid()) {
            fetch(``, {
                method: 'GET'
            })
            .then(handleErrors)
            .then(async response => {
                const data = await response.json();
                if (data.password !== password) {
                    setError(ENUM_LOGINERROR.PasswordError)
                    setErrorMessage("Wrong Password, Please try again");
                    setPassword("");
                } else {
                    setEmail(""); 
                    setPassword("");
                    navigate(`/main`, {
                        state: {
                            userID: "1",
                            name: "Carter"
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
              if (!name) {
                  setErrorMessage("Please enter your full name")
                  setError(ENUM_LOGINERROR.NameError)
                  return false;
              } 
          }
          if (!password) {
              setErrorMessage("Please enter a password");
              setError(ENUM_LOGINERROR.PasswordError)
              return false;
          } else if (password.length <=4) {
              setErrorMessage("Password must be of 8 or more characters");
              setError(ENUM_LOGINERROR.PasswordError)
              return false;
          } else {
            setError(ENUM_LOGINERROR.NoError)
            return true
          }
      } else {
        setError(ENUM_LOGINERROR.NoError)
        return false;
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
              <Form>
                {
                  showSignUp &&
                    <Animated animationIn="fadeInUp" animationOut="fadeInDown" isVisible={showSignUp}>
                      <FormInputWrapper>
                          <FormLabel isError={false} htmlFor="name">Your name</FormLabel>
                          {
                            error === "NameError" && <FormLabel isError={true}>{errorMessage}</FormLabel>
                          }
                          <FormInput type="name" required/>
                      </FormInputWrapper>
                    </Animated>
                }
                <FormInputWrapper>
                    <FormLabel isError={false} htmlFor="email">Your email</FormLabel>
                    {
                     error === "EmailError" && <FormLabel isError={true}>{errorMessage}</FormLabel>
                    }
                    <FormInput type="email" required/>
                </FormInputWrapper>
                <FormInputWrapper>
                    <FormLabel isError={false} htmlFor="password">Your password</FormLabel>
                    {
                     error === "PasswordError" && <FormLabel isError={true}>{errorMessage}</FormLabel>
                    }
                    <FormInput type="password" required/>
                </FormInputWrapper>
                <FormButton onClick={handleLoginRoute}>
                  { showSignUp && "Sign Up" }
                  { !showSignUp && "Login" }
                  </FormButton>
              </Form>
              <FooterSection>
                { !showSignUp &&  <PasswordResetSection onClick={e => updatePasswordFlow(true)}>Forgot Password ?</PasswordResetSection> }
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

