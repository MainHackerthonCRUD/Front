import { Outlet } from 'react-router-dom';
import './index.css';
import styled from 'styled-components';
import Nav from './components/nav';
import { CookiesProvider } from 'react-cookie';


const App = () => {
  return (
    <>
    <CookiesProvider>
      <Nav/>
      <PageWrapper>
        <Outlet />
      </PageWrapper>
    </CookiesProvider>
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
    max-width: 100vw;
`;