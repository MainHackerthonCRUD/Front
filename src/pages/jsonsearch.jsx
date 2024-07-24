import React, { useState, useEffect } from 'react';
import hospitalData from '../hospital_list_with_gu.json'; // 구 정보가 포함된 JSON 파일을 가져옵니다

export default function HospitalSearch() {
    const [searchText, setSearchText] = useState('');
    const [filteredHospitals, setFilteredHospitals] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');

    useEffect(() => {
        // 초기 병원 데이터 로딩
        setFilteredHospitals(hospitalData);
    }, []);

    const handleInputChange = (e) => {
        const searchText = e.target.value;
        setSearchText(searchText);

        filterHospitals(searchText, selectedRegion);
    };

    const handleRegionChange = (e) => {
        const region = e.target.value;
        setSelectedRegion(region);

        filterHospitals(searchText, region);
    };

    const filterHospitals = (searchText, region) => {
        const filtered = hospitalData.filter(hospital =>
            hospital.병원명.toLowerCase().includes(searchText.toLowerCase()) &&
            (region ? hospital.구 === region : true)
        );
        setFilteredHospitals(filtered);
    };

    return (
        <div>
            <input 
                type="text"
                placeholder="병원 이름을 입력하세요"
                value={searchText}
                onChange={handleInputChange}
            />
            <select value={selectedRegion} onChange={handleRegionChange}>
                <option value="">전체 지역</option>
                <option value="강남구">강남구</option>
                <option value="서초구">서초구</option>
                <option value="마포구">마포구</option>
                {/* 필요한 지역 옵션을 추가하세요 */}
            </select>
            <ul>
                {filteredHospitals.map((hospital) => (
                    <li key={hospital.병원명}>
                        <h2>{hospital.병원명}</h2>
                        <p>지역: {hospital.구}</p>
                        <p>주소: {hospital.주소}</p>
                        <p>진료 시작 시각: {hospital.진료시작시각}</p>
                        <p>방문자 리뷰: {hospital.방문자리뷰}</p>
                        <p>블로그 리뷰: {hospital.블로그리뷰}</p>
                        <p>산부인과 전문의 수: {hospital.산부인과전문의수}</p>
                        <p>기타 전문의 여부: {hospital.기타전문의여부}</p>
                        <p>예약 가능 여부: {hospital.예약가능여부}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
