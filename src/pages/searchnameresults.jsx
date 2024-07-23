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
      <h2>검색결과</h2>
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
      </ResultWrapper>
    </div>
  )
}

const ResultWrapper = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 80vw;
`;

const ResultItem= styled.div`
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
      color: white;
    }
  }
`;