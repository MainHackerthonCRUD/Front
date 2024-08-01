import styled from "styled-components";
import HReviewEle from "./reviewele_hospital";

export default function HospitalDetailReview() {
  return (
    <ReviewComponentWrapper>
        <h2>리뷰 목록</h2>
        <ReviewWrapper>
            <HReviewEle/>
        </ReviewWrapper>
    </ReviewComponentWrapper>
  );
}

export const ReviewComponentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 650px;
    margin-top: 50px;
    gap: 20px;
`;

const ReviewWrapper = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, minmax(200px, auto));
    gap: 30px;
`;
