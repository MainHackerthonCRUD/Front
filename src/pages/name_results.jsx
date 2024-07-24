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
            const response = await api.get(`/board/name/${hospital_name}`);
            setResults(response.data);
          } catch (error) {
            console.error(error);
          }
      };
      Results();
    }, [hospital_name]);

    const handleClickResult = (result) => {
      navigate(`/review/${result.id}`)
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
              <span>No. {result.id}</span>
              <span>{result.hospital_name} ({result.region})</span>
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
  margin-top: 80px;
  gap: 10px;
`;

export const ResultInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  width: 80vw;
  max-width: 650px;
  gap: 10px;
  background-color: #f7f7f7;
  border-radius: 20px;
  padding: 20px 20px 20px 20px;
`;

export const ResultItem= styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
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
    }
  }
`;