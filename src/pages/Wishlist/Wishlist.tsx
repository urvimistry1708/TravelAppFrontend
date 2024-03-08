import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, HotelCard, ProfileDropDown, AuthModal } from "../../components";
import {  useAuth } from "../../context";
import "./Wishlist.css";
import axios from "axios";

export interface Hotel {
    _id: string;
    name: string;
    image: string;
    address: string;
    state: string;
    rating: number;
    price: number;
    numberOfBathrooms: number;
    numberOfBeds: number;
    numberOfBedrooms: number;
    propertyType: string;
    isCancelable:boolean;
  }
const Wishlist: React.FC = () => {
  // const { wishlist } = useWishlist();
  const [hotels, setHotels] = useState<Hotel[]>([]);

  const { isAuthModalOpen, isDropDownModalOpen } = useAuth();
  const navigate = useNavigate();

  const handleClickHereClick = () => {
    navigate("/");
  };

  useEffect(()=>{
    const fetchWishlist = async () => {
        try {
            const { data } = await axios.get<Hotel[]>(
              `https://lazy-gold-codfish-tam.cyclic.app/api/use`
            );
            setHotels(data);
          } catch (err) {
            console.log(err);
          }
        };
    
        fetchWishlist();
    
        // Clean-up function to cancel ongoing requests
        return () => {
          // Cleanup code if needed
        };
    const fetchSingleHotel = async () => {
        try {
          const { data } = await axios.get<Hotel[]>(
            `https://lazy-gold-codfish-tam.cyclic.app/api/hotels`
          );
          setHotels(data);
        } catch (err) {
          console.log(err);
        }
      };
  
      fetchSingleHotel();
  
      // Clean-up function to cancel ongoing requests
      return () => {
        // Cleanup code if needed
      };
  },[])

  return (
    <Fragment>
      <Navbar route="wishlist" />
      <h2 className="heading-2 d-flex justify-center">Your Wishlist</h2>
      {hotels.length > 0 ? (
        <section className="wishlist-page d-flex align-center wrap gap-larger">
          {hotels.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))}
        </section>
      ) : (
        <p className="d-flex justify-center">
          Wishlist Empty. &nbsp;<span className="click-here" onClick={handleClickHereClick}>Click here </span> &nbsp; to add to wishlist
        </p>
      )}
      {isDropDownModalOpen && <ProfileDropDown />}
      {isAuthModalOpen && <AuthModal />}
    </Fragment>
  );
};

export default Wishlist;
