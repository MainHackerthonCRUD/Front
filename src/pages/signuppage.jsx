import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputBox } from "./loginpage";
import api from "../api";

export default function SignupPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [nickname, setNickname] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const handlePassword1Change = (e) => {
    setPassword1(e.target.value);
  }
  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
  }
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  }

  const signupOK = async (e) => {
    e.preventDefault();

    const userdata = {
      username: username,
      email: email,
      password1: password1,
      password2: password2,
      nickname: nickname
    }
    try {
      const response = await api.post("/dj/registration/", userdata);
      alert('회원가입 성공');
      navigate('/login');
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('응답 데이터:', error.response.data);
        console.error('응답 상태 코드:', error.response.status);
        console.error('응답 헤더:', error.response.headers);
      } else if (error.request) {
        console.error('요청:', error.request);
      } else {
        console.error('에러 메시지:', error.message);
      }
      return error;
    }
  }

  return (
    <SignupDiv>
      <h2>회원가입</h2>
      <form onSubmit={signupOK}>
        <InputBox placeholder="아이디" value={username} name="username" onChange={handleUsernameChange}/>
        <InputBox placeholder="이메일" type="email" value={email} name="email" onChange={handleEmailChange}/>
        <InputBox placeholder="비밀번호" type="password" value={password1} name="password1" onChange={handlePassword1Change}/>
        <InputBox placeholder="비밀번호 확인" type="password" value={password2} name="password2" onChange={handlePassword2Change}/>
        <InputBox placeholder="닉네임" value={nickname} name="nickname" onChange={handleNicknameChange}/>
        <button type="submit">확인</button>
      </form>
      <a href="/login">로그인</a>
    </SignupDiv>
  );
}

const SignupDiv = styled.div`
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
  margin: 80px;

  button {
    width: 260px;
    height: 35px;
    background-color: #FECD55; 
    border-style: none;
    border-radius: 10px;
    padding: 0 10px;
  }

  form {
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

