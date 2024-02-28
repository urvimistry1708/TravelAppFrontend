import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { dateReducer } from "../reducer";

interface State {
  destination: string;
  guests: number;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  isSearchModalOpen: boolean;
  isSearchResultOpen: boolean;
}

interface ContextType extends State {
  dateDispatch: React.Dispatch<any>;
}

const initialState: State = {
  destination: "",
  guests: 0,
  checkInDate: null,
  checkOutDate: null,
  isSearchModalOpen: false,
  isSearchResultOpen: true,
};

const DateContext = createContext<ContextType>({
  ...initialState,
  dateDispatch: () => {},
});

interface DateProviderProps {
  children: ReactNode;
}

const DateProvider: React.FC<DateProviderProps> = ({ children }) => {
  const [state, dateDispatch] = useReducer<React.Reducer<State, any>>(
    dateReducer,
    initialState
  );

  return (
    <DateContext.Provider
      value={{
        ...state,
        dateDispatch,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

const useDate = () => useContext(DateContext);

export { useDate, DateProvider };
