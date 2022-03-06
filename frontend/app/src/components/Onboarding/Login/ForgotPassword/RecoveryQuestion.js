import React, { useEffect, useState } from 'react'
import { FormInput, FormInputWrapper, FormLabel, FormButton, Container  } from '../../../Custom/GenericStyledElements';
import { API } from '../LoginUtilities';
import SetNewPassword from './SetNewPassword';
import BackButton from '../../../../assets/backButton.png'
import {
    ForgotPasswordWrapper,
    ForgotPasswordHeader,
    BackButtonIcon,
    HeaderTitle,
    FormButtonWrapper,
} from '../ForgotPassword/ForgotPasswordStyledElements'


const RecoveryQuestion = ({updatePasswordFlow, email}) => {
    const [uid, setUID] = useState("")
    const [continueRecoveyQuestions, setContinue] = useState(false);
    const [question, setQuestion] = useState("What is your name");
    const [password, setPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const updateContinue = () => {
       
        //call the reset password API
        const data = {
            uid: uid,
            answer: answer,
            password: password
        }
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch(`${API}/v1/user/recovery_options`, requestOptions)
            .then(response => {
                if (response.ok) {
                    updatePasswordFlow(false)
                }
                
            });
            // .then(data => {
            //     console.log(data)
            //     if (data.message === "Success") {
                    
            //     } 
            // });

    }

    useEffect(() => {
        getQuestion()
    }, []);

    const getQuestion = async () => {
        const data = {
            email: email,
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        console.log(requestOptions)
        await fetch(`${API}/v1/user/recovery_options`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setUID(data.questions[0]["uid"])
                setQuestion(data.questions[0]["question"])
        });
    }

  return (
      <>
          {
            !continueRecoveyQuestions && 
            <Container>
                <ForgotPasswordWrapper>
                    <ForgotPasswordHeader>
                        {/* <BackButtonIcon src={BackButton} onClick={e => {updatePasswordFlow(false)}} alt="Go Back"/> */}
                        <HeaderTitle>Enter your new password</HeaderTitle>
                    </ForgotPasswordHeader>
                    {/* <FormInputWrapper>
                        <FormLabel isError={false} htmlFor="question">{question}</FormLabel>
                        <FormInput color="#EBF3F5" type="text" name="email" value={answer} onChange={e=> setAnswer(e.target.value)} required/>
                    </FormInputWrapper> */}
                    <FormInputWrapper>
                      <FormLabel htmlFor='password'>Your new password</FormLabel>
                      <FormInput color="#EBF3F5" type="password" name="password" value={password} onChange={e=> setPassword(e.target.value)} required></FormInput >
                          </FormInputWrapper>
                          <FormInputWrapper>
                      <FormLabel htmlFor='password'>Confirm new password</FormLabel>
                      <FormInput color="#EBF3F5" type="password" name="password" value={password} onChange={e=> setPassword(e.target.value)} required></FormInput >
                    </FormInputWrapper>
                    <FormButtonWrapper>
                        <FormButton onClick={updateContinue}>Continue</FormButton>
                    </FormButtonWrapper>
                </ForgotPasswordWrapper>
            </Container>
        }
        {
            continueRecoveyQuestions && <SetNewPassword/>
        }
      </>
  )
}

export default RecoveryQuestion