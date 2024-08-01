import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import axios from "axios";
import useAuthStore from "../store";

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cookies, setCookie] = useCookies(['access', 'nickname']);
  const user = cookies.nickname;
  const token = cookies.access; // 인증 토큰 가져오기

  const { isAuthenticated } = useAuthStore(state => ({
    isAuthenticated: state.isAuthenticated,
  }));

  useEffect(() => {
    if (!isAuthenticated) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`https://obspital.shop/board/mypage/${user}/`, {
          headers: {
            Authorization: `Bearer ${token}` // 인증 헤더 추가
          }
        });
        setProfile(response.data);
      } catch (error) {
        setError('Error fetching profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, user, token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <p>프로필 컴포넌트 실험 중</p>
      <div className="profile-container">
        <h1>{profile.nickname}'s Profile</h1>
        <p>리뷰 수: {profile.comments_count}</p>
        <p>평균평점: {profile.star_average} 점</p>
    </div>
    </>
  );
}
