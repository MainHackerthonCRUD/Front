import styled from 'styled-components';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
    <ErrorElement>
        <h1>오류가 발생했어요!</h1>
        <h2>{error.statusText || error.message}</h2>
    </ErrorElement>
  );
}

const ErrorElement = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    height: 300px;
`;