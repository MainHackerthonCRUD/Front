import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import styled from "styled-components";

// 고민.. 병원에 대해 댓글식으로 존재할거라면 리뷰 상세 조회 페이지의 필요가 있는가?
export default function ReviewDetail() {
    // const { postid } = useParams();
    // const [detail, setDetail] = useState(null);
    // const [error, setError] = useState(null);

    // // useEffect(() => {
    //     const Detail = async () => {
    //         try {
    //             const res = await api.get(`/board/home/${postid}`);
    //             setDetail(res.data);
    //         } catch (error) {
    //             setError(error.message);
    //         }
    //     };
    //     Detail();
    // }, [postid]);

    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    // if (!detail) {
    //     return <div>Loading...</div>;
    // }

    // return (
    //     <div>
    //         <ReviewPageWrapper>
    //         <h2>리뷰상세</h2>
    //         <ReviewItemWrapper>
    //             <h3>{detail.user}</h3>
    //             <div>
    //             <InfoHospital>{detail.hospital_name}</InfoHospital>
    //             <InfoHospital>{detail.region}</InfoHospital>
    //             </div>
    //             <p>{detail.textbox}</p>
    //         </ReviewItemWrapper>
    //         </ReviewPageWrapper>
    //     </div>
    // );

    return (
        <div>
            <ReviewPageWrapper>
                <h2>리뷰 상세</h2>
                <ReviewItemWrapper>
                    <h3>병원 이름|detail.title</h3>
                </ReviewItemWrapper>
                <ReviewItemWrapper>
                    <div>
                        <InfoHospital>detail.star</InfoHospital>
                    </div>
                    <div>
                        <InfoHospital>detail.nickname</InfoHospital>
                        <InfoHospital>detail.created_at</InfoHospital>
                    </div>
                    <p>detail.body</p>
                </ReviewItemWrapper>
            </ReviewPageWrapper>
        </div>
    );
}

const ReviewPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 15px;
    width: 80vw;
    max-width: 650px;
    gap: 10px;
    background-color: #f7f7f7;
    border-radius: 10px;
    padding: 20px 20px 20px 20px;

    h2 {
        margin-bottom: 30px;
    }
`

const ReviewItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid #d9d9d9;
  width: 100%;
  height: auto;

  h3 {
    margin-bottom: 5px;
  }

  div {
    display: flex;
    gap: 10px;
  }
`;

const InfoHospital = styled.span`
  font-size : 13px;
`;
