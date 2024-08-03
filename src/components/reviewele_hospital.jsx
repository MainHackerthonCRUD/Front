import styled from "styled-components";
import { useState, useEffect } from "react";
import api from "../api";
import { StarRating } from "./countingstar";
import { useCookies } from 'react-cookie';
import DeleteButton, {DeleteConfirm} from "./review_delete";
import { EditButton } from "./review_edit";
import GoBackButton from "./gobackbutton";

export default function HReviewEle({ hospitalId, onReviewStatusChange }) {

    const [reviews, setReviews] = useState([]);
    const [deletingReviewId, setDeletingReviewId] = useState(null);

    const [cookies, setCookie] = useCookies(['nickname', 'access']);
    let currentUserNickname = cookies.nickname;
    let token = cookies.access;

    const getReviews = async () => {
        if (!hospitalId) return;
        try {
            const res = await api.get(`board/${hospitalId}/commentget/`)
            setReviews(res.data);
            onReviewStatusChange(res.data.length === 0);
        } catch (error) {
            console.error('error', error);
        }
    }

    useEffect(() => {
        console.log("hospitalId changed:", hospitalId);
        getReviews();
    }, [hospitalId]);

    const handleDelete = (id) => {
        setDeletingReviewId(id);
    };

    const handleDeleteOk = async () => {
        try {
            const res = await api.delete(`/board/review/${hospitalId}/${deletingReviewId}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log(res.data);
            alert('리뷰를 삭제하였습니다.');
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    const handleCancelDelete = () => {
        setDeletingReviewId(null);
      };

  return (
    <>
    {reviews.length === 0 ? (
        <NoReview>
            <h3>아직 작성된 리뷰가 없습니다.</h3>
            <div>
                <GoBackButton/>
            </div>
        </NoReview>
    ) : (
        reviews.map((review) => (
            <ReviewElement key={review.id}>
            <PostContent>
                <PostTitle>{review.title}</PostTitle>
                {currentUserNickname === review.nickname &&
                (
                    <MyPost>                        
                        <DeleteButton onDelete={() => handleDelete(review.id)}/>
                        <EditButton hospitalid={hospitalId} postid={review.id}/>
                    </MyPost>
                )}
            </PostContent>
            <PostInfo>
                <StarRating rating={review.star}/>
            </PostInfo>
            <PostInfo>
                <span>{review.nickname}</span>
                <span>{review.created_at}</span>
            </PostInfo>
            <PostContent>                    
                <PostText lines={5}>
                    {review.body}
                    <ToDetailPost href={`/${hospitalId}/${review.id}`}/> 
                </PostText>
            </PostContent>
            {deletingReviewId === review.id && (
                <DeleteConfirm
                  onConfirm={handleDeleteOk}
                  onCancel={handleCancelDelete}
                />
            )}
            <GoButton>
                <a href={`/${hospitalId}/${review.id}`}>
                자세히보기
                </a>
            </GoButton>
        </ReviewElement>  
        ))
    )}
    </>
    );
}

export const NoReview = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    gap: 10px;

    div {
        width: 350px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const NoReviwMSG = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ReviewElement = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    align-items: center;
    background-color: #f7f7f7;
    border-radius: 10px;
    gap: 10px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
`;

export const PostInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
`;

export const PostContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
`;

export const PostTitle = styled.h3`
    font-size: 20px;
`;

export const PostText = styled.span`
    display: block;
    max-height: ${props => props.lines * 1.5}em;
    line-height: 1.5em;
    word-break: break-all;
    overflow: hidden;
    position: relative;
    padding-right: 0em;
`;

export const ToDetailPost = styled.a`
    position: absolute;
    right: 0;
    bottom: 0;
    width: 1em;
    height: 1.5em;
    background: linear-gradient(to right, transparent, #f7f7f7 30%);
    padding-left: 0.2em;
    text-decoration: none;
    color: inherit;
    
    &::after {
        content: '...';
    }

    &:hover {
        color: gray;
    }
`;

export const GoButton = styled.button`
    width: 100%;
    height: 35px;
    background-color: #FECD55; 
    border-style: none;
    border-radius: 10px;
    padding: 0 10px;

    transition: transform 0.2s;

    &:hover{
        transform: scale(1.05);
        background-color: #FECD55;
        color: black;
        }  

    a {
        color: black;
        text-decoration-line: none;
    }
`;

export const MyPost = styled.div`
    display: flex;
    flex-direction: row-reverse;
    gap: 5px;
`;