import React from "react";
import { useAuth, useDate, useFilter, useWishlist } from "../../context";
import { useNavigate } from "react-router-dom";

export const ProfileDropDown: React.FC = () => {
    const { authDispatch } = useAuth();
    const { dateDispatch } = useDate();
    const { filterDispatch } = useFilter();
    const { wishlistDispatch } = useWishlist();
    const navigate = useNavigate();

    const handleWishlistClick = () => {
        authDispatch({ type: "SHOW_DROP_DOWN_OPTIONS" });
        navigate("/wishlists");
    }

    const handleLogoutClick = () => {
        authDispatch({ type: "CLEAR_USER_DATA" });
        authDispatch({ type: "CLEAR_CREDENTIALS" });
        authDispatch({ type: "SHOW_DROP_DOWN_OPTIONS" });
        dateDispatch({ type: "CLEAR_INPUTS" });
        filterDispatch({ type: "CLEAR_ALL" });
        wishlistDispatch({ type: "CLEAR_WISHLIST" });
        navigate("/");
        
    }

    return (
        <div className="drop-down-container shadow d-flex direction-column absolute">
            <span className="option-span wishlist-span cursor-pointer d-flex align-center gap-small" onClick={handleWishlistClick}>
                <span className="material-icons-outlined">
                    favorite_border
                </span>
                Wishlist
            </span>
            <span className="option-span logout cursor-pointer d-flex align-center gap-small" onClick={handleLogoutClick}>
                <span className="material-icons-outlined">
                    logout
                </span>
                Logout
            </span>
        </div>
    );
}

export default ProfileDropDown;
