import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function GoBackButton () {
    const navigate = useNavigate();
    const onButtonClick = () => {
        navigate(-1);
    };
    return (
        <BtnDiv>
            <button onClick={onButtonClick}>뒤로가기</button>
        </BtnDiv>
    );
}

const BtnDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

  button {
    width: 100%;
    padding: 10px;
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    background-color: #DFE0DF;
    color: #716f6f;
    font-size: 10px;
    
  &:hover{
    transform: scale(1.01);
    background-color: #FECD55;
    color: black;
    }
  }
`;