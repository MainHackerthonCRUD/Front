import styled from 'styled-components';
export default function Nav() {
  return (
    <NavWapper>
        <a href="/">Home</a>
        <a href="/login">login</a>
        <a href="/signup">signup</a>
    </NavWapper>
  );
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