import api from "../api";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../store";
import { ReviewBoxWrapper, InfoForm, InputTitle, InputBody, SubmitButton } from "../pages/review_write_page";
import CountingStars from "./countingstar";
import { useCookies } from "react-cookie";

export default function EditPage () {

  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(['access']);
  let auth = cookies.access;

  const { hospitalid, postid } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [rewriteData, setRewriteData] = useState(
    {
      title:"",
      body:"",
      star:"",
    });

  useEffect(() => {
    const GetPost = async () => {
        try {
            const res = await api.get(`/board/review/${hospitalid}/${postid}`);
            setPost(res.data);
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

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(rewriteData); // 로그 추가
  try {
    const res = await api.put(`/board/review/${hospitalid}/${postid}`, rewriteData, {
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
        <h2>리뷰 수정</h2>
        <InfoForm onSubmit={handleSubmit}>
            <InputTitle placeholder="직접 제목 입력" name="title" value={rewriteData.title} onChange={handlePostChange} />
            <InputBody placeholder="리뷰 작성" name="body" value={rewriteData.body} onChange={handlePostChange} />
            <CountingStars value={rewriteData.star} onChange={handlePostChange}></CountingStars>
            <SubmitButton type="submit">작성</SubmitButton>
        </InfoForm>
        </ReviewBoxWrapper>
    </div>
  );
}

export function EditButton() {

  const navigate = useNavigate();
  const {hospitalid, postid} = useParams();

  const navToEdit = () => {
    navigate(`/edit/${hospitalid}/${postid}`);
  }
  return (
    <div>
      <span onClick={() => navToEdit()}>수정</span>
    </div>
  )
}
