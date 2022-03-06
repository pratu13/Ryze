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

import ExitButtonIcon from '../../assets/ExitButtonIcon.png'
import { useLocation } from 'react-router'
import Teacher from '../../assets/teacher.png'
import { useNavigate } from 'react-router'

const AnnouncementItem = ({ announcement }) => {
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


const Announcement = ({ isOpen, updateAnnouncement }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const {announcements} = location.state;

    const [announcementItemOpen, setAnnouncementItemOpen] = useState(false)

  return (
      <>
          <AnnouncementContainer>
              <ExitButtonContainer>
                  <ExitButton src={ExitButtonIcon} onClick={() => {navigate(-1)}}/>
              </ExitButtonContainer>
              <AnnouncementItemsContainer>
                  {/* <AnnouncementItem announcement={{
            header: "Announcment 1",
            time: "02/22/22",
            description: "This is a stupid description"
          }}/> */}
                  {
                      Object.keys(announcements).map((key, index) => ( 
                          <>
                              <AnnouncementItem key={ key }announcement={announcements[key]}/>
                              <Divider/>
                          </>
                        
                    ))
                      
                  }

              </AnnouncementItemsContainer>
          </AnnouncementContainer>
      </>
  )
}

export default Announcement