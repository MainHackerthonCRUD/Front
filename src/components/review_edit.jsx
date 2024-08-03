import styled from "styled-components";
import api from "../api";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReviewBoxWrapper, InfoForm, InputTitle, InputBody, SubmitButton } from "../pages/review_write_page";
import CountingStars from "./countingstar";
import { useCookies } from "react-cookie";
import PropTypes from 'prop-types';

export default function EditPage () {

  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(['access']);
  let auth = cookies.access;

  const { hospitalid, postid } = useParams();
  const [hospital_name, setHospital_name] = useState("");
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [rewriteData, setRewriteData] = useState(
    {
      title:"",
      body:"",
      star:0,
    });

  useEffect(() => {
    const GetPost = async () => {
        try {
            const res = await api.get(`/board/review/${hospitalid}/${postid}`);
            setPost(res.data);
            setHospital_name(res.data.hospital_name);
            setRewriteData({
              title: res.data.title,
              body: res.data.body,
              star: res.data.star,
            })
            console.log(res.data);
        } catch (error) {
            setError(error.message);
        }
    };
    GetPost();
}, [hospitalid, postid]);

const handlePostChange = (e) => {
  setRewriteData({...rewriteData, [e.target.name]: e.target.value});
};

const handleStarChange = (newStar) => {
  setRewriteData({ ...rewriteData, star: newStar });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(rewriteData); // 로그 추가
  try {
    const res = await api.put(`/board/review/${hospitalid}/${postid}/`, rewriteData, {
    headers: {
        Authorization: `Bearer ${auth}`,
        'Content-Type': 'application/json'
    }
    });
    alert('리뷰 수정을 성공했습니다.');
    console.log(res.data);
    navigate(-1); //어디로 가야하지? 일단 뒤로..
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div>
        <ReviewBoxWrapper>
        <HostpitalName href={`/hospital/${hospital_name}`}>{hospital_name}</HostpitalName>
        <InfoForm onSubmit={handleSubmit}>
            <InputTitle placeholder="직접 제목 입력" name="title" value={rewriteData.title} onChange={handlePostChange} />
            <InputBody placeholder="리뷰 작성" name="body" value={rewriteData.body} onChange={handlePostChange} />
            <CountingStars value={rewriteData.star} onChange={handleStarChange}></CountingStars>
            <SubmitButton type="submit">작성</SubmitButton>
        </InfoForm>
        </ReviewBoxWrapper>
    </div>
  );
}

export function EditButton({hospitalid, postid}) {

  const navigate = useNavigate();

  const navToEdit = () => {
    navigate(`/edit/${hospitalid}/${postid}`);
  }
  return (
    <div>
      <span onClick={() => navToEdit()}>수정</span>
    </div>
  );
}

EditButton.propTypes = {
  hospitalid: PropTypes.string.isRequired,
  postid: PropTypes.string.isRequired,
};

export const HostpitalName = styled.a`
  font-size: 24px;
  font-weight: 600;
  color: black;    
  text-decoration-line: none;
  padding: 0 10px 0 0;
  margin-bottom: 15px;

  &:hover {
    color:  #FFAA00;
  }
`;