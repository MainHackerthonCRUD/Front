import styled from "styled-components";
import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import useAuthStore from "../store";
import CountingStars from "../components/countingstar";

export default function WriteNewReview() {
    const [cookies, setCookie] = useCookies(['access', 'nickname']);
    const { isAuthenticated } = useAuthStore();
    let auth = cookies.access;
    
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [star, setStar] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState('');

    useEffect(() => {
        if (!isAuthenticated) {
            alert('리뷰를 쓰려면 로그인을 하세요!');
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setSelectedTitle('');
    }
    const handleSelectTitleChange = (e) => {
        setSelectedTitle(e.target.value);
        setTitle(e.target.value);
    }
    const handleBodyChange = (e) => {
        setBody(e.target.value);
    }
    const handleStarChange = (newStar) => {
        setStar(newStar);
    }

    const WriteReview = async (e) => {
        e.preventDefault()

        const data = { title, body, star }
        //밑에 링크 나중에 수정 -- 병원 id에 맞게
        try {
            const res = await api.post("/board/1/comment/", data, {
                headers: {
                    Authorization: `Bearer ${auth}`,
                    'Content-Type': 'application/json'
                }
            });
            alert('후기를 올렸습니다.');
            navigate('/'); //나중에 링크 변경
            console.log(res.data);
            return res.data;
        } catch (error) {
            if (error.response) {
              console.error('응답 데이터:', error.response.data);
              console.error('응답 상태 코드:', error.response.status);
              console.error('응답 헤더:', error.response.headers);
            } else if (error.request) {
              console.error('요청:', error.request);
            } else {
              console.error('에러 메시지:', error.message);
            }
            return error;
        }
    }

    const titleOptions = [
        '최고예요',
        '좋아요',
        '만족했어요',
        '그냥 그래요',
        '별로예요',
        '다시는 이용하지 않을 거예요'
    ];

  return (
    <div>
        <ReviewBoxWrapper>
        <h2>리뷰작성</h2>
        <InfoForm onSubmit={WriteReview}>
            <SelectTitle value={selectedTitle} onChange={handleSelectTitleChange}>
                <option value="">제목을 선택하세요</option>
                    {titleOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
            </SelectTitle>
            <InputTitle placeholder="직접 제목 입력" onChange={handleTitleChange} value={title}/>
            <InputBody placeholder="리뷰 작성" onChange={handleBodyChange} value={body}/>
            <CountingStars value={star} onChange={handleStarChange}></CountingStars>
            <SubmitButton type="submit">작성</SubmitButton>
        </InfoForm>
        </ReviewBoxWrapper>
    </div>
  )
}

export const ReviewBoxWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 15px;
    width: 80vw;
    max-width: 650px;
    gap: 10px;
    background-color: #f7f7f7;
    border-radius: 20px;
    padding: 20px 20px 20px 20px;
`;

export const InfoForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

export const InputTitle = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    font-size: 16px;    
    outline: none;
`;

const SelectTitle = styled.select`
    width: 100%;
    padding: 10px;
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    font-size: 16px;
    outline: none;

    option {
        color: ${({ disabled }) => (disabled ? 'gray' : '#000')};
    }
`;

export const InputBody = styled.textarea`
    width: 100%;
    height: 70px;
    padding: 10px;
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    font-size: 16px;    
    outline: none;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  background-color: #DFE0DF;
  color: #716f6f;
  font-weight: 550;
  font-size: 16px;
    
  &:hover{
    transform: scale(1.01);
    background-color: #FECD55;
    color: black;
    }
`;

