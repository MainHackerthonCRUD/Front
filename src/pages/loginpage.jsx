import styled from "styled-components";
import api from "../api";
import useStore from '../store';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {

  const navigate = useNavigate();
  const {isLogined, setIsLogined} = useStore(state => state);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  const loginOK = async () => {

    const user = {id: username, pw: password}
    try {
      const response = await api.post("/dj/login", user);
      console(response.data);
      setIsLogined(true); //로그인 상태관리
      sessionStorage.setItem("access", response.data.access);
      sessionStorage.setItem("nickname", response.data.user.nickname);
      alert('로그인 되었습니다.')
      navigate('/');
      return response.data;
    } catch (error) {
      console.log(error);
      alert('로그인 실패!')
      return error;
    }
  }

    return (
      <LoginDiv>
      <h2>로그인</h2>
      <div>
      <InputBox type="id" name="id" placeholder="아이디" value={username} onChange={handleUsernameChange}/>
      <InputBox type="password" name="password" placeholder="비밀번호" value={password} onChange={handlePasswordChange}/>
      </div>
      <button onClick={loginOK}>확인</button>
      <a href="/signup">회원가입</a>
      </LoginDiv>
    );
  }

  const LoginDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background-color: #ececec;
    width: 500px;
    height: 50%;
    padding: 30px;
    border-radius: 10px;

    button {
      width: 280px;
      height: 35px;
      background-color: #FECD55; 
      border-style: none;
      border-radius: 10px;
      padding: 0 10px;
    }

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5px;
    }

    a {
      font-size: 13px;
    }
  `;

  const InputBox = styled.input`
    height: 35px;
    width: 260px;
    border-style: none;
    border-radius: 10px;
    padding-left: 20px;
  `

