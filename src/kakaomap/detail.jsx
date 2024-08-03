import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function MapDetail() {
  const { hospital_name } = useParams();
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울 기준
      level: 3
    };
    const map = new window.kakao.maps.Map(container, options);
    setMap(map);

    if (hospital_name) {
      searchHospital(hospital_name);
    }
  }, [hospital_name]);

  const searchHospital = async (keyword) => {
    const REST_API_KEY = '4d8cfa3685dfa169c16db2a1ac1349aa'; // 카카오 REST API 키
    const url = `https://dapi.kakao.com/v2/local/search/address.json`;
    const headers = { Authorization: `KakaoAK ${REST_API_KEY}` };

    try {
      const response = await axios.get(url, {
        headers: headers,
        params: { query: keyword }
      });

      const data = response.data.documents;
      if (data.length > 0) {
        setPlaces(data);
        displayMarkers(data);
      } else {
        alert('검색 결과가 없습니다.');
      }
    } catch (error) {
      console.error('Error fetching data from Kakao API', error);
      alert('검색 중 오류가 발생했습니다.');
    }
  };

  const displayMarkers = (places) => {
    const bounds = new window.kakao.maps.LatLngBounds();

    places.forEach(place => {
      const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map: map
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        setSelectedPlace(place);
      });

      bounds.extend(markerPosition);
    });

    map.setBounds(bounds);
  };

  return (
    <>
      <InformContainer>
        {selectedPlace && (
          <TextContainer>
            <NameText>{selectedPlace.address_name}</NameText>
            <InformText>도로명 주소: {selectedPlace.road_address?.address_name || '정보 없음'}</InformText>
            <InformText>지번 주소: {selectedPlace.address_name}</InformText>
          </TextContainer>
        )}
        <MapContainer>
          <div id="map" style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>
        </MapContainer>
      </InformContainer>
    </>
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

const TextContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 20px;
`;

const NameText = styled.h1`
  font-size: 24px;
  font-weight: 500;
  margin: 10px 0;
`;

const InformText = styled.p`
  font-size: 14px;
  margin: 5px 0;
`;

const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
`;
