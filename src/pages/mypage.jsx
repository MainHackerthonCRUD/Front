import styled from "styled-components";
import ReviewEle from "../components/reviewele_hospital";
import MypageReviews from "../components/mypage_reviews";
import UserProfile from "../components/myprofile";

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
  width: 100%;
  gap: 10px;
`;