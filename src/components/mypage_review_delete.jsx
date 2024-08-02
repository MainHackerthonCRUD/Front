import { useState } from "react";
import PropTypes from 'prop-types';
import { DeleteConfirm } from "./review_delete";

export default function MypageReviewDelete({onDelete}) {
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

MypageReviewDelete.propTypes = {
  onDelete: PropTypes.func.isRequired,
};