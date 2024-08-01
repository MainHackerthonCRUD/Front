import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import styled from "styled-components";
import { StarRating } from "../components/countingstar";
import GoBackButton from "../components/gobackbutton";
import DeleteButton from "../components/review_delete";
import { EditButton } from "../components/review_edit";
import { useCookies } from 'react-cookie';

export default function ReviewDetail() {
    const { hospitalid, postid } = useParams();
    const [detail, setDetail] = useState(null);
    const [error, setError] = useState(null);

    const [cookies, setCookie] = useCookies(['nickname']);
    let currentUserNickname = cookies.nickname;

    useEffect(() => {
        const GetDetail = async () => {
            try {
                const res = await api.get(`/board/review/${hospitalid}/${postid}`);
                setDetail(res.data);
            } catch (error) {
                setError(error.message);
            }
        };
        GetDetail();
    }, [hospitalid, postid]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!detail) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <ReviewPageWrapper>
                <ReviewItemWrapper>
                    <h3>{detail.title}</h3>
                    <ReviewModDiv>
                        <StarRating rating={detail.star}/>
                        {currentUserNickname === detail.nickname &&
                        (
                            <div>
                                <DeleteButton/>
                                <EditButton/>
                            </div>
                        )}
                    </ReviewModDiv>
                </ReviewItemWrapper>
                <ReviewItemWrapper>
                    <div>
                        <InfoHospital>{detail.nickname}</InfoHospital>
                        <InfoHospital>{detail.created_at}</InfoHospital>
                    </div>
                    <div>
                    </div>
                    <p>{detail.body}</p>
                </ReviewItemWrapper>
            </ReviewPageWrapper>
            <GoBackButton/>
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
    margin-bottom: 5px;
  }
`;

const InfoHospital = styled.span`
  font-size : 15px;
`;

const ReviewModDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
`;