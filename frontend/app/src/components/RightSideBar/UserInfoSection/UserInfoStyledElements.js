import styled from "styled-components";


export const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 45px;
`

export const UserProfileHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-items: flex-end;
    align-items: flex-end;
    
`

export const UserBackgroundColor = styled.div`
    width: 237px;
    height: 98px;
    border-radius: 20px;
    background-color: ${({color}) => color};
`

export const UserImageIcon = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-top: -30px;
    background: ${({color}) => color};
    border: 3px solid white;
`

export const UserNameSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const UserNameLabel = styled.p`
    font-weight: bolder;
    font-size: 1.5em;
    color: ${({ dark }) => !dark ? "black" : "white" };
`

export const UserMailLabel = styled.p`
    margin-top: 10px;
    font-size: 1em;
    font-weight: lighter;
    color: ${({ dark }) => !dark ? "black" : "white" };
`

export const UserDescriptionSection = styled.div`
    margin-top: 30px;
    display: flex;
    width: 237px;
    justify-content: space-between;
`

export const TermRoleSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const DescriptionTitleLabel = styled.p`
    font-weight: lighter;
    font-size: 1em;
    color: ${({ dark }) => !dark ? "black" : "white" };
`

export const DescriptionSubtitleLabel = styled.p`
    margin-top: 10px;
    font-weight: bolder;
    font-size: 1.2em;
    color: ${({ dark }) => !dark ? "black" : "white" };
`