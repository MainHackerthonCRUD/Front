import styled from "styled-components";
import ReviewEle from "../components/reviewele";
import MypageReviews from "../components/mypage_reviews";

// 여기서도 컴포넌트로 불러오는걸로 합시당
export default function MyPage() {
  return (
    <MypageWrapper>
        <p>여기엔 나중에 유저데이터 컴포넌트로 불러옵니다</p>
        <MypageReviews/>
    </MypageWrapper>
  )
}

const MypageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;