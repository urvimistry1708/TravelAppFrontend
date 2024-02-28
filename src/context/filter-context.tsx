import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { filterReducer } from "../reducer";

interface FilterState {
  isFilterModalOpen: boolean;
  priceRange: [number, number];
  noOfBathrooms: string | number;
  noOfBedrooms: string | number;
  noOfBeds: string | number;
  propertyType: string;
  traveloRating: number;
  isCancelable: boolean;
}

interface FilterContextType extends FilterState{
  filterDispatch: React.Dispatch<any>;
}

const initialValue: FilterState = {
  isFilterModalOpen: false,
  priceRange: [300, 20000],
  noOfBathrooms: "Any",
  noOfBedrooms: "Any",
  noOfBeds: "Any",
  propertyType: "Any",
  traveloRating: 1,
  isCancelable: true,
};

const FilterContext = createContext<FilterContextType>({
  ...initialValue,
  filterDispatch: () => {},
});

interface FilterProviderProps {
  children: ReactNode;
}

const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [state, filterDispatch] = useReducer<React.Reducer<FilterState, any>>(filterReducer, initialValue);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        filterDispatch,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = (): FilterContextType => useContext(FilterContext);

export { useFilter, FilterProvider };
