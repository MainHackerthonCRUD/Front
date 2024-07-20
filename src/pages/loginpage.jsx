import styled from "styled-components";
import api from "../api";
import useAuthStore from "../store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useAuthStore();
  const [cookies, setCookie] = useCookies(['access', 'nickname']);

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
      setCookie('nickname', response.data.user.username, { path: '/' }); // 쿠키에 사용자 이름 저장
      alert('로그인 되었습니다.')
      navigate('/');
      return response.data;
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response?.data?.message || '로그인에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  }

    return (
      <LoginDiv>
      <h2>로그인</h2>
      <form onSubmit={loginOK}>
        <InputBox id="username" type="text" name="id" placeholder="아이디" value={username} onChange={handleUsernameChange} autoComplete="username"/>
        <InputBox id="password" type="password" name="password" placeholder="비밀번호" value={password} onChange={handlePasswordChange} autoComplete="current-password"/>
        <button type="submit" disabled={isLoading}>
          {isLoading ? '로그인 중...' : '확인'}
        </button>
      </form>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
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

  export const InputBox = styled.input`
    height: 35px;
    width: 260px;
    border-style: none;
    border-radius: 10px;
    padding-left: 20px;
  `;

  const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
  `;

