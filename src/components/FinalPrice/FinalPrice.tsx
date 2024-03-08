import React, { ChangeEvent, useEffect, useState } from "react";
import "./FinalPrice.css";
import { useDate, useAuth } from "../../context";
import { DateSelector } from "../DateSelector/DateSelector";
import { useNavigate } from "react-router-dom";

interface SingleHotel {
  _id: string;
  price: number;
  rating: number;
}

export const FinalPrice: React.FC<{ singleHotel: SingleHotel }> = ({ singleHotel }) => {
  const { _id, price, rating } = singleHotel;
  const [guestsState,setGuestsState]=useState(0);

  const navigate = useNavigate();

  const { guests, dateDispatch, checkInDate, checkOutDate } = useDate();


  const { authDispatch } = useAuth();

  useEffect(()=>{

    guests && setGuestsState(guests);
  },[])

  const handleGuestChange = (event: ChangeEvent<HTMLInputElement>) => { 
    const value = parseInt(event.target.value, 10);
    setGuestsState(value)
    dateDispatch({
      type: "GUESTS",
      payload: value,
    });
  };

  const handleReserveClick = () => {

    const token=localStorage.getItem("token");
    console.log("In reserve")
    if (!checkInDate) {
      
      console.log( "Select a Check-in Date")
    } else if (!checkOutDate) {
      
      console.log("Select a Check-out Date")
    } else if (guests < 1) {
      
      console.log("Add number of guests")
    } else if (token) {
      console.log("Booking")
      navigate(`/confirm-booking/stay/${_id}`);
    } else {
      authDispatch({
        type: "SHOW_AUTH_MODAL"
      })
    }
  };

  return (
    <div className="price-details-container d-flex direction-column gap shadow">
      <div className="price-rating d-flex align-center justify-space-between">
        <p>
          <span className="fs-bold fs-large">Rs. {price}</span> night
        </p>
        <span className="rating d-flex align-center">
          <span className="material-icons-outlined">star</span>
          <span>{rating}</span>
        </span>
      </div>
      <div className="d-flex direction-column">
        <div className="grid-container-two-col selected-dates">
          <div className="checkin loc-container">
            <label className="label">Check in</label>
            <DateSelector checkInType="in" placeholder={""}  />
          </div>
          <div className="checkin loc-container">
            <label className="label">Check Out</label>
            <DateSelector checkInType="out" placeholder={""} />
          </div>
        </div>
        <div className="guests gutter-sm">
          <p>GUESTS</p>
         
            <input
              className="guest-count-input"
              type="text"
              placeholder="Add Guests"
              value={guestsState}
              onChange={handleGuestChange}
            />
          
        </div>
      </div>
      <div>
        <button
          className="button btn-reserve btn-primary cursor"
          onClick={handleReserveClick}
        >
          Reserve
        </button>
      </div>
      <div className="price-distribution d-flex direction-column">
        <div className="final-price d-flex align-center justify-space-between">
          <span className="span">Rs. {price} x 2 nights</span>
          <span className="span">Rs. {price * 2}</span>
        </div>
        <div className="final-price d-flex align-center justify-space-between">
          <span className="span">Service fee</span>
          <span className="span">Rs. 200</span>
        </div>
        <div className="final-price d-flex align-center justify-space-between">
          <span className="span">Total</span>
          <span className="span">Rs. {price * 2 + 200}</span>
        </div>
      </div>
    </div>
  );
};
