import React from 'react'

import {
    SucessModalWrapper,
    SucessModalContainer,
    SucessModalContentWrapper,
    ModalImage,
    ModalDescription
} from '../Custom/GenericStyledElements'

import { Animated } from "react-animated-css";

const ConfirmationPage = ({setupComplete, img, description}) => {
    return (
        <>
            <Animated animationIn="fadeIn" animationOut="fadeInOut" isVisible={setupComplete}>
                <SucessModalContainer>
                    <SucessModalWrapper>
                        <SucessModalContentWrapper>
                            <ModalImage src={img} />
                            <ModalDescription>{description}</ModalDescription>
                                </SucessModalContentWrapper>
                        </SucessModalWrapper>
                 </SucessModalContainer>
            </Animated>
        </>
    )
}

export default ConfirmationPage