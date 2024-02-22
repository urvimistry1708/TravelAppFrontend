import React from 'react';
import "./HotelImages.css";

interface SingleHotel {
  image: string;
  imageArr: string[];
}

interface Props {
  singleHotel: SingleHotel;
}

export const HotelImages: React.FC<Props> = ({ singleHotel }) => {
  console.log(singleHotel);
  const { image, imageArr } = singleHotel;

  return (
    <div className="hotel-image-container d-flex gap-small">
      <div className="primary-image-container">
        <img className="primary-img" src={image} alt="hotel" />
      </div>
      <div className="d-flex wrap gap-small">
        {imageArr &&
          imageArr.map((image) => (
            <img
              key={image}
              className="hotel-img"
              src={image}
              alt="hotel"
            />
          ))}
      </div>
    </div>
  );
};

