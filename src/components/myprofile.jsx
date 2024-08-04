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
      <ProfileContainer>
        <NicknameContainer>
          <NicknameFont>{profile.nickname}</NicknameFont>
        </NicknameContainer>
  
        <ComponentContainer>
          <ProfileFont>작성한 리뷰: {profile.comments_count}개</ProfileFont>
          <ProfileFont>평균 평점: {profile.star_average}점</ProfileFont>
        </ComponentContainer>
      </ProfileContainer>
    </>
  );
}
  
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0e7;
  border-radius: 10px;
  height: auto;
  width: 80%;
  padding: 30px;
  margin: 20px auto;
`;

const NicknameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FECD55;
  border-radius: 10px;
  padding: 20px 40px;
  margin-bottom: 20px;
`;

const NicknameFont = styled.h1`
  color: black;
  font-size: 28px;
  font-weight: bold;
`;

const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ProfileFont = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin: 10px 0;
  color: #333;
`;