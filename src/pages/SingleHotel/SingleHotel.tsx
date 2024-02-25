import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FinalPrice,
  HotelDetails,
  HotelImages,
  Navbar,
} from "../../components";
import "./SingleHotel.css";

interface SingleHotelData {
  name: string;
  state: string;
  hostName: string;
  hostJoinedOn: string;
  numberOfBathrooms: number;
  numberOfBeds: number;
  numberOfguest: number;
  numberOfBedrooms: number;
  image: string;
  imageArr: string[];
  _id: string;
  price: number;
  rating: number;
}

export const SingleHotel: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [singleHotel, setSingleHotel] = useState<SingleHotelData | null>(null);

  useEffect(() => {
    const fetchSingleHotel = async () => {
      try {
        const { data } = await axios.get<SingleHotelData>(
          `https://lazy-gold-codfish-tam.cyclic.app/api/hotels/${id}`
        );
        setSingleHotel(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSingleHotel();

    // Clean-up function to cancel ongoing requests
    return () => {
      // Cleanup code if needed
    };
  }, [id]);

  if (!singleHotel) return null;

  const { name, state } = singleHotel;

  return (
    <div className="relative">
      <Navbar />
      <main className="single-hotel-page">
        <p className="hotel-name-add">
          {name}, {state}
        </p>
        <HotelImages singleHotel={singleHotel} />
        <div className="d-flex">
          <HotelDetails singleHotel={singleHotel} />
          <FinalPrice singleHotel={singleHotel} />
        </div>
      </main>
    </div>
  );
};
