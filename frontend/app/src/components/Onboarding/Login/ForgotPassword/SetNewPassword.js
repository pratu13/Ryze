import React from 'react'
import { 
    Container, 
    FormButton, 
    FormContent, 
    FormInput, 
    FormInputWrapper, 
    FormLabel,
    Form
} from '../../../Custom/GenericStyledElements'

import { 
    SetPasswordTitle,
    SetNewPasswordWrapper
} from './ForgotPasswordStyledElements'

const SetNewPassword = () => {
  return (
   <>
    <Container>
        <SetNewPasswordWrapper>
            <SetPasswordTitle>Set your new password</SetPasswordTitle>
            <FormContent>
                <Form>
                    <FormInputWrapper>
                      <FormLabel htmlFor='password'>Your new password</FormLabel>
                      <FormInput color="#EBF3F5" type="password" name="password" required></FormInput >
                    </FormInputWrapper>
                    <FormInputWrapper>
                        <FormLabel htmlFor='confirm'>Confirm new password</FormLabel>
                        <FormInput color="#EBF3F5" type="password" name="confirm" required></FormInput>
                    </FormInputWrapper>
                    <FormButton>Change Password</FormButton>
                </Form>
            </FormContent>
            
        </SetNewPasswordWrapper>
    </Container>
   </>
  )
}

export default SetNewPassword