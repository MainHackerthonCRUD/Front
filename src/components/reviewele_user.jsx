import { ReviewElement, PostContent, PostTitle, PostInfo, PostText } from "./reviewele_hospital";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import api from "../api";
import DeleteButton from "./review_delete";
import { MyPost } from "./reviewele_hospital";
import { StarRating } from "./countingstar";
import { MyEditButton } from "./mypage_review_edit";

export default function UReviewEle() {

    const [myReviews, setMyReviews] = useState([]);
    const {pk} = useParams();
    const [cookies, setCookie] = useCookies(['access', 'nickname']);
    let user = cookies.nickname;
    let token = cookies.access;

    const fetchMyReviews = async () => {
        try {
            const res = await api.get(`board/mypage/${user}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setMyReviews(res.data.comments);
            console.log(res.data);
        } catch (error) {
            console.error('error', error);
        }
    }

    useEffect(() => {
        fetchMyReviews();
    }, []);

    return (
    <>
        {myReviews.map((review) => (
            <ReviewElement key={review.id}>
            <PostContent>
                <PostTitle>{review.title}</PostTitle>
                <PostTitle>{review.id}</PostTitle>
                <MyPost>                        
                    <DeleteButton/>
                    <MyEditButton postid={review.id}/>
                </MyPost>
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
                </PostText>
            </PostContent>
        </ReviewElement>  
    ))}
    </>
      );
  }