import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export default function MapInform({ setHospitalId }) {
  const { hospital_name } = useParams();
  const [hospitalInfo, setHospitalInfo] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const kakaoMapUrl = `https://map.kakao.com/link/search/${(hospital_name)}`;

  useEffect(() => {
    const fetchHospitalInfo = async () => {
      try {
        const response = await axios.get(`https://obspital.shop/board/search/${hospital_name}`);
        const data = response.data;
        if (data.length > 0) {
          setHospitalInfo(data[0]);
          setHospitalId(data[0].id);

          if (!data[0].latitude || !data[0].longitude) {
            const places = new window.kakao.maps.services.Places();
            places.keywordSearch(hospital_name, (result, status) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                setCoordinates(coords);
              } else {
                console.error('Places search failed: ' + status);
              }
            });
          } else {
            const coords = new window.kakao.maps.LatLng(data[0].latitude, data[0].longitude);
            setCoordinates(coords);
          }
        }
      } catch (error) {
        console.error("Error fetching hospital data:", error);
      }
    };

    fetchHospitalInfo();
  }, [hospital_name, setHospitalId]);

  useEffect(() => {
    if (coordinates) {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=4d8cfa3685dfa169c16db2a1ac1349aa&libraries=services,clusterer,drawing`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          const container = document.getElementById('map');
          const options = {
            center: coordinates,
            level: 3,
          };
          const map = new window.kakao.maps.Map(container, options);

          const marker = new window.kakao.maps.Marker({
            position: coordinates,
          });
          marker.setMap(map);
        } else {
          console.error("Kakao maps API failed to load");
        }
      };

      script.onerror = () => {
        console.error("Error loading Kakao maps script");
      };

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [coordinates]);

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
      <MoreLink href={kakaoMapUrl} target="_blank" rel="noopener noreferrer"> 자세한 정보 더보기 </MoreLink>
      <InformText>위치: {address}</InformText>
      <InformText>네이버 예약 가능 여부: {reservation ? "가능" : "불가능"}</InformText>
      <InformText>네이버 방문 리뷰 수: {visitcnt}</InformText>
      <InformText>네이버 블로그 리뷰 수: {blogcnt}</InformText>
      <InformText>산부인과 전문의 수: {maindoctorcnt}</InformText>
      
      <MapContainer id="map" />
    </InformContainer>
  );
}

const InformContainer = styled.div`
  width: 80%;
  padding: 20px;
  background-color: #f0f0f0e7;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  text-align: center;
`;

const Title = styled.h2`
  margin-top: 10px;
  margin-bottom: 20px;
  color: #333;
  font-size: 40px;
  font-weight: bold;
`;

const InformText = styled.p`
  margin: 5px 0;
  color: #555;
  font-size: 20px;
  font-weight: 200;
`;

const MapContainer = styled.div`
  width: 80%;
  height: 300px;
  margin-top: 20px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const MoreLink = styled.a`
  display: inline-block;
  margin-top: 5px;
  margin-bottom: 15px;
  padding: 10px 15px;
  background-color: #c7c7c7;
  color: black;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1em;
  font-weight: 600;
  &:hover {
    background-color: rgba(254, 206, 85, 0.84);
    color: black;
  }
`;