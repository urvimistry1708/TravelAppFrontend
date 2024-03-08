interface WishlistItem {
    hotelId: string;
  }
  
  interface WishlistState {
    wishlist: WishlistItem[];
  }
  
  type WishlistAction =
    | { type: "ADD_TO_WISHLIST"; payload: WishlistItem }
    | { type: "REMOVE_FROM_WISHLIST"; payload: string }
    | { type: "CLEAR_WISHLIST" };
  
  export const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
    switch (action.type) {
      case "ADD_TO_WISHLIST":
        return {
          ...state,
          wishlist: [...state.wishlist, action.payload],
        };
      case "REMOVE_FROM_WISHLIST":
        return {
          ...state,
          wishlist: state.wishlist.filter((hotel) => hotel.hotelId !== action.payload),
        };
      case "CLEAR_WISHLIST":
        return {
          ...state,
          wishlist: [],
        };
      default:
        return state;
    }
  };
  
  export default wishlistReducer;
  