import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateSelector.css";
import { useDate } from "../../context";

interface DateSelectorProps {
  placeholder: string;
  checkInType: string;
}

 export const DateSelector: React.FC<DateSelectorProps> = ({ placeholder, checkInType }) => {
  const { checkInDate, checkOutDate, dateDispatch } = useDate();

  const handleDateChange = (date: Date | null) => {
    if (date) {
      dateDispatch({
        type: checkInType === "in" ? "CHECK_IN" : "CHECK_OUT",
        payload: date,
      });
    }
  };

  const handleDateFocus = () => {
    dateDispatch({
      type: "DATE_FOCUS",
    });
  };

  return (
    <DatePicker
      className="search-dest input"
      selected={checkInType === "in" ? checkInDate : checkOutDate}
      onChange={(date) => handleDateChange(date)}
      onFocus={handleDateFocus}
      dateFormat="dd/MM/yyyy"
      placeholderText={placeholder}
      minDate={new Date()}
      closeOnScroll={true}
    />
  );
};

export default DateSelector;
