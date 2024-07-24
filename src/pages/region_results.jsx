import React from 'react';
import { useLocation } from 'react-router-dom';
import { ResultWrapper, ResultInnerContainer, ResultItem } from './name_results';
import { useNavigate } from 'react-router-dom';

export default function RegionResults() {
    const location = useLocation();
    const { results } = location.state || { results: [] };
    const navigate = useNavigate();

    const handleClickResult = (review) => {
        navigate(`/review/${review.id}`)
      }

    return (
        <div>
        <ResultWrapper>
        <h2>지역 검색 결과</h2>
        {results.length === 0 ? (
                <p>해당 지역의 리뷰가 없습니다.</p>
            ) : (
                <ResultInnerContainer>
                    {results.map((review, index) => (
                        <ResultItem key={index}>
                            <a onClick={() => handleClickResult(review)}>
                            <span>No. {review.id}</span>
                            <span>{review.hospital_name} ({review.region})</span>
                            </a>
                            <p>{review.textbox}</p>
                        </ResultItem>
                    ))}
                </ResultInnerContainer>
            )}
        </ResultWrapper>
        </div>
    );
}
