import axios from "axios";
import { useEffect, useState } from "react";
import "./Categories.css";
import { useCategory, useFilter } from "../../context";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [numberOfCategories, setnumberOfCategories] = useState(0);
  const { hotelCategory, setHotelCategory } = useCategory();

  const { filterDispatch } = useFilter();

  const handleFilterClick = () => {
    filterDispatch({
      type: "SHOW_FILTER_MODAL",
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://lazy-gold-codfish-tam.cyclic.app/api/category"
        );
        const categoriesToShow = data.slice(
          numberOfCategories,
          numberOfCategories + 10
        );
        setCategories(categoriesToShow);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [numberOfCategories]);

  const handleShowMoreRightClick = () => {
    setnumberOfCategories((prev) => prev + 10);
  };

  const handleShowMoreLeftClick = () => {
    setnumberOfCategories((prev) => prev - 10);
  };

  const handleCategoryClick = (category: string) => {
    setHotelCategory(category);
  };
  console.log(hotelCategory);

  return (
    <div className="categories-container">
      <section className="categories align-center d-flex gap-large cursor-pointer">
        {numberOfCategories >= 10 ? (
          <button className="left-right" onClick={handleShowMoreLeftClick}>
            <span className="material-icons-outlined">chevron_left</span>
          </button>
        ) : (
          <button className="display-none"></button>
        )}

        {categories &&
          categories.map(({ _id, category }) => (
            <span
              className={`${category === hotelCategory ? "border-bottom" : ""}`}
              key={_id}
              onClick={() => {
                handleCategoryClick(category);
              }}
            >
              {category}
            </span>
          ))}

        {numberOfCategories - 10 < categories.length ? (
          <button className="left-right" onClick={handleShowMoreRightClick}>
            <span className="material-icons-outlined">chevron_right</span>
          </button>
        ) : (
          <button className="display-none"></button>
        )}
        <div>
          <button
            className="button btn-filter d-flex align-center gap-small cursor-pointer"
            onClick={handleFilterClick}
          >
            <span className="material-icons-outlined">filter_alt</span>
            <span>Filter</span>
          </button>
        </div>
      </section>
    </div>
  );
};
