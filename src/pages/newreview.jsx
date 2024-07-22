import styled from "styled-components";

export default function NewReview() {
  return (
    <div>
        <ReviewPageWrapper>
            <h2>리뷰 작성</h2>
            <p>로그인을 해야 리뷰를 작성할 수 있어요!</p>
            <a href="/login"><button>로그인하기</button></a>
            <a href="/writereview"><button>리뷰 작성하기</button></a>
        </ReviewPageWrapper>
    </div>
  )
}

const ReviewPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    margin: 30px;
    padding: 80px;
    border-radius: 15px;
    background-color: gray;

    button {
        width: 300px;
        height: 40px;
        border: none;
        border-radius: 5px;

        &:hover {
            background-color: #FFAA00;
            color: white;
        }
    }
`;


