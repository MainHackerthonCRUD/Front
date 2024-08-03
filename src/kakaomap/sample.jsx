import styled from 'styled-components';
import React, { useEffect, useState } from 'react';

export default function MapDetail(){
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울 기준
      level: 3
    };
    const map = new window.kakao.maps.Map(container, options);
    setMap(map);
  }, []);

  const searchHospital = () => {
    if (!keyword) {
      alert('병원 이름을 입력하세요.');
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setPlaces(data);
        displayMarkers(data);
      } else {
        alert('검색 결과가 없습니다.');
      }
    });
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
      <div>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="병원 이름을 입력하세요"
        />
        <button onClick={searchHospital}>검색</button>
      </div>
      {selectedPlace && (
        <TextContainer>
          <NameText>{selectedPlace.place_name}</NameText>
          <a href={selectedPlace.place_url} target="_blank" rel="noopener noreferrer">더 많은 정보</a>
          <InformText>전화번호: {selectedPlace.phone || '정보 없음'}</InformText>

          <InformText>도로명 주소: {selectedPlace.road_address_name || '정보 없음'}</InformText>
          <InformText>지번 주소: {selectedPlace.address_name || '정보 없음'}</InformText>
          {/*<p>위도: {selectedPlace.y}</p>
          <p>경도: {selectedPlace.x}</p>*/}
        </TextContainer>
      )}
      <MapContainer>
        <div id="map" style={{ width: '200px', height: '200px', marginTop: '20px' }}></div>
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