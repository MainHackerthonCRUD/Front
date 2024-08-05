import {useState} from 'react';
import styled from 'styled-components';

export default function Pagination({ total, limit, page, setPage}) {
    const [btnActive, setBtnActive] = useState("");
    const PageNums = Math.ceil(total / limit);

    const handlePageBtn = (e, i) => {
        setPage(i + 1);
        setBtnActive(e.target.value);
    };

    return (
    <div>
        <PageWrapper>
            <BtnWrapper>
            <PageBtn onClick={() => setPage(page - 1)} disabled={page===1}>
                prev
            </PageBtn>
            {Array(PageNums)
                .fill()
                .map((_, i) => (
                    <PageBtn 
                    value={i}
                    key={i + 1}
                    className={i === btnActive ? "active":""}
                    onClick={(e) => handlePageBtn(e, i)}
                    aria-current={page === i + 1 ? "page":null}>
                        {i + 1}
                    </PageBtn>
                ))
            }
            <PageBtn onClick={() => setPage(page + 1)} disabled={page===PageNums}>
                next
            </PageBtn>
            </BtnWrapper>
        </PageWrapper>
    </div>
  );
}

const PageWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const BtnWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

const PageBtn = styled.button`
    width: 100px;
    padding: 10px;
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    background-color: #DFE0DF;
    color: #716f6f;
    font-size: 10px;
    
  &:hover{
    transform: scale(1.01);
    background-color: #FECD55;
    color: black;
    }
`;

