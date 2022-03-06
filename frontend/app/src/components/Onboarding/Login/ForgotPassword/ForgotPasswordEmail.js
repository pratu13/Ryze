import React, { useEffect, useState } from 'react'
import {
    FormLabel,
    FormButton,
    Container
} from '../../../Custom/GenericStyledElements';
import { API } from '../LoginUtilities';
import MailSent from '../../../../assets/mail_sent.png'
import {
    CenterImage,
} from '../ForgotPassword/ForgotPasswordStyledElements'

import { 
    SetNewPasswordWrapper
} from './ForgotPasswordStyledElements'


const ForgotPasswordEmail = ({ email, updatePasswordFlow }) => {

    useEffect(() => {
        sendEmail()
    }, [])

    const sendEmail = async () => {
        const data = {
            email: email
        }
        console.log(email)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        await fetch(`${API}/v1/user/recovery_options/email_recovery_link`, requestOptions)
            .then(response => handleErrors(response))
            .then(response => response.json())
            .catch(error => error)
    }

    function handleErrors(response) {
        if (response.status != 200) {
          throw response.json()
        }
        return response;
      }


  return (
      <>
          <Container>
              <SetNewPasswordWrapper>
                  <CenterImage src={MailSent} />
                  <FormLabel isError={false} color="black">{`An email has been sent to ${email}. Please check your mail box`}</FormLabel>
                  <FormButton onClick={() => { updatePasswordFlow(false) } } >GO BACK</FormButton>
              </SetNewPasswordWrapper>
          </Container>
      </>
  )
}

export default ForgotPasswordEmail