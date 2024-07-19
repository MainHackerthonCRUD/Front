import styled from 'styled-components';
import useStore from '../store';
import { useNavigate } from "react-router-dom";

export default function Nav() {
  
  const {isLogined, setIsLogined} = useStore(state => state);
  const navigate = useNavigate();
  
  let user = sessionStorage.getItem('nickname');

  const handleLogout = () => {
    setIsLogined(false);
    sessionStorage.removeItem('access');
    sessionStorage.removeItem('nickname');
    alert('로그아웃 되었습니다.')
    navigate("/");
  }

  if (!isLogined) {
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