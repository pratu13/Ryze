import React, { useState } from 'react'
import {
    ExitButtonContainer,
    AnnouncementContainer,
    ExitButton,
    AnnouncementItemContainer,
    AnnouncementItemWrapper,
    AnnouncemntContentWrapper,
    AnnouncementHeaderContainer,
    AnnouncementHeader,
    TimePublishedLabel,
    AnnouncementDescriptionText,
    AnnouncementPublisherImg,
    AnnouncementItemsContainer,
    Divider,
    SubjectTagContainer,
    SubjectText,
    AnnouncementHeaderInfoContainer
} from './AnnouncementStyledElements'

import {
    FormButton,
    FormInput,
    FormLabel,
    FormInputArea,
    ModalBackgroundWrapper,
    ModalContentContainer,
    ModalContent,
    CDatePicker
} from '../Custom/GenericStyledElements'

import ExitButtonIcon from '../../assets/ExitButtonIcon.png'
import { useLocation } from 'react-router'
import Teacher from '../../assets/teacher.png'
import { useNavigate } from 'react-router'
import { AnimatePresence } from 'framer-motion'

export const AnnouncementItem = ({ announcement }) => {
    return (
        <>
            <AnnouncementItemContainer>
                <AnnouncementItemWrapper>
                <AnnouncementPublisherImg src={ Teacher }/>
                    <AnnouncemntContentWrapper>
                        <AnnouncementHeaderContainer>
                            <AnnouncementHeaderInfoContainer>
                                <AnnouncementHeader>{announcement.header}</AnnouncementHeader>
                                <SubjectTagContainer color={announcement.color}>
                                    <SubjectText>{announcement.subjectName}</SubjectText>
                                </SubjectTagContainer>
                            </AnnouncementHeaderInfoContainer>
                            <TimePublishedLabel>{ announcement.time}</TimePublishedLabel>
                        </AnnouncementHeaderContainer>
                        <AnnouncementDescriptionText>{ announcement.description}</AnnouncementDescriptionText>
                    </AnnouncemntContentWrapper>
                    
                </AnnouncementItemWrapper>
            </AnnouncementItemContainer>
        </>
    );
}


const Announcement = ({ announcements, updateAnnouncement }) => {


    // const location = useLocation();
    // const navigate = useNavigate();
    // const {announcements} = location.state;

    // const [announcementItemOpen, setAnnouncementItemOpen] = useState(false)

  return (
      <>
          <AnimatePresence>
                    <ModalBackgroundWrapper
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1,
                        transition: {
                            duration: 0.3
                        }
                    }}
                        exit={{
                            opacity: 0
                        }}
                    >
                    <ModalContent
                            initial={{
                                x: 100,
                                opacity: 0
                            }}
                            animate={{
                                x: 0,
                                opacity: 1,
                                transition: {
                                    delay: 0.3,
                                    duration: 0.3
                                }
                            }}
                              exit={{
                                x: 100,
                                opacity: 0
                            }}
                        >
                            <ExitButtonContainer>
                                <ExitButton src={ExitButtonIcon} onClick={() => {updateAnnouncement(false)}}/>
                            </ExitButtonContainer>
                            <AnnouncementItemsContainer>
                            {
                                Object.keys(announcements).map((key, index) => ( 
                                    <>
                                        <AnnouncementItem key={ key }announcement={announcements[key]}/>
                                        <Divider/>
                                    </>
                                )) 
                            }
                            </AnnouncementItemsContainer>
                            
                        </ModalContent>
                    </ModalBackgroundWrapper>
        
          </AnimatePresence>
           {/* <AnnouncementContainer>
              
          </AnnouncementContainer> */}
      </>
         
  )
}

export default Announcement