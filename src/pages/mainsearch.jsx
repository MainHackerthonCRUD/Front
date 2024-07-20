import styled from 'styled-components';
import api from "../api";

export default function SearchBox(){


    return(
        <>
        <input type = "search"
        placeholder = "산부인과 후기 검색하기"
        className = 'SearchInput'/>

        <button
        id = 'search-Btn'>
         검색
        </button>
        </>
    )
} 