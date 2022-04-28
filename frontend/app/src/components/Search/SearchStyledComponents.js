import styled from "styled-components";

export const SearchMainContainer = styled.div`
    display: flex;
    width: 100%;
    height: 34px;
    padding: 12px 20px;
    align-items: center;
    justify-content: flex-end;
    background-color: ${({dark}) => dark ? "black" : "white"};
`

export const SearchTextField = styled.input`
    width: 335px;
    height: 54px;
    padding: 12px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 10px;
    background-color: whitesmoke;
    transition: all 0.2 ease-in-out;

    @media screen and (max-width: 1000px) {
        width: 225px;
        transition: all 0.2s ease-in-out;
    }

`

export const SortContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 64px;
    margin-right: 10px;
`

export const SortName = styled.p`
    font-size: 0.5em;
    color: lightgray;
`

export const SearchIcon = styled.img`
    object-fit: contain;
    vertical-align: auto;
    width: 24px;
    height: 24px;
    margin-left: 10px;
    cursor: pointer;
    display: ${({isHidden}) => isHidden ? "none" : ""};
    opacity: ${({isDisabled})  => isDisabled ? '0.5' : '1'};
    pointer-events: ${({isDisabled})  => isDisabled ? 'none' : 'all'};

`

export const SearchContainer = styled.div`
    display: flex;
    height: 100%;
    width: 55vw;
    margin-top: 5%;
    flex-direction: column;
`

export const SearchItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-left: 9%;
    margin-top: 2%;
`

export const CourseItemContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 10px;
    width: 100%;
    padding-left: 10px;
`

export const CourseItemBg = styled.div`
    width: 100px;
    height: 60px;
    background-color: ${({color}) => color};
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
`

export const CourseContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
`

export const CourseContentTitle = styled.div`
   font-size: large;
   font-weight: bold;
   color: ${({dark}) => dark ? "white" : "black"};
`
export const CourseContentSubtitle = styled.div`
    font-size: small;
    color: gray;
`