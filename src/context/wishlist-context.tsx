import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from "react";
import { wishlistReducer } from "../reducer";

// Define the type for a single wishlist item
interface WishlistItem {
  hotelId: string;
}

// Define the type for the wishlist state
interface WishlistState {
  wishlist: WishlistItem[];
}

// Define the type for the context value
interface ContextType {
  wishlist: WishlistItem[];
  wishlistDispatch: Dispatch<any>; // Update the type according to your dispatch action type
}

// Define the initial value for the wishlist state
const initialValue: WishlistState = {
  wishlist: [],
};

// Create the WishlistContext
const WishlistContext = createContext<ContextType>({
  wishlist: initialValue.wishlist,
  wishlistDispatch: () => null,
});

// Define the Props interface for WishlistProvider
interface Props {
  children: ReactNode;
}

// Create the WishlistProvider component
const WishlistProvider: React.FC<Props> = ({ children }) => {
  const [{ wishlist }, wishlistDispatch] = useReducer(
    wishlistReducer,
    initialValue
  );

  return (
    <WishlistContext.Provider value={{ wishlist, wishlistDispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Create the useWishlist hook
const useWishlist = () => useContext(WishlistContext);

export { useWishlist, WishlistProvider };
