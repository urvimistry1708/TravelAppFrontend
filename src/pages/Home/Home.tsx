import { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import { Navbar, HotelCard, SearchStayWithDate, AuthModal } from "../../components";
import { Categories } from "../../components/Categories/Categories";
import { useCategory, useDate, useFilter, useAuth } from "../../context";
import { Filter } from "../../components/Filters/Filter";

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

export const Home = () => {
  const [hasMore, setHasMore] = useState(true);
  const { hotelCategory } = useCategory();
  const { isSearchModalOpen } = useDate();
  const {
    isFilterModalOpen,
    priceRange,
    noOfBathrooms,
    noOfBeds,
    noOfBedrooms,
    propertyType,
    traveloRating,
    isCancelable
  } = useFilter();

  //const [hotelToShow, setHotelsToShow] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(16);
  const [testData, setTestData] = useState([]);

  const [hotels, setHotels] = useState<Hotel[]>([]);

  const { isAuthModalOpen } = useAuth();
  

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://lazy-gold-codfish-tam.cyclic.app/api/hotels?category=${hotelCategory}`
        );
        console.log("Data" + data.length);
        setTestData(data);
        setHotels(data ? data.slice(0, 16) : []);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [hotelCategory]);

  const fetchMoreData = () => {
    if (hotels.length >= testData.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      if (hotels && hotels.length > 0) {
        setHotels(
          hotels.concat(testData.slice(currentIndex, currentIndex + 16))
        );
        setCurrentIndex((prev) => prev + 16);
      } else {
        setHotels([]);
      }
    }, 1000);
  };

   const filteredHotelsByPrice =  hotels.filter(
    (hotel) => hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
  );

  const filterHotelsByRoomsAndBeds = filteredHotelsByPrice.filter(
    ({ numberOfBathrooms, numberOfBeds, numberOfBedrooms }) =>
      numberOfBathrooms === noOfBathrooms ||
      numberOfBedrooms === noOfBedrooms ||
      numberOfBeds === noOfBeds
  );

  const filterHotelsByPropertyType= propertyType === "Any" ? hotels :  filterHotelsByRoomsAndBeds.filter(
    hotel=>hotel.propertyType == propertyType
  )

  const filterHotelsByRatings =filterHotelsByPropertyType.filter(
    hotel=> hotel.rating >= traveloRating
  )

  const filterHotels= filterHotelsByRatings.filter(
    hotel=>hotel.isCancelable === isCancelable
  )
  return (
    <div>
      <Navbar />

      <Categories />
      <main className="main d-flex align-center wrap gap-larger">
        {hotels && hotels.length > 0 ? (
          <InfiniteScroll
            dataLength={hotels.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              hotels.length > 0 && <h3 className="loading">Loading...</h3>
            }
            endMessage={<p className="loading">You have seen it all.</p>}
          >
            <main className="main d-flex align-center wrap gap-larger">
              {filterHotels &&
                filterHotels.map((hotel) => (
                  <HotelCard key={hotel._id} hotel={hotel} />
                ))}
            </main>
          </InfiniteScroll>
        ) : (
          <main className="no-data center-content">No Data!</main>
        )}
      </main>
      {isSearchModalOpen && <SearchStayWithDate />}
      {isFilterModalOpen && <Filter />}
      {isAuthModalOpen && <AuthModal />}
     
    </div>
  );
};
