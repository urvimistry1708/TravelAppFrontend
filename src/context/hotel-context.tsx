import React, { createContext, useContext, useState, ReactNode } from "react";

interface SingleHotel {
  image: string;
  name: string;
  address: string;
  city: string;
  state: string;
  rating: number;
  price: number;
}

interface HotelData extends SingleHotel {
  orderId: string;
  payment_id: string;
  checkInDate: string;
  checkOutDate: string;
  totalPayableAmount: number;
}

interface HotelContextType {
  hotel: HotelData;
  setHotel: React.Dispatch<React.SetStateAction<HotelData>>;
}

const initialState: HotelData = {
  image: "",
  name: "",
  address: "",
  city:"",
  state: "",
  rating: 0,
  price: 0,
  orderId: "",
  payment_id: "",
  checkInDate: "",
  checkOutDate: "",
  totalPayableAmount: 0,
};

const HotelContext = createContext<HotelContextType>({
  hotel: initialState,
  setHotel: () => {},
});

interface HotelProviderProps {
  children: ReactNode;
}

const HotelProvider: React.FC<HotelProviderProps> = ({ children }) => {
  const [hotel, setHotel] = useState<HotelData>(initialState);

  return (
    <HotelContext.Provider value={{ hotel, setHotel }}>
      {children}
    </HotelContext.Provider>
  );
};

const useHotel = () => useContext(HotelContext);

export { useHotel, HotelProvider };
