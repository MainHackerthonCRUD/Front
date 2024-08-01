import styled from "styled-components";
import api from "../api";
import useAuthStore from "../store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { SubmitForm, SubmitButton, LinkToOtherpage, SpanMSG, SpanVar } from "./signuppage";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useAuthStore();
  const [cookies, setCookie] = useCookies(['access', 'nickname', 'usernum']);

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  const loginOK = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const user = {username: username, email: '', password: password}
    try {
      const response = await api.post("/dj/login/", user);
      console.log(response.data);
      login(setCookie);
      setCookie('access', response.data.access, { path: '/' }); // 쿠키에 access 토큰 저장
      setCookie('nickname', response.data.user.nickname, { path: '/' }); // 쿠키에 닉네임 저장
      setCookie('pk', response.data.user.id, {path: '/'}); // 유저 아이디 저장 - 리뷰
      alert('로그인 되었습니다.')
      navigate('/');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response?.data?.message || '아이디 또는 비밀번호가 틀렸습니다.');
    } finally {
      setIsLoading(false);
    }
  }

    return (
      <LoginDiv>
      <h2>로그인</h2>
      <SubmitForm onSubmit={loginOK}>
        <div>
          <InputBox id="username" type="text" name="id" placeholder="아이디" value={username} onChange={handleUsernameChange} autoComplete="username"/>
          <InputBox id="password" type="password" name="password" placeholder="비밀번호" value={password} onChange={handlePasswordChange} autoComplete="current-password"/>
        </div>
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? '...' : '확인'}
        </SubmitButton>
      </SubmitForm>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <LinkToOtherpage>
        <SpanMSG>가입을 안하셨나요?</SpanMSG>
        <SpanVar>|</SpanVar>
        <a href="/signup">회원가입</a>
      </LinkToOtherpage>
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
    margin: 0px;
    
    a {
      font-size: 13px;
    }
  `;

  export const InputBox = styled.input`
    height: 35px;
    width: 260px;
    border-style: none;
    border-radius: 10px;
    padding-left: 20px;
  `;

  const ErrorMessage = styled.p`
    color: #da0000;
    font-size: 14px;
  `;

