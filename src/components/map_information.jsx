import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export default function MapInform({ setHospitalId }) {
  const { hospital_name } = useParams();
  const [hospitalInfo, setHospitalInfo] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    const fetchHospitalInfo = async () => {
      try {
        const response = await axios.get(`https://obspital.shop/board/search/${hospital_name}`);
        const data = response.data;
        if (data.length > 0) {
          setHospitalInfo(data[0]);
          setHospitalId(data[0].id);

          // Fetch coordinates using Kakao Geocoding API if latitude and longitude are not provided
          if (!data[0].latitude || !data[0].longitude) {
            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.addressSearch(data[0].address, (result, status) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                setCoordinates(coords);
              } else {
                console.error('Geocoding failed: ' + status);
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
          const kakao = window.kakao;
          const container = document.getElementById('map');
          const options = {
            center: coordinates,
            level: 3,
          };
          const map = new kakao.maps.Map(container, options);

          const marker = new kakao.maps.Marker({
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
      <InformText>위치: {address}</InformText>
      <InformText>예약 가능 여부: {reservation ? "가능" : "불가능"}</InformText>
      <InformText>네이버 방문 리뷰 수: {visitcnt}</InformText>
      <InformText>네이버 블로그 리뷰 수: {blogcnt}</InformText>
      <InformText>산부인과 전문의 수: {maindoctorcnt}</InformText>
      <MapContainer id="map" />
    </InformContainer>
  );
}

const InformContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;

`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const InformText = styled.p`
  margin: 5px 0;
`;

const MapContainer = styled.div`
  width: 50%;
  height: 200px;
  margin-top: 20px;
`;
