import styled from "styled-components";
import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import useAuthStore from "../store";
import axios from "axios";

export default function UserProfile(){
const { nickname } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cookies, setCookie, removeCookie] = useCookies(['access', 'nickname']);
  let user = cookies.nickname;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`https://obspital.shop/board/mypage/${user}/`);
        setProfile(response.data);
      } catch (error) {
        setError('Error fetching profile');
      } finally {
        setLoading(false);
      }
    };

        fetchProfile();
    }, [nickname]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    
    return(
        <>
        <p>프로필컴포넌트 실험중</p>
        <div className="profile-container">
      <h1>{profile.nickname}'s Profile</h1>
      <p>Number of Comments: {profile.comments_count}</p>
      <p>Average Rating: {profile.star_average} stars</p>
      <div className="comments">
        {profile.comments.map(comment => (
          <div key={comment.id} className="comment">
            <h3>{comment.title}</h3>
            <p>{comment.body}</p>
            <p>Rating: {comment.star} stars</p>
            <p>Date: {comment.created_at}</p>
          </div>
        ))}
      </div>
    </div>
    </>
    );
}