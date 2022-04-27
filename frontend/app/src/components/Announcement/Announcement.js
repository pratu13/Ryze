import React, { useEffect, useState } from 'react'
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

import { CardFooterImage } from '../Courses/CoursesStyledElements'
import {
    ModalBackgroundWrapper,
    ModalContent,
} from '../Custom/GenericStyledElements'

import ExitButtonIcon from '../../assets/ExitButtonIcon.png'
import Teacher from '../../assets/teacher.png'
import { AnimatePresence } from 'framer-motion'
import Publish from '../../assets/published.png'
import Unpublish from '../../assets/unpublished.png'
import { UserType } from '../Utilities/Utilities'
import { API } from '../Onboarding/Login/LoginUtilities'

import PublishDark from '../../assets/publishedDark.png'
import UnpublishDark from '../../assets/unpublishedDark.png'



export const AnnouncementItem = ({ token, announcement, course, role, dark }) => {
    const [publishedIcon, setPublishedIcon] = useState(announcement.is_active)

    const publishedIconTapped = async () => {
        console.log(announcement)
        const data = {
            entities: [announcement.uid]
        }
        let api = `${API}/v1/entities?strategy=announcements&block=${announcement.is_active}`
        const requestOptions = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Connection' : 'keep-alive',
            'Authorization' : `Bearer ${token}`
            },
          body: JSON.stringify(data)
        };
        await fetch(`${api}`, requestOptions)
          .then(response => response.json())
          .then(data => {
              console.log(data)
              setPublishedIcon(!publishedIcon)
          })
          .catch(error => console.log(error))
    }

    return (
        <>
            <AnnouncementItemContainer>
                <AnnouncementItemWrapper>
                <AnnouncementPublisherImg src={ Teacher }/>
                    <AnnouncemntContentWrapper>
                        <AnnouncementHeaderContainer>
                            <AnnouncementHeaderInfoContainer>
                                <AnnouncementHeader dark={dark} >{announcement.header}</AnnouncementHeader>
                                <SubjectTagContainer color={announcement.color}>
                                    <SubjectText>{course.title}</SubjectText>
                                </SubjectTagContainer>
                                {
                            role.title === UserType.ADMIN.title &&
                            <CardFooterImage onClick={ () => { publishedIconTapped() } } src={ !dark ? ( !publishedIcon ?  Unpublish : Publish ) : ( !publishedIcon ?  UnpublishDark : PublishDark )} />
                                  }
                            </AnnouncementHeaderInfoContainer>
                            <TimePublishedLabel dark={dark}>{ announcement.time}</TimePublishedLabel>
                        </AnnouncementHeaderContainer>
                        <AnnouncementDescriptionText dark={dark}>{ announcement.description}</AnnouncementDescriptionText>
                    </AnnouncemntContentWrapper>
                    
                </AnnouncementItemWrapper>
            </AnnouncementItemContainer>
        </>
    );
}


const Announcement = ({ announcements, updateAnnouncement }) => {

    
    useEffect(() => {
        console.log(announcements)
    }, [])

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
                               announcements.map((announcement) => ( 
                                    <>
                                       <AnnouncementItem
                                           announcement={announcement[0]}
                                       />
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