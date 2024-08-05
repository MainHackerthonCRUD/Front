import styled from "styled-components";
import { ReviewComponentWrapper } from "./hospital_detail_review";
import UReviewEle from "./reviewele_user";
import { useState } from "react";
import Pagination from "./pagination";

export default function MypageReviews() {

  const [total, setTotal] = useState();
  const [limit, setLimit] = useState(null);
  const [page, setPage] = useState();
  const [reviewlenght, setReviewlenght] = useState(null);

  return (
    <MyOuterDiv>
      <h2>내가 쓴 리뷰</h2>
      <ReviewComponentWrapper>
        <MyRevieswWrapper>
            <UReviewEle limit={limit} setPage={setPage} page={page} total={total}/>
        </MyRevieswWrapper>
    </ReviewComponentWrapper>
    </MyOuterDiv>
  )
}

const MyOuterDiv = styled.div`
  background-color:#f0f0f0e7;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    padding-top: 20px;
  }
`;

const MyRevieswWrapper = styled.div`
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