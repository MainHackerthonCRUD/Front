import styled from "styled-components";
import HReviewEle from "./reviewele_hospital";
import { useState } from "react";
import { NoReview } from "./reviewele_hospital";
import GoBackButton from "./gobackbutton";

export default function HospitalDetailReview({ hospitalId }) {

  const [noReviews, setNoReviews] = useState(false);

  const handleReviewStatusChange = (isEmpty) => {
    setNoReviews(isEmpty);
  };

  return (
    <ComponentOuterDiv>
      <ReviewComponentWrapper>
        {!noReviews && (
          <>
            <h2>리뷰 목록</h2>
            <ReviewWrapper>
              <HReviewEle hospitalId={hospitalId} onReviewStatusChange={handleReviewStatusChange} />
            </ReviewWrapper>
          </>
        )}
        {noReviews && (
          <>
          <NoReview>
            <h3>아직 작성된 리뷰가 없습니다.</h3>
            <div>
              <GoBackButton />
            </div>
          </NoReview>
          </>

        )}
    </ReviewComponentWrapper>
    </ComponentOuterDiv>
  );
}

export const ComponentOuterDiv = styled.div`
  background-color:#f0f0f0e7;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  border-radius: 10px;
  margin: 0 auto;
`;

export const ReviewComponentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    gap: 20px;
    padding: 20px 40px 40px 40px;
    height: auto;
`;

const ReviewWrapper = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, minmax(290px, 1fr));
    grid-template-rows: repeat(3,auto);
    gap: 30px;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(195px, 1fr)); /* 화면이 좁아지면 2열로 변경 */
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr; /* 화면이 더 좁아지면 1열로 변경 */
  }
`;
