import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function WritePost({ hospitalId }) {
    const navigate = useNavigate();
    const handleWriteClick = () => {
        navigate(`/review/write/${hospitalId}`);
    };

    return(
        <WriteButtonContainer>
        <ReviewButton onClick = {() => handleWriteClick()}>바로 리뷰쓰기 </ReviewButton>
        </WriteButtonContainer>
    );

}

const WriteButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 20px 0px 30px 0px;
`;

const ReviewButton = styled.button`

    width: 650px;
    height: 80px;
    cursor: pointer;
    border: none;
    margin: 10px;
    border-radius: 10px;
    background-color: #fece55d6;
    color: black;
    font-size: 20px;
    font-weight: 500;

    transition: transform 0.2s;
    &:hover{
        transform: scale(1.02);
        background-color: #FECD55;
        color: black;
        font-weight: 800;
    }
    
`;

const DividerContainer = styled.div`
    margin: 40px 0;

`
