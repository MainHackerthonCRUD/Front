import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import React from "react";
import api from "../api";



export default function RegionBox(){
    const navigate = useNavigate();
    const handleMoreClick = () => {
        navigate("/region-plus");
    };

    const handleRegionClick = async(region) => {
        try {
            const response = await api.get(`/board/region/${region}`)
            navigate(`/region/${region}`, {state: {results: response.data } });
        } catch(error) {
            console.error("에러내역:",error);
        }
    };

    return(
        <>
        <RegionContainer>
            <Region onClick = {() => handleRegionClick('강북구')}>강북구</Region>
            <Region onClick = {() => handleRegionClick('성북구')}>성북구</Region>
            <Region onClick = {() => handleRegionClick('노원구')}>노원구</Region>
            <Region onClick = {() => handleRegionClick('강남구')}>강남구</Region>
            <Region onClick = {() => handleRegionClick('관악구')}>관악구</Region>
        </RegionContainer>
        <RegionContainer>
            <Region onClick = {() => handleRegionClick('동작구')}>동작구</Region>
            <Region onClick = {() => handleRegionClick('서초구')}>서초구</Region>
            <Region onClick = {() => handleRegionClick('영등포구')}>영등포구</Region>
            <Region onClick = {() => handleRegionClick('마포구')}>마포구</Region>
            <Region onClick = {handleMoreClick}>더보기...</Region>
        </RegionContainer>
        </>
    )
}

const RegionContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 30px;
    height: 100px;
    width:165%;
    //margin: auto;
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
    transition: transform 0.2s;

    &:hover{
        transform: scale(1.05);
        background-color: #FECD55;
        color: black;
    }
   
`;