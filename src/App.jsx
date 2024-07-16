import { Outlet } from 'react-router-dom';
import './index.css';
import styled from 'styled-components';
import Nav from './components/nav';

const App = () => {
  return (
    <>
    <Nav/>
    <PageWrapper>
      <Outlet />
    </PageWrapper>
    </>
  );
};

export default App;

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0 20px;
    min-height: 100vh;
`;