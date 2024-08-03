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
          <ProfileFont>리뷰 수: {profile.comments_count}</ProfileFont>
          <ProfileFont>평균평점: {profile.star_average} 점</ProfileFont>
        </ComponentContainer>
      </ProfileContainer>
    </>
  );
}
  
const ProfileContainer = styled.div`
  display: flex;
  background-color: #ececec;
  border-radius: 5px;
  height: 240px;
  width: 500px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  align-items: center; /* Center vertically */
`;

const NicknameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FECD55;
  border-radius: 10px;
  margin-left: 10px;
  margin-right: 40px;
  padding: 30px;
  height: 80px;
  flex: 1;
`;

const NicknameFont = styled.h1`
  color: black;
  font-size: 24px;
  font-weight: bold;
`;

const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 2;
`;

const ProfileFont = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin: 5px 0;
`;
