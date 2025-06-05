import React, { useState } from "react";

type StarRatingProps = {
  maxRating: number;
  rating: number;
  onRatingChange: (rating: number) => void;
};

export const StarRating: React.FC<StarRatingProps> = ({
  maxRating,
  rating,
  onRatingChange,
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleClick = (newRating: number) => {
    onRatingChange(newRating);
  };

  const handleMouseEnter = (newRating: number) => {
    setHoverRating(newRating);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const renderStar = (index: number) => {
    const currentRating = hoverRating !== null ? hoverRating : rating;
    const isFilled = currentRating >= index;
    const isHalfFilled = currentRating >= index - 0.5 && currentRating < index;

    return (
      <span
        key={index}
        className={`cursor-pointer text-[32px] sm:text-[48px] w-10 sm:w-14  ${
          isFilled
            ? "text-yellow-500"
            : isHalfFilled
            ? "text-yellow-300"
            : "text-gray-300"
        }`}
        onClick={() => handleClick(index)}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
      >
        {isHalfFilled ? "½" : "★"}
      </span>
    );
  };

  return (
    <div className="flex ">
      {Array.from({ length: maxRating }, (_, i) => renderStar(i + 1))}
    </div>
  );
};
