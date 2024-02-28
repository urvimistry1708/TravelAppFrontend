import React from "react";
import "./FreeCancel.css";
import { useFilter } from "../../../context";

interface FreeCancelProps {}

export const FreeCancel: React.FC<FreeCancelProps> = () => {
  const { filterDispatch, isCancelable } = useFilter();

  const handleCancelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    filterDispatch({
      type: "CANCELABLE",
      payload: event.target.checked,
    });
  };

  return (
    <div className="filter-container">
      <div className="d-flex align-center gap-larger">
        <span className="filter-label">Free Cancellation</span>
        <label className="slide">
          <input
            type="checkbox"
            onChange={handleCancelChange}
            checked={isCancelable}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};
