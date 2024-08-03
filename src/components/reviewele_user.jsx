import { ReviewElement, PostContent, PostTitle, PostInfo, PostText } from "./reviewele_hospital";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import api from "../api";
import { MyPost } from "./reviewele_hospital";
import { StarRating } from "./countingstar";
import { MyEditButton } from "./mypage_review_edit";
import MypageReviewDelete from "./mypage_review_delete";
import { DeleteConfirm } from "./review_delete";

export default function UReviewEle() {

    const [myReviews, setMyReviews] = useState([]);
    const [deletingReviewId, setDeletingReviewId] = useState(null);
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

    const handleDelete = (id) => {
        setDeletingReviewId(id);
    };

    const handleDeleteOk = async () => {
        try {
            const res = await api.delete(`/board/reviewdelete/${deletingReviewId}/`, {
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
        {myReviews.map((review) => (
            <ReviewElement key={review.id}>
            <PostContent>
            <PostTitle>{review.hospital_name}</PostTitle>
                <PostTitle>{review.title}</PostTitle>
                <MyPost>                        
                    <MypageReviewDelete onDelete={() => handleDelete(review.id)}/>
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
            {deletingReviewId === review.id && (
            <DeleteConfirm
              onConfirm={handleDeleteOk}
              onCancel={handleCancelDelete}
            />
          )}
        </ReviewElement>  
    ))}
    </>
      );
  }