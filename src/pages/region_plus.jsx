import styled from "styled-components"
import React from "react";
import SearchBox from "./mainsearch";
import { useNavigate } from "react-router-dom";
import api from "../api";


export default function RegionPlus(){

    const navigate = useNavigate();

    const handleRegionClick = async(gu) => {
        try {
            const response = await api.get(`/board/search/${gu}`)
            navigate(`/region/${gu}`, {state: {results: response.data } });
        } catch(error) {
            console.error("에러내역:",error);
        }
    };


    return(
        <>
        {/*<p>가나다순</p>
        <p>강남구, 강동구, 강북구, 강서구, 관악구, 광진구, 구로구, 금천구</p>
        <p>노원구, 도봉구, 동대문구, 동작구, 마포구</p>
        <p>서대문구, 서초구, 성동구, 성북구, 송파구</p>
        <p>양천구, 영등포구, 용산구, 은평구</p>
        <p>종로구, 중구, 중랑구</p>*/}

        <RegionContainer>
        <Title>전체 지역 보기</Title>
        <DetailContainer>
        <SectionTitle>ㄱ (강남구~ 금천구)</SectionTitle>
            <Region onClick = {() => handleRegionClick('강남구')}>강남구</Region>
            <Region onClick = {() => handleRegionClick('강동구')}>강동구</Region>
            <Region onClick = {() => handleRegionClick('강북구')}>강북구</Region>
            <Region onClick = {() => handleRegionClick('강서구')}>강서구</Region>
            <Region onClick = {() => handleRegionClick('관악구')}>관악구</Region>
            <Region onClick = {() => handleRegionClick('광진구')}>광진구</Region>
            <Region onClick = {() => handleRegionClick('구로구')}>구로구</Region>
            <Region onClick = {() => handleRegionClick('금천구')}>금천구</Region>
        </DetailContainer>

        <DetailContainer>
        <SectionTitle>ㄴ~ㅁ (노원구~마포구)</SectionTitle>
            <Region onClick = {() => handleRegionClick('노원구')}>노원구</Region>
            <Region onClick = {() => handleRegionClick('도봉구')}>도봉구</Region>
            <Region onClick = {() => handleRegionClick('동대문구')}>동대문구</Region>
            <Region onClick = {() => handleRegionClick('동작구')}>동작구</Region>
            <Region onClick = {() => handleRegionClick('마포구')}>마포구</Region>
        </DetailContainer>


        <DetailContainer>
        <SectionTitle>ㅅ(서대문구~송파구)</SectionTitle>
            <Region onClick = {() => handleRegionClick('서대문구')}>서대문구</Region>
            <Region onClick = {() => handleRegionClick('서초구')}>서초구</Region>
            <Region onClick = {() => handleRegionClick('성동구')}>성동구</Region>
            <Region onClick = {() => handleRegionClick('성북구')}>성북구</Region>
            <Region onClick = {() => handleRegionClick('송파구')}>송파구</Region>
        </DetailContainer>

        <DetailContainer>
        <SectionTitle>ㅇ(양천구~은평구)</SectionTitle>
            <Region onClick = {() => handleRegionClick('양천구')}>양천구</Region>
            <Region onClick = {() => handleRegionClick('영등포구')}>영등포구</Region>
            <Region onClick = {() => handleRegionClick('용산구')}>용산구</Region>
            <Region onClick = {() => handleRegionClick('은평구')}>은평구</Region>
        </DetailContainer>
        
        <DetailContainer>
        <SectionTitle>ㅈ(종로구~중랑구)</SectionTitle>
            <Region onClick = {() => handleRegionClick('종로구')}>종로구</Region>
            <Region onClick = {() => handleRegionClick('중구')}>중구</Region>
            <Region onClick = {() => handleRegionClick('중랑구')}>중랑구</Region>
        </DetailContainer>
        </RegionContainer>
        
        <SearchBox/>
        </>
    )
}

const RegionContainer = styled.div`
    justify-content: center;
    align-items: center;


`

const Title = styled.h1`
    color: #4A4A4A;
    font-size: 40px;
    margin-bottom: 50px;
    text-align:center;
`;

const SectionTitle = styled.p`
    width: 100%;
    text-align: center;
    font-size: 25px;
    color: #4A4A4A;
    font-weight: bold;
    margin-bottom: 20px;
    border-bottom: 2px solid #FECD55;
    padding-bottom: 20px;
`;

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
    margin: 10px 10px 10px 10px;

    transition: transform 0.2s;

    &:hover{
        transform: scale(1.05);
        background-color: #FECD55;
        color: black;
    }
   
`;

const DetailContainer = styled.div`
    gap:20px;
    width: 650px;
    margin-bottom:30px;
    background-color: #f7f7f7;
    border-radius: 20px;
    padding: 20px 20px 20px 20px;

`