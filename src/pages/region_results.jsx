import React from 'react';
import { useLocation } from 'react-router-dom';
import { ResultWrapper, ResultInnerContainer, ResultItem } from './name_results';
import { useNavigate } from 'react-router-dom';

export default function RegionResults() {
    const location = useLocation();
    const { results } = location.state || { results: [] };
    const navigate = useNavigate();

    const handleClickResult = (review) => {
        //navigate(`/review/${review.id}`)
        navigate('/hospital/:hospital_name')
      };

    return (
        <div>
        <ResultWrapper>
        <h2>지역 검색 결과</h2>
        {results.length === 0 ? (
                <p>해당 지역의 리뷰가 없습니다.</p>
            ) : (
                <ResultInnerContainer>
                    {results.map((result, index) => (
                        <ResultItem key={index}>
                            <a onClick={() => handleClickResult(result)}>
                            <span>No. {result.id}</span>
                            <span>{result.hospital_name} ({result.gu})</span>
                            </a>
                            <p>ID: {result.id}<br/>
                                    병원 이름: {result.hospital_name}<br/>
                                    주소: {result.address}<br/>
                                    구: {result.gu}<br/>
                                    리뷰 수: {result.comments.length}</p>
                                    산부인과 의사 수: {result.maindoctorcnt}<br/>
                                    네이버 내 예약 여부: {result.reservation ? "가능" : "불가능"}<br/>
                                    네이버 방문리뷰 수: {result.visitcnt}<br/>
                                    네이버 블로그 리뷰 수: {result.blogcnt}<br/>
                                    
                                    
                        </ResultItem>
                    ))}
                </ResultInnerContainer>
            )}
        </ResultWrapper>
        </div>
    );
}
