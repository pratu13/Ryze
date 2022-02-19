import React, { useState } from 'react'
import { FormButton, Container } from '../../../GenericStyledElements';
import BackButton from '../../../../assets/backButton.png'
import OTPScreenImage from  '../../../../assets/otp_screen.png'
import {
    ForgotPasswordWrapper,
    ForgotPasswordHeader,
    BackButtonIcon,
    HeaderTitle,
    CenterImage,
    FormButtonWrapper,
    OTPContainer,
    OTPInput
} from '../ForgotPassword/ForgotPasswordStyledElements'
import SetNewPassword from './SetNewPassword';

const ForgotPassword = ({updatePasswordFlow}) => {

    const [continueForgotPassword, setContinue] = useState(false);

    const updateContinue = () => {
        setContinue(!continueForgotPassword);
    }


  return (
      <>
        {
            !continueForgotPassword && 
            <Container>
                <ForgotPasswordWrapper>
                    <ForgotPasswordHeader>
                        <BackButtonIcon src={BackButton} onClick={e => {updatePasswordFlow(false)}} alt="Go Back"/>
                        <HeaderTitle>Please enter the OTP</HeaderTitle>
                    </ForgotPasswordHeader>
                    <CenterImage src={OTPScreenImage} alt="OTP" />
                    We just sent an OTP to p****@gmail.com
                    <OTPContainer>
                        <OTPInput/><OTPInput/><OTPInput/><OTPInput/>
                    </OTPContainer>
                    <FormButtonWrapper>
                        <FormButton onClick={updateContinue}>Continue</FormButton>
                    </FormButtonWrapper>
                </ForgotPasswordWrapper>
            </Container>
        }
        {
            continueForgotPassword && <SetNewPassword/>
        }
        
      </>
  )
}

export default ForgotPassword;