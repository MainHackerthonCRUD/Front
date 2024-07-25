import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function MainWrite(){
    const navigate = useNavigate();
    const handleWriteClick = () => {
        navigate("/writereview");
    };

    return(
        <WriteButtonContainer>
            
        <ORText>OR</ORText>

        <ReviewButton onClick = {() => handleWriteClick()}>바로 리뷰쓰기 </ReviewButton>
        </WriteButtonContainer>

    );

}

const WriteButtonContainer = styled.div`
    align-items: center;
    margin: 20px;
    text-align: center;

    `

const ReviewButton = styled.button`

    width: 200px;
    height: 80px;
    cursor: pointer;
    border: none;
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
    }
    
`

const DividerContainer = styled.div`
    margin: 40px 0;

`

const ORText = styled.p`
    font-weight: 600;
    font-size: 25px;
    margin : 10px 0 20px;
`