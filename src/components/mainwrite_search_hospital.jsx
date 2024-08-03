import styled from 'styled-components';
import api from "../api";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import SuggestionsDropdown from '../components/suggestionsdropdown';

export default function HospitalSearch({setHospitalId, setHospitalName}) {
    const inputRef = useRef(null);
    const [isFocus, setIsFocus] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedidx, setSelectedIdx] = useState(-1);
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        }
    }, []);

    const handleClickOutside = (e) => {
        if (inputRef.current && !inputRef.current.contains(e.target))
            setIsFocus(false);
        }
    
    // 아래 -> suggestiondropdown api
        const handleInputChange = async (e) => {
            const searchText = e.target.value;
            setSearchText(searchText);
            setIsFocus(true);
    
            if (searchText) {
                try {
                    const response = await api.get(`/board/search/${searchText}`);
                    const DataLimit = response.data.map(item => ({
                        id: item.id,
                        hospital_name: item.hospital_name,
                        gu: item.gu
                    })).slice(0, 15); //드롭다운 데이터 최대 15개만 로딩
                    setSuggestions(DataLimit);
                } catch (error) {
                    console.error(error);
                }
            } else {
                setSuggestions([]);
            }
        };
    
        const handleType = async () => {
            const searchText = inputRef.current.value;
    
            if (searchText) {
                try{
                    const response = await api.get(`/board/search/${encodeURIComponent(searchText)}`);
                    console.log(response.data);
                    setHospitalId(response.data.id);
                    setHospitalName(response.data[0].hospital_name);                }catch(error){
                    console.error("에러내역:", error);
                }
            } 
    
        };
    
        const handleSuggestionClick = (suggestion) => {
            setHospitalId(suggestion.id);
            setHospitalName(suggestion.hospital_name);
          };
    
        const handleKeyDown = (e) => {
            if (suggestions.length > 0) {
                switch (e.key) {
                    case 'ArrowUp':
                        e.preventDefault();
                        setSelectedIdx((prev) => 
                            prev > 0 ? prev - 1 : suggestions.length - 1);
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        setSelectedIdx((prev) => 
                            prev < suggestions.length - 1 ? prev + 1 : 0);
                        break;
                    case 'Enter':
                        if (selectedidx >= 0) {
                            handleSuggestionClick(suggestions[selectedidx]);
                        } else {
                            handleType();
                        }
                        break;
                    default:
                        break;
                }
            } else if (e.key === 'Enter') {
                handleType();
            }
        }
    
        return(
            <SearchContainer>
            <SearchInputContainer>
            <Searchinput 
            type = "search"
            placeholder = "리뷰 작성할 산부인과"
            className = 'SearchInput'
            ref = {inputRef}
            value={searchText}
            onChange={handleInputChange}
            onFocus={ () => setIsFocus(true) }
            onKeyDown={handleKeyDown}
            />
    
            <Searchbutton
            id = 'search-Btn'
            onClick={handleType}>
             확인
            </Searchbutton>
            {isFocus && suggestions.length > 0 && (
                <SuggestionsDropdown
                    suggestions={suggestions}
                    selectedidx={selectedidx}
                    onSuggestionClick={handleSuggestionClick}
                    setSelectedIdx={setSelectedIdx}/>
            )}
            </SearchInputContainer>
            </SearchContainer>
        )
    }

const SearchContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

const SearchInputContainer = styled.div`
    position: relative;
    width: 100%;
    height: 80px;
    margin: 20px 0 0 0 ;
`;
const Searchinput = styled.input`
    width: 100%;
    height: 80px;
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    font-size: 20px;
    padding-left: 20px;
    padding-right: 100px;
    outline: none;
`;

const Searchbutton = styled.button`
    position: absolute;
    right: 0;
    top: 0;
    width: 90px;

    height: 80px;
    border-radius: 3px;
    border: 1px solid #d9d9d9;
    background-color: #FFFF;
    color: black;
    font-size: 20px;
    cursor: pointer;
    
    &:hover {
        background-color: #FECD55;
    }
`;