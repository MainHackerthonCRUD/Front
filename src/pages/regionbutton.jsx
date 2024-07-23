import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import React from "react";



export default function RegionBox(){
    const navigate = useNavigate();
    const handleMoreClick = () => {
        navigate("/region-plus");
    };

    return(
        <RegionContainer>
            <Region>강북구</Region>
            <Region>성북구</Region>
            <Region>노원구</Region>
            <Region>강남구</Region>
            <Region>관악구</Region>
            <Region>동작구</Region>
            <Region>서초구</Region>
            <Region>영등포구</Region>
            <Region>마포구</Region>
            <Region onClick = {handleMoreClick}>더보기...</Region>
        </RegionContainer>
    )
}

const RegionContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    height: 60vh;
    max-width:500px;
    margin: auto;
`

const Region = styled.button`
    width: 15%;
    height: 70px;
    text-align: center;
    border:none;
    cursor: pointer;
    border-radius: 15%;
    background-color: #DFE0DF;
    color: #716f6f;
    font-weight: 550;
    font-size: 16px;
    
`