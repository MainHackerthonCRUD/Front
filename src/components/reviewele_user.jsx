import { ReviewElement, PostContent, PostTitle, PostInfo, PostText, GoButton, ToDetailPost } from "./reviewele_hospital";

export default function UReviewEle() {
    return (
      <ReviewElement>
          <PostContent>
              <PostTitle>title</PostTitle>
          </PostContent>
          <PostInfo>
              <span>nickname</span>
              <span>created_at</span>
              <span>star</span>
          </PostInfo>
          <PostContent>                    
              <PostText lines={5}>
                  작은 연못에서 시작된 길
                  바다로 바다로 갈 수 있음 좋겠네
                  어쩌면 그 험한 길에 지칠지 몰라
                  걸어도 걸어도 더딘 발걸음에
                  너 가는 길이 너무 지치고 힘들 때
                  말을 해줘 숨기지 마 넌 혼자가 아니야
                  우리도 언젠가 흰수염고래처럼 헤엄쳐
                  두려움 없이 이 넓은 세상 살아갈 수 있길
                  그런 사람이길
                  더 상처 받지 마 이젠 울지마 웃어봐
                  너 가는 길이 너무 지치고 힘들 때
                  말을 해줘 숨기지 마 넌 혼자가 아니야
                  우리도 언젠가 흰수염고래처럼 헤엄쳐
                  두려움 없이 이 넓은 세상 살아갈 수 있길
                  그런 사람이길
                  그런 사람이길
                  <ToDetailPost href="/"/> 
                  {/*위 링크는 리뷰 디테일(개별) api 되면 바꾸기*/}
              </PostText>
          </PostContent>
          <GoButton><a href="/">자세히보기</a></GoButton>
      </ReviewElement>  
      );
  }