import styled from "styled-components";
import SearchBox from "./mainsearch";

export default function HomePage() {

    return (
      <>
      <p>HOME: JSON 랜더링</p>
      <br/>
      <Logo> 마다닥! </Logo>
      <SearchBox/>
      </>
    );
  }  

const Logo  = styled.h1`
  color : #FFAA00
`
  