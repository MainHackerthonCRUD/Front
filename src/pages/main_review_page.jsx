import HospitalSearch from "../components/mainwrite_search_hospital";
import WriteNewReview from "./review_write_page";
import styled from "styled-components";
import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import useAuthStore from "../store";
import CountingStars from "../components/countingstar";
import { ReviewBoxWrapper, InfoForm, InputTitle, InputBody, SubmitButton, SelectTitle } from "../pages/review_write_page";


export default function MainNewReview() {
    
    const [hospitalid, setHospitalId] = useState(null);
    const [hospitalName, setHospitalName] = useState("");

    return (
        <ReviewBoxWrapper>
            <h2>리뷰작성</h2>
            <HospitalSearch setHospitalId={setHospitalId} setHospitalName={setHospitalName}/>
            <HospitalNameWrapper>
                <p>병원명: {hospitalName}</p>
            </HospitalNameWrapper>
            <MainWriteReview hospitalid={hospitalid}/>
        </ReviewBoxWrapper>
    )
}

const HospitalNameWrapper = styled.div`
    width: 100%;
    padding: 10px;
    border: 1px solid #d9d9d9;
    background-color: #FFF;
    border-radius: 3px;
    font-size: 16px;    
    outline: none;
    margin-top: 10px;
    font-weight: 700;
`;

export function MainWriteReview({hospitalid}) {
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
        try {
            const res = await api.post(`/board/${hospitalid}/comment/`, data, {
                headers: {
                    Authorization: `Bearer ${auth}`,
                    'Content-Type': 'application/json'
                }
            });
            alert('후기를 올렸습니다.');
            navigate(-1);
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
        <BoxWrapper>
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
        </BoxWrapper>
    </div>
  );
}

const BoxWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 15px;
    width: 80vw;
    max-width: 650px;
    gap: 10px;
    background-color: #f7f7f7;
    border-radius: 20px;
    padding: 0px 20px 20px 20px;
`;


