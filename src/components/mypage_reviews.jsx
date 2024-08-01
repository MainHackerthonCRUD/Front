import styled from "styled-components";
import { ReviewComponentWrapper } from "./hospital_detail_review";
import UReviewEle from "./reviewele_user";

export default function MypageReviews() {
  return (
    <ReviewComponentWrapper>
        <MyRevieswWrapper>
            <UReviewEle/>
            <UReviewEle/>
            <UReviewEle/>
            <UReviewEle/>
            <UReviewEle/>
            <UReviewEle/>
            <UReviewEle/>
            <UReviewEle/>
        </MyRevieswWrapper>
    </ReviewComponentWrapper>
  )
}

const MyRevieswWrapper = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, minmax(200px, auto));
    gap: 30px;
`;