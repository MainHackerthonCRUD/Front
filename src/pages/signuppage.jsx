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
        
        // 중복닉 에러 추가
        if (error.response.status === 400) {
        if (error.response.data.username && error.response.data.username.includes("A user with that username already exists.")) {
          alert('중복되는 닉네임입니다');
        } else {
          alert('회원가입 실패: ' + JSON.stringify(error.response.data));
        }
      }
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
      <SubmitForm onSubmit={signupOK}>
        <div>
          <InputBox placeholder="아이디" value={username} name="username" onChange={handleUsernameChange}/>
          <InputBox placeholder="이메일" type="email" value={email} name="email" onChange={handleEmailChange}/>
          <InputBox placeholder="비밀번호" type="password" value={password1} name="password1" onChange={handlePassword1Change}/>
          <InputBox placeholder="비밀번호 확인" type="password" value={password2} name="password2" onChange={handlePassword2Change}/>
          <InputBox placeholder="닉네임" value={nickname} name="nickname" onChange={handleNicknameChange}/>
        </div>
        <SubmitButton type="submit">확인</SubmitButton>
      </SubmitForm>
      <LinkToOtherpage>
        <SpanMSG>이미 가입하셨나요?</SpanMSG>
        <SpanVar>|</SpanVar>
        <a href="/login">로그인</a>
      </LinkToOtherpage>
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
  width: 650px;
  height: 70%;
  padding: 30px;
  border-radius: 10px;
  margin: 80px;
  margin-top: 0px;
`;

export const SubmitForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      margin-bottom: 10px;
    }
`;

export const SubmitButton = styled.button`
  width: 260px;
  height: 35px;
  background-color: #FECD55; 
  border-style: none;
  border-radius: 10px;
  padding: 0 10px;

  transition: transform 0.2s;

  &:hover{
    transform: scale(1.05);
    background-color: #FECD55;
    color: black;
    }
`;

export const LinkToOtherpage = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: center;
  align-items: center;

  a {
    font-size: 13px;
    font-weight: bold;
    text-decoration: none;
  }
`;

export const SpanMSG = styled.span`
  font-size: 13px;
  color: #434343;
  font-weight: 600;
`;

export const SpanVar = styled.span`
  font-size: 11px;
  color: #5f5f5f;
  font-weight: 800;
`;

