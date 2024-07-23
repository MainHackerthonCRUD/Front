import React from 'react';
import { useLocation } from 'react-router-dom';

export default function RegionResults() {
    const location = useLocation();
    const { results } = location.state || { results: [] };

    return (
        <div>
            <h1>지역 리뷰 결과</h1>
            {results.length === 0 ? (
                <p>해당 지역의 리뷰가 없습니다.</p>
            ) : (
                <ul>
                    {results.map((review, index) => (
                        <li key={index}>
                            <h2>{review.hospital_name}</h2>
                            <p>리뷰: {review.textbox}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
