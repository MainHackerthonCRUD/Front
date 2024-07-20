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
        <>
        <input type = "search"
        placeholder = "산부인과 후기 검색하기"
        className = 'SearchInput'
        ref = {inputRef}
        />

        <button
        id = 'search-Btn'
        onClick={handleSearch}>
         검색
        </button>
        </>
    )
} 