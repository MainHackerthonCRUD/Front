import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaRegStar, FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';

const CountingStars = ({ val = 0, onChange }) => {
  const [rating, setRating] = useState(val);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    setRating(val);
  }, [val]);

  const handleMouseEnter = (index) => {
    setHoverRating(index);
  };
  const handleMouseLeave = () => {
    setHoverRating(0);
  };
  const handleClick = (index) => {
    setRating(index);
    if (onChange) onChange(index);
  };

  return (
    <DivWrapper>
      <StarTitle>별점</StarTitle>
      <div>
        <StarWrapper>
          {[1, 2, 3, 4, 5].map((index) => (
            <StarIcon
              key={index}
              isFilled={index <= (hoverRating || rating)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(index)}
            >
              {index <= (hoverRating || rating) ? <FaStar /> : <FaRegStar />}
            </StarIcon>
          ))}
        </StarWrapper>
        <span>{rating}점</span>
      </div>
    </DivWrapper>
  );
};

CountingStars.propTypes = {
  val: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default CountingStars;

export const StarRating = ({ rating }) => {
  return (
      <StarRatingWrapper>
          {[...Array(5)].map((star, index) => {
              const starIndex = index + 1;
              return (
                  <span key={index}>
                    {starIndex <= rating ? 
                    (<FaStar size={20} color="#ffc107" />) 
                    : 
                    (<FaRegStar size={20} color="#e4e5e9" />)}
                  </span>
              );
          })}
      </StarRatingWrapper>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

const DivWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #d9d9d9;
  width: 100%;
  padding: 10px;
  background-color: white;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;

    span {
      margin-left: 5px;
      font-weight: 600;
      padding: 10px;
    }
  }
`;

const StarTitle = styled.span`
  color:grey;
`;

const StarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StarIcon = styled.div`
  cursor: pointer;
  color: ${props => (props.isFilled ? '#ffc107' : '#e4e5e9')};
  font-size: 24px;
`;

const StarRatingWrapper = styled.div`
  display: flex;
  gap: 5px;
  
  span {
    color: ${props => (props.isFilled ? '#ffc107' : '#e4e5e9')};
  }
`;