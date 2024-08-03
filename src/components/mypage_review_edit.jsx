import api from "../api";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReviewBoxWrapper, InfoForm, InputTitle, InputBody, SubmitButton } from "../pages/review_write_page";
import CountingStars from "./countingstar";
import { useCookies } from "react-cookie";
import { HostpitalName } from "./review_edit";

export default function MypageReviewEdit() {
    const navigate = useNavigate();

    const [cookies, setCookie] = useCookies(['access']);
    let auth = cookies.access;
  
    const { postid } = useParams();
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
              const res = await api.get(`/board/review/${postid}`);
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
  }, [postid]);
  
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
      const res = await api.put(`/board/reviewput/${postid}/`, rewriteData, {
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


export function MyEditButton({postid}) {

    const navigate = useNavigate();
  
    const navToMyEdit = () => {
      navigate(`/myedit/${postid}`);
    }
    return (
      <div>
        <span onClick={() => navToMyEdit()}>수정</span>
      </div>
    )
  }
