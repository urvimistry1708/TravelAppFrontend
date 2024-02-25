import axios from "axios";
import { useEffect, useState } from "react";
import "./Categories.css";
import { useCategory } from "../../context";

export const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [numberOfCategories, setnumberOfCategories] = useState(0);
    const { hotelCategory, setHotelCategory } = useCategory();


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
    }
    console.log(hotelCategory);

    return (
        <div className="categories-container">
            <section className="categories align-center d-flex gap-large cursor-pointer">
                {numberOfCategories >= 10 ? (
                    <button className="cursor-pointer" onClick={handleShowMoreLeftClick}>
                        <span className="material-icons-outlined">chevron_left</span>
                    </button>
                ) :
                    (<button className="display-none"></button>)
                }

                {
                    categories && categories.map(({ _id, category }) =>
                        <span className={`${category === hotelCategory ? "border-bottom" : ""}`} key={_id} onClick={() => { handleCategoryClick(category) }}>{category}</span>)
                }

                {
                    numberOfCategories - 10 < categories.length ? (
                        <button className="cursor-pointer" onClick={handleShowMoreRightClick}>
                            <span className="material-icons-outlined">chevron_right</span>
                        </button>

                    )
                        :
                        (<button className="display-none"></button>)
                }

            </section>
        </div>
    );
};