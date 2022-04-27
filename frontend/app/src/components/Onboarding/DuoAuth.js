import React, { useState, useEffect } from 'react'
import {
    SucessModalWrapper,
    SucessModalContainer,
    SucessModalContentWrapper,
    ModalImage,
    ModalDescription
} from '../Custom/GenericStyledElements'
import Success from '../../assets/login.png'
import Error from '../../assets/error.png'

import Admin from "../../assets/admin.png"
import Student from "../../assets/student.png"
import Teacher from "../../assets/teacher.png"

import { Animated } from "react-animated-css";
import { API } from './Login/LoginUtilities';
import { handleErrors } from '../Utilities/Utilities';
import { useNavigate } from 'react-router'

const DuoAuth = () => {

  const [img, setImg] = useState(Success)
  const [description, setDescription] = useState("Logging you in. Hold on")
  const [success, setSuccess] = useState(true)
  const navigate = useNavigate()

  const duoCallBack = async (email, state, code,role) => {
    const data = {
      email: email,
      state: state,
      duo_code: code
    }
    console.log(data)
    let api = `${API}/v1/user/login/duo-callback`
    const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Connection' : 'keep-alive',
      },
          body: JSON.stringify(data)
        };
    await fetch(`${api}`, requestOptions)
        .then(response => handleErrors(response))
        .then(response => response.json())
        .then(data => {
          console.log(data)
          document.cookie = "email= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
          setTimeout(() => {
            navigate(`/main`, {
              state: {
                email: email,
                token: data.token,
                name: data.name,
                color: data.color,
                role: role,
                userFirstTimeLogin: !data.color || !data.name,
                isAuthSignedIn: false
              }
            });
          }, 2500);
        })
        .catch(error => console.log(error))
  }
  
  
  useEffect(() => {
    const cookies = document.cookie.split(";")
    var email = ""
    var roleTitle = ""
    cookies.forEach(cookie => {
      if (cookie.includes("email")) {
        email = cookie.split("=")[1]
      }
      if (cookie.includes("roleTitle")) {
        roleTitle = cookie.split("=")[1]
      }
    })
    
    let searchParams = new URLSearchParams(window.location.href.split("?")[1]);
    const state = searchParams.get("state")
    const code = searchParams.get("duo_code")
    console.log(email)
    const roleImg = roleTitle == 'Admin' ? Admin : (roleTitle == 'Teacher' ? Teacher : Student)
    const role = {
      title: roleTitle,
      img: roleImg
    }
    console.log(role)
    duoCallBack(email, state, code,role)
  }, [])
  


    return (
        <>
            <Animated animationIn="fadeIn" animationOut="fadeInOut" isVisible={true}>
                <SucessModalContainer>
                    <SucessModalWrapper success = {success}>
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

export default DuoAuth