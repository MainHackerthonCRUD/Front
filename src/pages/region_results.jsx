import React from 'react';
import { useLocation } from 'react-router-dom';
import { ResultWrapper, ResultInnerContainer, ResultItem, ResultText, ResultTitle } from './name_results';
import { useNavigate } from 'react-router-dom';

export default function RegionResults() {
    const location = useLocation();
    const { results } = location.state || { results: [] };
    const navigate = useNavigate();

    const handleClickResult = (result) => {
        navigate(`/hospital/${result.hospital_name}`);
    };

    return (
        <div>
          <ResultWrapper>
          <h2>병원명 검색 결과</h2>
          <ResultInnerContainer>
          {results.map((result, index) => (
              <ResultItem key={index}>
                <a onClick={() => handleClickResult(result)}>
                <div>
                  <ResultTitle>{result.hospital_name} ({result.gu})</ResultTitle>
                </div>
                <div>
                  <ResultText>{result.address}</ResultText>
                  <ResultText>{result.reservation ? "예약 가능" : "예약 불가능"}</ResultText>
                  <ResultText>블로그 리뷰({result.blogcnt})</ResultText>
                </div>
                </a>
                <p>{result.textbox}</p>
              </ResultItem>
            ))}
          </ResultInnerContainer>
          </ResultWrapper>
        </div>
      )
    }
    