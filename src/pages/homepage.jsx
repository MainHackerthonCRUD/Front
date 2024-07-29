import styled from "styled-components";
import SearchBox from "./mainsearch";
import RegionBox from "./regionbutton";
import MainWrite from "./mainwrite_button";

export default function HomePage() {

    return (
      <>
      <MainContainer>
      
      <LogoSentence>빠르게 산부인과를 가야할 때</LogoSentence>
      <Logo> 마다닥 </Logo>
      <SearchBox/>
      <RegionBox/>
      <MainWrite/>
      </MainContainer>
      </>
    );
  }  

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    height: 60vh;
    margin: 130px;
    margin-top: 80px;
`


const LogoSentence = styled.p`
  color : #7d7c7c;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Logo  = styled.h1`
  color : #FFAA00;
  font-size: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`
  