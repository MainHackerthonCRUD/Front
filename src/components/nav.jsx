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
        <div>
          <a href="/">Home</a>
          <a href="/login">login</a>
          <a href="/signup">signup</a>
        </div>
      </NavWapper>
    );
  } else {
    return (
      <NavWapper>
        <div>
          <a href="/">Home</a>
          <a onClick={handleLogout}>logout</a>
        </div>
        <a href='/mypage/:pk'>{user}</a>
      </NavWapper>
    );
  }
}

const NavWapper = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-width: 100vw;
    background-color: #ffffff;
    margin: 20px 30px 100px 30px;

    font-size:20px;
    font-weight: 500;
    a {
      color: #FECD55;
      text-decoration-line: none;
      padding: 0 10px 0 0;
      &:hover {
        color: #FFAA00;
      }
    }

    div {
      display: flex;
      flex-direction: row;
      gap: 10px;
    }

    span {
      color: #FFAA00;
    }

    p {
      color: #181818;
    }
`;