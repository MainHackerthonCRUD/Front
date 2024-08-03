import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export default function MapInform() {
  const { hospital_name } = useParams(); // URL에서 병원 이름 가져오기
  const [hospitalInfo, setHospitalInfo] = useState(null);

  useEffect(() => {
    const fetchHospitalInfo = async () => {
      try {
        const response = await axios.get(`https://obspital.shop/board/search/${hospital_name}`);
        const data = response.data;
        if (data.length > 0) {
          setHospitalInfo(data[0]); // 첫 번째 요소를 상태에 저장
        }
      } catch (error) {
        console.error("Error fetching hospital data:", error);
      }
    };

    fetchHospitalInfo();
  }, [hospital_name]);

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

  return (
    <InformContainer>
      <Title>{name}</Title>
      <InformText>주소: {address}</InformText>
      <InformText>구: {gu}</InformText>
      <InformText>예약 가능 여부: {reservation ? "가능" : "불가능"}</InformText>
      <InformText>방문 리뷰 수: {visitcnt}</InformText>
      <InformText>블로그 리뷰 수: {blogcnt}</InformText>
      <InformText>산부인과 의사 수: {maindoctorcnt}</InformText>
    </InformContainer>
  );
}

const InformContainer = styled.div`
  background-color: #f0f0f0e7;
  width: 80%;
  margin: 0 auto;
  border-radius: 5%;
  text-align: center;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  margin: 10px 0;
`;

const InformText = styled.p`
  font-size: 16px;
  margin: 5px 0;
`;
