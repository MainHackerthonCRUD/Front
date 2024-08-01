import styled from "styled-components";
import { useState, useEffect } from "react";
import api from "../api";
import { useParams } from "react-router-dom";
import { StarRating } from "./coutingstar";

export default function HReviewEle() {

    const [reviews, setReviews] = useState([]);
    const {hospitalid} = useParams();

    const getReviews = async () => {
        try {
            // 아래 hospital_id는 나중에 useParam으로 바꾸기
            const res = await api.get(`board/1/commentget/`)
            setReviews(res.data);
            console.log(res.data);
        } catch (error) {
            console.error('error', error);
        }
    }

    useEffect(() => {
        getReviews();
    }, []);

  return (
    <>
    {reviews.map((review) => (
        <ReviewElement key={review.id}>
        <PostContent>
            <PostTitle>{review.title}</PostTitle>
            <PostTitle>{review.id}</PostTitle>
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
                <ToDetailPost href={`/1/${review.id}`}/> 
                {/*위 링크는 병원 상세 되면 바꾸기*/}
            </PostText>
        </PostContent>
        <GoButton>
            <a href={`/1/${review.id}`}>
            자세히보기
            </a>
        </GoButton>
    </ReviewElement>  
    ))}
    </>
    );
}

export const ReviewElement = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 20px;
    align-items: center;
    background-color: #f7f7f7;
    border-radius: 10px;
    gap: 10px;
    width: 100%;
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