import React from "react";
import { useFilter } from "../../../context";

const ratings: string[] = ["1", "2", "3", "4", "5"];

interface RatingsProps {}

export const Ratings: React.FC<RatingsProps> = () => {
  const { filterDispatch } = useFilter();

  const handleRatingsClick = (rating: string) => {
    filterDispatch({
      type: "RATING",
      payload: rating,
    });
  };

  return (
    <div className="filter-container">
      <span className="filter-label">Ratings</span>
      <div className="d-flex align-center gap">
        {ratings.map((rating) => (
          <span
            className="span-label aminity-count star d-flex align-center justify-center cursor-pointer on-hover"
            key={rating}
            onClick={() => handleRatingsClick(rating)}
          >
            {rating} &Up
          </span>
        ))}
      </div>
    </div>
  );
};
