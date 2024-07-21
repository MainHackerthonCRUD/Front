import styled from 'styled-components';
import api from "../api";
import React, {useRef} from "react";

export default function SearchBox(){
    const inputRef = useRef(null);

    const handleSearch = async () => {
        const searchText = inputRef.current.value;
    
        if (searchText) {
            try{
                const response = await api.get(`/board/name/${searchText}`);
                console.log(response.data);
            }catch(error){
                console.error("에러내역:", error);
            }
        } 

    };


    return(
        <SearchContainer>
        <Searchinput type = "search"
        placeholder = "산부인과 후기 검색하기"
        className = 'SearchInput'
        ref = {inputRef}
        />

        <Searchbutton
        id = 'search-Btn'
        onClick={handleSearch}>
         검색
        </Searchbutton>
        </SearchContainer>
    )
} 


const SearchContainer = styled.div`
    display: flex;
    //flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

`
const Searchinput = styled.input`
    width: 600px;
    height: 80px;
    margin-top: 50px; 
    border: 2px solid #FECD55;
    border-radius: 20px;
    font-size: 20px;
    padding-left: 20px;
    outline: none;
    `

const Searchbutton = styled.button`
    width: 100px;
    height: 80px;
    margin-top:50px;
    border-radius: 20px;
    border: 2px solid #FECD55;
    background-color: #FECD55;
    color: black;
    font-size: 20px;
    cursor: pointer;
    
    `