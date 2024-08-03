import styled from "styled-components";
import ReviewEle from "../components/reviewele_hospital";
import MypageReviews from "../components/mypage_reviews";
import UserProfile from "../components/myprofile";

// 여기서도 컴포넌트로 불러오는걸로 합시당
export default function MyPage() {
  return (
    <MypageWrapper>
        <UserProfile/>
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