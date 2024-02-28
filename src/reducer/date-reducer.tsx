// Define the type for your state
interface DateState {
    destination: string;
    guests: number;
    checkInDate: Date | null;
    checkOutDate: Date | null;
    isSearchModalOpen: boolean;
    isSearchResultOpen: boolean;
  }
  
  // Define the action types
  type DateAction =
    | { type: "OPEN_SEARCH_MODAL" }
    | { type: "CHECK_IN"; payload: Date }
    | { type: "CHECK_OUT"; payload: Date }
    | { type: "DESTINATION"; payload: string }
    | { type: "GUESTS"; payload: number }
    | { type: "DATE_FOCUS" }
    | { type: "SHOW_SEARCH_RESULT" }
    | { type: "CLOSE_SEARCH_MODAL" }
    | { type: "CLEAR_INPUTS" };
  
  // Define the reducer function
  export const dateReducer = (state: DateState, action: DateAction): DateState => {
    switch (action.type) {
      case "OPEN_SEARCH_MODAL":
        return {
          ...state,
          isSearchModalOpen: !state.isSearchModalOpen,
        };
      case "CHECK_IN":
        return {
          ...state,
          checkInDate: action.payload,
        };
      case "CHECK_OUT":
        return {
          ...state,
          checkOutDate: action.payload,
        };
      case "DESTINATION":
        return {
          ...state,
          destination: action.payload,
        };
      case "GUESTS":
        return {
          ...state,
          guests: action.payload,
        };
      case "DATE_FOCUS":
        return {
          ...state,
          isSearchResultOpen: false,
        };
      case "SHOW_SEARCH_RESULT":
        return {
          ...state,
          isSearchResultOpen: true,
        };
      case "CLOSE_SEARCH_MODAL":
        return {
          ...state,
          isSearchModalOpen: !state.isSearchModalOpen,
        };
      case "CLEAR_INPUTS":
        return {
          ...state,
          checkInDate: null,
          checkOutDate: null,
          guests: 0,
        };
      default:
        return state;
    }
  };