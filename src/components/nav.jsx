import styled from 'styled-components';
import useAuthStore from '../store';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

export default function Nav() {
  const { logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['access', 'nickname']);
  let user = cookies.nickname;

  const handleLogout = () => {
    logout(removeCookie);
    removeCookie('access', { path: '/' });
    removeCookie('nickname', { path: '/' });
    alert('로그아웃 되었습니다.')
    navigate("/");
  }

  if (!isAuthenticated) {
    return (
      <NavWapper>
          <a href="/">Home</a>
          <a href="/login">login</a>
          <a href="/signup">signup</a>
      </NavWapper>
    );
  } else {
    return (
      <NavWapper>
          <a href="/">Home</a>
          <a onClick={handleLogout}>logout</a>
          <p>hello, {user}</p>
      </NavWapper>
    );
  }
}

const NavWapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
    background-color: #ffffff;
    margin-bottom: 30px;
    a {
      color: #FECD55;
    }
`;