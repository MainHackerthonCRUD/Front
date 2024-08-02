import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import styled from "styled-components";

export default function DeleteButton() {

  const navigate = useNavigate();
  const {hospitalid, postid} = useParams();

  const navToDel = () => {
    navigate(`/del/:hospitalid/:postid`);
  }

  return (
    <div>
      <span onClick={() => navToDel()}>삭제</span>
    </div>
  )
}

export function DeleteConfirm ({onConfirm, onCancel}) {
  <>
  <h3>
    이 작업은 돌이킬 수 없습니다.
    정말 삭제하시겠습니까?    
  </h3> 
  <ConfirmBtnWrapper>
    <button onClick={onConfirm}>예</button>
    <button onClick={onCancel}>아니오</button>
  </ConfirmBtnWrapper>

  </>
}

const ConfirmBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fbfbfb;
  border-radius: 15px;
  padding: 20px;
  margin: 20px auto;
  width: 300px;
  height: 150px;
  box-shadow: 0px 0px 5px #d9d9d9;
  box-sizing: border-box;

  button {
    background-color: #a7a7d7;
    border: none;
    border-radius: 3px;
    padding: 5px 10px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;

    span {
      font-size: 10px;
    }

    &:hover {
      background-color: #8c8cc7;
    }
  }
`;