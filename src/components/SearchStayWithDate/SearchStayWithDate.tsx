import React, { useEffect, useState } from "react";
import axios from "axios";
import { DateSelector } from "../DateSelector/DateSelector";
import "./SearchStayWithDate.css";
import { useDate, useCategory } from "../../context";
import { useNavigate } from "react-router-dom";

export const SearchStayWithDate: React.FC = () => {
  const [hotels, setHotels] = useState<any[]>([]);
  const { destination, guests, isSearchResultOpen, dateDispatch } = useDate();
  const { hotelCategory } = useCategory();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const { data } = await axios.get(
          `https://lazy-gold-codfish-tam.cyclic.app/api/hotels?category=${hotelCategory}`
        );
        setHotels(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchHotels();
  }, [hotelCategory]);

  const handleDestinationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dateDispatch({
      type: "DESTINATION",
      payload: event.target.value,
    });
  };

  const handleGuestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dateDispatch({
      type: "GUESTS",
      payload: event.target.value,
    });
  };

  const handleSearchResultClick = (address: string) => {
    dateDispatch({
      type: "DESTINATION",
      payload: address,
    });
  };

  const handleDestinationFocus = () => {
    dateDispatch({
      type: "SHOW_SEARCH_RESULT",
    });
  };

  const handleSearchButtonClick = () => {
    dateDispatch({
      type: "CLOSE_SEARCH_MODAL",
    });
    navigate(`/hotels/${destination}`);
  };

  const handleSearchCloseClick = () => {
    dateDispatch({
      type: "CLOSE_SEARCH_MODAL",
    });
  };

  const destinationOptions = hotels.filter(
    ({ address, city, state, country }) =>
      address.toLowerCase().includes(destination.toLowerCase()) ||
      city.toLowerCase().includes(destination.toLowerCase()) ||
      state.toLowerCase().includes(destination.toLowerCase()) ||
      country.toLowerCase().includes(destination.toLowerCase())
  );

  return (
    <div className="destination-container">
      <div className="destionation-options d-flex align-center absolute">
        <div className="location-container">
          <label className="label">Where</label>
          <input
            value={destination}
            onChange={handleDestinationChange}
            onFocus={handleDestinationFocus}
            className="input search-dest"
            placeholder="Search Destination"
            autoFocus
          />
        </div>
        <div className="location-container">
          <label className="label">Check in</label>
          <DateSelector placeholder="Select Date" checkInType="in" />
        </div>
        <div className="location-container">
          <label className="label">Check out</label>
          <DateSelector placeholder="Select Date" checkInType="out" />
        </div>
        <div className="location-container">
          <label className="label">No. of Guests</label>
          <input
            value={guests}
            className="input search-dest"
            placeholder="Add guests"
            onChange={handleGuestChange}
          />
        </div>
        <div
          className="search-container d-flex align-center cursor"
          onClick={handleSearchButtonClick}
        >
          <span className="material-icons-outlined">search</span>
          <span>Search</span>
        </div>
        <button className="button absolute close-search-dest"><span onClick={handleSearchCloseClick} className="highlight material-icons-outlined">
          highlight_off
        </span></button>
      </div>
      {isSearchResultOpen && (
        <div className="search-result-container absolute">
          {destinationOptions &&
            destinationOptions.map(({ address, city }) => (
              <p
                className="p cursor-pointer"
                key={address}
                onClick={() => handleSearchResultClick(address)}
              >
                {address}, {city}
              </p>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchStayWithDate;
