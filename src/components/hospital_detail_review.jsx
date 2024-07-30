import styled from "styled-components";
import ReviewEle from "./reviewele";

export default function HospitalDetailReview() {
  return (
    <ReviewComponentWrapper>
        <ReviewWrapper>
            <ReviewEle/>
            <ReviewEle/>
            <ReviewEle/>
            <ReviewEle/>
            <ReviewEle/>
            <ReviewEle/>
        </ReviewWrapper>
    </ReviewComponentWrapper>
  );
}

const ReviewComponentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 100vw;
`;

const ReviewWrapper = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, minmax(200px, auto));
    gap: 30px;
`;