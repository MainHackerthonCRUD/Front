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
                <h2>리뷰상세</h2>
                <ReviewItemWrapper>
                    <h3>닉네임</h3>
                    <div>
                        <InfoHospital>병원이름</InfoHospital>
                        <InfoHospital>구</InfoHospital>
                    </div>
                    <p>리뷰텍스트어쩌구저쩌구</p>
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
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  width: 100%;
  gap: 10px;

  div {
    display: flex;
    gap: 10px;
  }
`;

const InfoHospital = styled.span`
  font-size : 13px;
`;
