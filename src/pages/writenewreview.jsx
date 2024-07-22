import styled from "styled-components";
import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function WriteNewReview() {
    const [cookies, setCookie] = useCookies(['access', 'nickname']);
    let auth = cookies.access;

    const navigate = useNavigate();
    const [hospital_name, setHospitalName] = useState(''); //이걸 수정해서 연결된 산부인과 이름이 자동으로 들어가게 고치기
    const [region, setRegion] = useState(''); //위와 동일
    const [ob, setOb] = useState('O');
    const [textbox, setTextBox] = useState('');

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
        <h2>리뷰작성</h2>
        <ReviewBoxWrapper>
        <InfoForm onSubmit={WriteReview}>
            <InputInfo placeholder="병원명" onChange={handleHospitalnameChange}></InputInfo>
            <InputInfo placeholder="지역(구)" onChange={handleRegionChange}></InputInfo>
            <h4>분만여부</h4>
            <div>
                <input type="radio" id="yes" name="ob" value="O" checked onChange={handleObChange}/>
                <label htmlFor="yes">분만O</label>
            </div>
            <div>
                <input type="radio" id="no" name="ob" value="X" onChange={handleObChange}/>
                <label htmlFor="no">분만X</label>
            </div>
            <InputComment placeholder="리뷰 작성" onChange={handleTextBoxChange}></InputComment>
            <button type="submit">작성</button>
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

const ObForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;

    input {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 10px;
    }

    div {
        display: flex;
        flex-direction: row;
        gap: 10px;
    }
    
`

const InputComment = styled.input`
    width: 100%;
    height: 70px;
    padding: 10px;
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    font-size: 16px;    
    outline: none;
`;

