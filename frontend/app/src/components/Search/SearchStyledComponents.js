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
    height: 34px;
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
    background-color: red;
    margin-top: 5%;
`