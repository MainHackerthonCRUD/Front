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
        <SearchInputContainer>
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
        </SearchInputContainer>
        </SearchContainer>
    )
} 


const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-bottom: 50px;
`;

const SearchInputContainer = styled.div`
    position: relative;
    width: 650px;
    height: 80px;
    margin: 50px 0 0 0 ;
`;
const Searchinput = styled.input`
    width: 650px;
    height: 80px;
    border: 2px solid #FECD55;
    border-radius: 20px;
    font-size: 20px;
    padding-left: 20px;
    padding-right: 100px;
    outline: none;
    `

const Searchbutton = styled.button`
    position: absolute;
    right: 0;
    top: 0;
    width: 90px;

    height: 80px;
    border-radius: 0 20px 20px 0;
    border: 2px solid #FECD55;
    background-color: #FFFF;
    color: black;
    font-size: 20px;
    cursor: pointer;
    
    `