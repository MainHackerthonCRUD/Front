import React, { useEffect, useState } from 'react';


export default function Detail(){
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
    <div>
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
        <div id="result">
          <p>병원 이름: {selectedPlace.place_name}</p>
          <p>도로명 주소: {selectedPlace.road_address_name || '정보 없음'}</p>
          <p>지번 주소: {selectedPlace.address_name || '정보 없음'}</p>
          <p>위도: {selectedPlace.y}</p>
          <p>경도: {selectedPlace.x}</p>
        </div>
      )}
      <div id="map" style={{ width: '100%', height: '500px', marginTop: '20px' }}></div>
    </div>
  );
}