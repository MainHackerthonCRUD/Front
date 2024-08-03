import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function SearchNameResults() {

    const {hospital_name} = useParams();
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      const Results = async () => {
          try {
            const response = await api.get(`/board/search/${hospital_name}`);
            setResults(response.data);
          } catch (error) {
            console.error(error);
          }
      };
      Results();
    }, [hospital_name]);

    const handleClickResult = (result) => {
      navigate(`/hospital/${result.hospital_name}`)
    }

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

export const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px; //원래 80px였는데 위로 조금 올렸습니다!
  gap: 10px;
`;

export const ResultInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  margin-top: 15px; // 병원명 검색 결과 사이에 추가
  width: 80vw;
  max-width: 650px;
  gap: 10px;
  background-color:#fffff0;//#f7f7f7;
  border-radius: 10px;
  padding: 10px 20px 10px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const ResultItem= styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  gap: 10px;

  div {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }

  p {
    font-size: 13px;
  }

  a {
    &:hover {
      background-color: #FECD55;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 0 5px 0 5px ;
      border-radius: 10px;
    }
  }
`;

export const ResultText = styled.span`
  margin-top: 10px;
  margin-bottom: 5px;
  //margin-left: 10px;
`;

export const ResultTitle = styled.span`
    margin-top: 10px;
    font-weight: 600;
    //margin-left: 10px;
`;