import styled from "styled-components";
import HReviewEle from "./reviewele_hospital";

export default function HospitalDetailReview({ hospitalId }) {
  return (
    <ComponentOuterDiv>
          <ReviewComponentWrapper>
        <h2>리뷰 목록</h2>
        <ReviewWrapper>
            <HReviewEle hospitalId={hospitalId}/>
        </ReviewWrapper>
    </ReviewComponentWrapper>
    </ComponentOuterDiv>
  );
}

export const ComponentOuterDiv = styled.div`
  background-color: #DFDFDF;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
`;

export const ReviewComponentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    gap: 20px;
    padding: 0px 40px 40px 40px;
`;

const ReviewWrapper = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, minmax(320px, 1fr));
    grid-template-rows: repeat(3,auto);
    gap: 30px;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(220px, 1fr)); /* 화면이 좁아지면 2열로 변경 */
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr; /* 화면이 더 좁아지면 1열로 변경 */
  }
`;
