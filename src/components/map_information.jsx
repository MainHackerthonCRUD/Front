import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export default function MapInform({setHospitalId}) {
  const { hospital_name } = useParams(); // URL에서 병원 이름
  const [hospitalInfo, setHospitalInfo] = useState(null);

  useEffect(() => {
    const fetchHospitalInfo = async () => {
      try {
        const response = await axios.get(`https://obspital.shop/board/search/${hospital_name}`);
        const data = response.data;
        if (data.length > 0) {
          setHospitalInfo(data[0]); // 첫 번째 요소를 상태에 저장
          setHospitalId(data[0].id); // 병원 아이디 부모 컴포넌트로 전달
          //console.log("Hospital ID set to:", data[0].id); 
        }
      } catch (error) {
        console.error("Error fetching hospital data:", error);
      }
    };

    fetchHospitalInfo();
  }, [hospital_name, setHospitalId]);

  if (!hospitalInfo) {
    return <p>로딩 중...</p>;
  }

  const {
    hospital_name: name,
    address,
    gu,
    reservation,
    visitcnt,
    blogcnt,
    maindoctorcnt,
  } = hospitalInfo;

    //더보기 추가
    const kakaoMapUrl = `https://map.kakao.com/link/search/${(name)}`;

  return (
    <InformContainer>
      <Title>{name}</Title>
      <InformText>위치: {address}</InformText>
      <InformText>예약 가능 여부: {reservation ? "가능" : "불가능"}</InformText>
      <InformText>네이버 방문 리뷰 수: {visitcnt}</InformText>
      <InformText>네이버 블로그 리뷰 수: {blogcnt}</InformText>
      <InformText>산부인과 전문의 수: {maindoctorcnt}</InformText>
      <MoreLink href={kakaoMapUrl} target="_blank" rel="noopener noreferrer"> 자세한 정보 더보기 </MoreLink>
    </InformContainer>
  );
}

const InformContainer = styled.div`
  background-color: #f0f0f0e7;
  width: 80%;
  margin: 0 auto;
  border-radius: 10px;
  text-align: center;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
  margin: 10px 0 30px 0 ;
`;

const InformText = styled.p`
  font-size: 16px;
  margin: 5px 0;
  margin-bottom: 10px;
`;

const MoreLink = styled.a`
  display: inline-block;
  margin-top: 10px;
  padding: 5px;
  background-color: #c7c7c7;
  color: black;
  text-decoration: none;
  border-radius: 5px;

  &:hover {
    background-color: rgba(254, 206, 85, 0.84);
    color: black;
  }
`;