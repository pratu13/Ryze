import React from 'react'
import { 
    Container, 
    FormButton, 
    FormContent, 
    FormInput, 
    FormInputWrapper, 
    FormLabel,
    Form
} from '../../../GenericStyledElements'

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
                      <FormInput type="password" name="password" required></FormInput >
                    </FormInputWrapper>
                    <FormInputWrapper>
                        <FormLabel htmlFor='confirm'>Confirm new password</FormLabel>
                        <FormInput type="password" name="confirm" required></FormInput>
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