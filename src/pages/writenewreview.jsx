import styled from "styled-components";
import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import useAuthStore from "../store";

export default function WriteNewReview() {
    const [cookies, setCookie] = useCookies(['access', 'nickname']);
    const { isAuthenticated } = useAuthStore();
    let auth = cookies.access;
    
    const navigate = useNavigate();
    const [hospital_name, setHospitalName] = useState(''); //이걸 수정해서 연결된 산부인과 이름이 자동으로 들어가게 고치기
    const [region, setRegion] = useState(''); //위와 동일
    const [ob, setOb] = useState('O');
    const [textbox, setTextBox] = useState('');

    useEffect(() => {
        if (!isAuthenticated) {
            alert('리뷰를 쓰려면 로그인을 하세요!');
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const handleHospitalnameChange = (e) => {
        setHospitalName(e.target.value);
    }
    const handleRegionChange = (e) => {
        setRegion(e.target.value);
    }
    const handleObChange = (e) => {
        setOb(e.target.value);
    }
    const handleTextBoxChange = (e) => {
        setTextBox(e.target.value);
    }

    const WriteReview = async (e) => {
        e.preventDefault()

        const data = { hospital_name, region, ob, textbox }

        try {
            const res = await api.post("/board/home/", data, {
                headers: {
                    Authorization: `Bearer ${auth}`,
                    'Content-Type': 'application/json'
                }
            });
            alert('후기를 올렸습니다.');
            navigate('/'); //나중에 게시글 목록으로 링크 변경
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

  return (
    <div>
        <ReviewBoxWrapper>
        <h2>리뷰작성</h2>
        <InfoForm onSubmit={WriteReview}>
            <InputInfo placeholder="병원명" onChange={handleHospitalnameChange}></InputInfo>
            <InputInfo list="regions" placeholder="지역(구)" onChange={handleRegionChange}/>
            <datalist id="regions">
                    <option value="종로구"></option>
                    <option value="중구"></option>
                    <option value="용산구"></option>
                    <option value="성동구"></option>
                    <option value="광진구"></option>
                    <option value="동대문구"></option>
                    <option value="중랑구"></option>
                    <option value="성북구"></option>
                    <option value="강북구"></option>
                    <option value="도봉구"></option>
                    <option value="노원구"></option>
                    <option value="은평구"></option>
                    <option value="서대문구"></option>
                    <option value="마포구"></option>
                    <option value="양천구"></option>
                    <option value="강서구"></option>
                    <option value="구로구"></option>
                    <option value="금천구"></option>
                    <option value="영등포구"></option>
                    <option value="동작구"></option>
                    <option value="관악구"></option>
                    <option value="서초구"></option>
                    <option value="강남구"></option>
                    <option value="송파구"></option>
                    <option value="강동구"></option>
                </datalist> 
            <ObContainer>
            <h4>분만여부</h4>
            <ObInnerContainer>
            <div>
                    <input type="radio" id="yes" name="ob" value="O" checked onChange={handleObChange}/>
                    <label htmlFor="yes">O</label>
                </div>
                <div>
                    <input type="radio" id="no" name="ob" value="X" onChange={handleObChange}/>
                    <label htmlFor="no">X</label>
                </div>
            </ObInnerContainer>
            </ObContainer>
            <InputComment placeholder="리뷰 작성" onChange={handleTextBoxChange}></InputComment>
            <SubmitButton type="submit">작성</SubmitButton>
        </InfoForm>
        </ReviewBoxWrapper>
    </div>
  )
}

const ReviewBoxWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 15px;
    width: 80vw;
    height: 80vh;
    gap: 10px;
    margin: 50px;
`;

const InputInfo = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    font-size: 16px;    
    outline: none;
`;

const InfoForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

const ObContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #d9d9d9;
    width: 100%;
    padding: 10px;
`;

const ObInnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-right: 20px;

    div {
        display: flex;
        flex-direction: row;
        gap: 5px;
    }
`;

const InputComment = styled.input`
    width: 100%;
    height: 70px;
    padding: 10px;
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    font-size: 16px;    
    outline: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  font-size: 16px;
  cursor: pointer;
  background-color: #f0f0f0;
  &:hover {
    background-color: #e0e0e0;
  }
`;

