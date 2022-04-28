import styled from "styled-components";

export const PersonContainer = styled.div`
    display: flex;
    width: auto;
    height: auto;
    margin: 2%;
    background-color: ${({ dark }) => dark ? "#1B2327" : "white" };
    padding: 10px;
    border-radius: 20px;
    cursor: pointer;
    pointer-events: all;
    transition: 0.2s all ease-in-out;

    &:hover {
        background-color: ${({ dark }) => dark ? "#1B2327" : "#F9D9EB" };
        opacity: 0.5;
        transition: 0.2s all ease-in-out;
    }
`

export const PersonColor = styled.div`
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: ${({color}) => color};
    border: 1px solid white;
`

export const PersonName = styled.p`
    font-size: 1em;
    font-weight: bold;
    color: ${({ dark }) => !dark ? "black" : "white" };
    margin-left: 5px;
`
export const ChatSideBarContainer = styled.div`
    margin: 0;
    padding: 0;
    width:  ${({ width }) => width} ;
    border-right:  ${({ dark }) => dark ? "0.2px solid white" : "0.2px solid rgba(0,0,0,0.28)" } ;
    background-color: ${({ dark }) => dark ? "black" : "white" };
    height: 70vh;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 40%;
    /* background-color: red; */

`

export const ChatSideBarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 20px;
    height: 70vh;
    overflow-y: scroll;
    width: 100%;
`

export const ChatSideBarTitle = styled.div`
    font-weight: bold;
    font-size: 1.5em;
    color: ${({ dark }) => !dark ? "black" : "white" };
    margin-bottom: 10px;
`

export const ChatContainer = styled.div`
    width: 82vw;
    display: flex;
    margin-top: 3%;
    justify-content: space-between;
    align-items: flex-start;
    border: ${({ dark }) => dark ? "0.1px solid white" : "0.1px solid lightgray" } ;
    left: 0;
    bottom: 0;
    position: absolute;
    top: 25%;
    height: 70vh;
    background-color: ${({ dark }) => dark ? "black" : "white" };
`

export const ChatDisplayContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    position: relative;
    justify-content: flex-start;
    background-color: ${({ dark }) => dark ? "black" : "white" };
`

export const ChatViewWrapper = styled.div`
    width: 100%;
    height: 70vh;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`
    
export const ChatViewDisplay = styled.div`
    width: 100%;
    top: 0;
    bottom: 0;
`
    
export const ChatFooter = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    margin-left: 10%;
`       

export const SendButton = styled.img`
    object-fit: contain;
    width: 44px;
    height: 44px;
    vertical-align: auto;
    margin-right: 10%;
    /* margin-top: 2%; */
    margin-left: 2%;
    margin-bottom: 35px;
    /* background-color: rebeccapurple; */
`

export const MessageContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: ${({ from }) => from ? 'flex-end' : 'flex-start'} ;
`

export const MessageBox = styled.div`
    background-color: ${({ from }) => from ? 'blue' : 'green'} ;;
    display: flex;
    padding: 2%;
    align-items: center;
    justify-content: flex-start;
    border-radius: 10px;
    margin: 1%;
`

export const MessageTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: ${({ from }) => from ? 'flex-end' : 'flex-start'} ;;
    justify-content: center;
    width: 100%;
`

export const MessageTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`

export const MessageText = styled.p`
    font-weight: bold;
    font-size: small;
    color: white;
    width: 100%;
    text-align: center;
`

export const MessageTitle = styled.p`
    font-weight: bold;
    font-size: small;
    color: ${({dark}) => dark ? "white" : "black"};
    width: 100%;
    text-align: center;
`

export const FromMessageText = styled.p`
    font-weight: bolder;
    font-size: x-small;
    color: red;
    margin-left: 1%;
    margin-right: 1%;
`


