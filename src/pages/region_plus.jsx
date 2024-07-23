import styled from "styled-components"
import React from "react";
import SearchBox from "./mainsearch";


export default function RegionPlus(){
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
            <Region>강남구</Region>
            <Region>강동구</Region>
            <Region>강북구</Region>
            <Region>강서구</Region>
            <Region>관악구</Region>
            <Region>광진구</Region>
            <Region>구로구</Region>
            <Region>금천구</Region>
        </DetailContainer>

        <DetailContainer>
        <SectionTitle>ㄴ~ㅁ (노원구~마포구)</SectionTitle>
            <Region>노원구</Region>
            <Region>도봉구</Region>
            <Region>동대문구</Region>
            <Region>동작구</Region>
            <Region>마포구</Region>
        </DetailContainer>


        <DetailContainer>
        <SectionTitle>ㅅ(서대문구~송파구)</SectionTitle>
            <Region>서대문구</Region>
            <Region>서초구</Region>
            <Region>성동구</Region>
            <Region>성북구</Region>
            <Region>송파구</Region>
        </DetailContainer>

        <DetailContainer>
        <SectionTitle>ㅇ(양천구~은평구)</SectionTitle>
            <Region>양천구</Region>
            <Region>영등포구</Region>
            <Region>용산구</Region>
            <Region>은평구</Region>
        </DetailContainer>
        
        <DetailContainer>
        <p>ㅈ(종로구~중랑구)</p>
            <Region>종로구</Region>
            <Region>중구</Region>
            <Region>중랑구</Region>
        </DetailContainer>
        </RegionContainer>
        <br/>
        <SearchBox/>
        </>
    )
}


const Title = styled.h1`
    color: #4A4A4A;
    font-size: 2rem;
    margin-bottom: 20px;
`;

const SectionTitle = styled.p`
    width: 100%;
    text-align: center;
    font-size: 1.2rem;
    color: #4A4A4A;
    font-weight: bold;
    margin-bottom: 10px;
    border-bottom: 2px solid #DFE0DF;
    padding-bottom: 5px;
`;

const RegionContainer = styled.div`
    justify-content: center;
    align-items: center;

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

    margin: 10px 10px 10px 10px
    
`
const DetailContainer = styled.div`
    gap:20px;
`