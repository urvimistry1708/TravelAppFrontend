import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import { CategoryProvider } from "./context/category-context.tsx";
import { DateProvider } from "./context/date-context.tsx";
import { FilterProvider } from "./context/filter-context.tsx";
import { AuthProvider } from "./context/auth-context.tsx";
import { HotelProvider } from "./context/hotel-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <CategoryProvider>
        <DateProvider>
          <FilterProvider>
            <AuthProvider>
              <HotelProvider>
                <App />
              </HotelProvider>
            </AuthProvider>
          </FilterProvider>
        </DateProvider>
      </CategoryProvider>
    </Router>
  </React.StrictMode>
);
