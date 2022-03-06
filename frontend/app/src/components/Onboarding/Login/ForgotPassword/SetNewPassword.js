import React, { useState } from 'react'
import { Animated } from 'react-animated-css';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.production.min';
import { 
    Container, 
    FormButton, 
    FormContent, 
    FormInput, 
    FormInputWrapper, 
    FormLabel,
    Form
} from '../../../Custom/GenericStyledElements'
import { LoginWrapper } from '../../Welcome/WelcomeStyledElements';
import { API, ENUM_LOGINERROR } from '../LoginUtilities';

import { 
    SetPasswordTitle,
    SetNewPasswordWrapper
} from './ForgotPasswordStyledElements'

const SetNewPassword = () => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(ENUM_LOGINERROR.NoError);
    const [errorMessage, setErrorMessage] = useState("");
    const [confirmMessageShow, setConfirmMessageShow] = useState(false) 
    const navigate = useNavigate()
    const [token, setToken] = useState("");

    const didTapContinueBtn = () => {
        let token_ = window.location.href.split("/")[4]
        setToken(token_.substring(0, 56))
        console.log(token_.substring(0, 56))
        if (password != confirmPassword) {
            setErrorMessage("Oops, your password didn't match. Please try again")
            setError(ENUM_LOGINERROR.PasswordError) 
        } else {
            const data = {
                token: token_,
                contact: {
                    email: "student@gmail.com"
                },
                password: password
            }
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }
            fetch(`${API}/v1/user/recovery_options/resetPassword`, requestOptions)
                .then(response => handleErrors(response))
                .then(response => {
                    setTimeout(() => {
                        setConfirmMessageShow(true)
                        setTimeout(() => {
                            navigate(`/`)
                        }, 3000);
                    }, 3000);
                        
            })
            .catch(error => error)
        }
    }

    function handleErrors(response) {
        if (response.status != 200) {
          throw response.json()
        }
        return response;
      }

  return (
      <>
          <LoginWrapper>
           <Animated animationIn="bounceInLeft" animationOut="bounceOutRight"> 
           <Container>
        <SetNewPasswordWrapper>
            <SetPasswordTitle>Set your new password</SetPasswordTitle>
            <FormContent>
                    <FormInputWrapper>
                            <FormLabel htmlFor='password'>Your new password</FormLabel>
                            {
                             error === "PasswordError" && <FormLabel isError={true}>{errorMessage}</FormLabel>
                            }
                      <FormInput color="#EBF3F5" type="password" value={password} onChange={e=> setPassword(e.target.value)} required></FormInput >
                    </FormInputWrapper>
                    <FormInputWrapper>
                        <FormLabel htmlFor='confirm'>Confirm new password</FormLabel>
                        <FormInput color="#EBF3F5" type="password"  value={confirmPassword} onChange={e=> setConfirmPassword(e.target.value)} required></FormInput>
                    </FormInputWrapper>
                          <FormButton onClick={didTapContinueBtn}>Change Password</FormButton>
                          {
                              confirmMessageShow && <FormLabel color='green'>Successfully changed the password, redirecting to the login screen...</FormLabel>
                          }
            </FormContent>
            
        </SetNewPasswordWrapper>
    </Container>
           </Animated>
          </LoginWrapper>
   </>
  )
}

export default SetNewPassword