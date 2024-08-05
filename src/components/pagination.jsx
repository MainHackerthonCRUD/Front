import {useState} from 'react';
import styled from 'styled-components';

export default function Pagination({ total, limit, page, setPage }) {
    const [btnActive, setBtnActive] = useState("");
    const PageNums = Math.ceil(total / limit);

    const handlePageBtn = (e, i) => {
        setPage(i + 1);
        setBtnActive(e.target.value);
    };

    return (
    <div>
        <PageWrapper>
            <PageBtn onClick={() => setPage(page - 1)} disabled={page===1}></PageBtn>
            {Array(PageNums)
                .fll()
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
            <PageBtn onClick={() => setPage(page + 1)} disabled={page===PageNums}></PageBtn>
        </PageWrapper>
    </div>
  );
}

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const PageBtn = styled.button`
    width: 100px;
`;

