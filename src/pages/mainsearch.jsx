import styled from 'styled-components';
import api from "../api";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function SearchBox(){
    const inputRef = useRef(null);
    const [isFocus, setIsFocus] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    const handleClickOutside = (e) => {
        if (inputRef.current && !inputRef.current.cotains(e.target)) {
            setIsFocus(false);
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        }
    }, []);

    const handleInputChange = async (e) => {
        const searchText = e.target.value;
        setSearchText(searchText);
        setIsFocus(true);

        if (searchText) {
            try {
                const response = await api.get(`/board/search/${searchText}`);
                setSuggestions(response.data);
            } catch (error) {
                console.error(error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSearch = async () => {
        const searchText = inputRef.current.value;
    
        if (searchText) {
            try{
                const response = await api.get(`/board/name/${searchText}`);
                console.log(response.data);
                navigate(`/results/${searchText}`);
            }catch(error){
                console.error("에러내역:", error);
            }
        } 

    };

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    const handleSuggestionClick = (suggestion) => {
        navigate(`/results/${suggestion.hospital_name}`);
      };

    return(
        <SearchContainer>
        <SearchInputContainer>
        <Searchinput 
        type = "search"
        placeholder = "산부인과 후기 검색하기"
        className = 'SearchInput'
        ref = {inputRef}
        value={searchText}
        onChange={handleInputChange}
        onFocus={ () => setIsFocus(true) }
        onKeyDown={handleEnter}
        />

        <Searchbutton
        id = 'search-Btn'
        onClick={handleSearch}>
         검색
        </Searchbutton>
        {isFocus && suggestions.length > 0 && (
           <SuggestionsDropdown>
            {suggestions.map((suggestion, index) => 
            <SuggestionItem key={index}>
                <a onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion.hospital_name} ({suggestion.gu})
                </a>
            </SuggestionItem>)}
           </SuggestionsDropdown> 
        )}
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
    margin: 20px 0 0 0 ;
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
    
    &:hover {
        background-color: #FECD55;
    }
    `

const SuggestionsDropdown = styled.div`
position: absolute;
top: 80px;
width: 100%;
border: 1px solid #ccc;
border-radius: 0 0 20px 20px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
background-color: #fff;
z-index: 1000;
`;

const SuggestionItem = styled.div`
padding: 10px;
cursor: pointer;

&:hover {
    background-color: #f0f0f0;
}
`;