// Define the type for your state
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

// Define the action types
type FilterAction =
  | { type: "SHOW_FILTER_MODAL" }
  | { type: "MINIMUM_PRICE"; payload: { newValue: number[], priceRange: [number, number], minDifference: number } }
  | { type: "MAXIMUM_PRICE"; payload: { newValue: number[], priceRange: [number, number], minDifference: number } }
  | { type: "BEDROOMS"; payload: string | number }
  | { type: "BEDS"; payload: string | number }
  | { type: "BATHROOMS"; payload: string | number }
  | { type: "PROPERTY_TYPE"; payload: string }
  | { type: "RATING"; payload: number }
  | { type: "CANCELABLE"; payload: boolean }
  | { type: "CLEAR_ALL" };

// Define the reducer function
export const filterReducer = (state: FilterState, action: FilterAction): FilterState => {
  switch (action.type) {
    case "SHOW_FILTER_MODAL":
      return {
        ...state,
        isFilterModalOpen: !state.isFilterModalOpen,
      };
    case "MINIMUM_PRICE":
      return {
        ...state,
        priceRange: [
          Math.min(
            action.payload.newValue[0],
            action.payload.priceRange[1] - action.payload.minDifference
          ),
          action.payload.priceRange[1],
        ],
      };
    case "MAXIMUM_PRICE":
      return {
        ...state,
        priceRange: [
          action.payload.priceRange[0],
          Math.max(
            action.payload.newValue[1],
            action.payload.priceRange[0] + action.payload.minDifference
          ),
        ],
      };
      case "BEDROOMS":
      return {
        ...state,
        noOfBedrooms:
        action.payload  === "Any" ?  action.payload  :  action.payload  === "5+" ? 5 : Number( action.payload ),
      };
    case "BEDS":
      return {
        ...state,
        noOfBeds:
          action.payload === "Any" ?  action.payload  :  action.payload  === "5+" ? 5 : Number( action.payload ),
      };
    case "BATHROOMS":
      return {
        ...state,
        noOfBathrooms:
        action.payload  === "Any" ?  action.payload  :  action.payload  === "5+" ? 5 : Number( action.payload ),
      };
    case "PROPERTY_TYPE":
      return {
        ...state,
        propertyType: action.payload,
      };
    case "RATING":
      return {
        ...state,
        traveloRating: action.payload,
      };
    case "CANCELABLE":
      return {
        ...state,
        isCancelable: action.payload,
      };
    case "CLEAR_ALL":
      return {
        ...state,
        priceRange: [300, 20000],
        noOfBathrooms: "Any",
        noOfBedrooms: "Any",
        noOfBeds: "Any",
        propertyType: "Any",
        traveloRating: 1,
        isCancelable: true,
      };
    default:
      return state;
  }
};
