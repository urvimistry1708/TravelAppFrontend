import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useFilter } from "../../../context";

const minDifference = 500;

function valuetext(value: number) {
  return `${value}`;
}

export const PriceRange: React.FC = () => {
  const { priceRange, filterDispatch } = useFilter();

  console.log({ priceRange });

  const handlePriceChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      filterDispatch({
        type: "MINIMUM_PRICE",
        payload: {
          newValue,
          priceRange,
          minDifference,
        },
      });
    } else {
      filterDispatch({
        type: "MAXIMUM_PRICE",
        payload: {
          newValue,
          priceRange,
          minDifference,
        },
      });
    }
  };

  return (
    <div className="filter-container">
      <span className="filter-label">Price Range</span>
      <Box>
        <Slider
          sx={{ color: "#ff6525" }}
          getAriaLabel={() => "Minimum Difference"}
          value={priceRange}
          valueLabelDisplay="on"
          getAriaValueText={valuetext}
          onChange={handlePriceChange}
          min={100}
          max={25000}
          disableSwap
        />
      </Box>
    </div>
  );
};
