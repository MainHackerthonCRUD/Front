import styled from "styled-components";

export default function HReviewEle() {
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

export const ReviewElement = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 20px;
    align-items: center;
    background-color: aliceblue;
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
    background: linear-gradient(to right, transparent, aliceblue 30%);
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
