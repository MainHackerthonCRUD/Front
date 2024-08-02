import { useState } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';

export default function DeleteButton({onDelete}) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    onDelete();
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <div>
      <span onClick={handleDeleteClick}>삭제</span>
      {showConfirm && (
        <DeleteConfirm onConfirm={handleConfirm} onCancel={handleCancel} />
      )}
    </div>
  );
}

DeleteButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export function DeleteConfirm ({onConfirm, onCancel}) {
  return (
    <>
    <Overlay>
        <ConfirmBtnWrapper>
        <MsgWrapper>
        <h4>이 작업은 돌이킬 수 없습니다.</h4> 
        <h4>정말 삭제하시겠습니까?</h4>
        </MsgWrapper>
        <ButtonWrapper>
          <ConfirmButton onClick={onConfirm}>예</ConfirmButton>
          <ConfirmButton onClick={onCancel}>아니오</ConfirmButton>
        </ButtonWrapper>
      </ConfirmBtnWrapper>
    </Overlay>
    </>
  );
}

DeleteConfirm.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 어두운 그라데이션 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 모달이 다른 요소 위에 나타나도록 */
`;

const ConfirmBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fbfbfb;
  border-radius: 15px;
  padding: 20px;
  margin: 20px auto;
  width: 300px;
  height: 150px;
  box-shadow: 0px 0px 5px #d9d9d9;
  box-sizing: border-box;
`;

const MsgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const ConfirmButton = styled.button`
  background-color: #a7a7d7;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  span {
    font-size: 10px;
    }

  &:hover {
    background-color: #8c8cc7;
    }
`;