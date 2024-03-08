import { Route, Routes } from "react-router-dom";
import { Home, OrderSummary, Payment, SingleHotel } from './pages';
import './App.css'
import { SearchResults } from "./pages/SearchResults/SearchResults";

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels/:name/:address/:id/reserve"
          element={<SingleHotel />}
        />
        <Route path="/hotels/:address" element={<SearchResults />} />
        <Route path="/confirm-booking/stay/:id" element={<Payment />} />
        <Route path="/order-summary" element={<OrderSummary />} />

      </Routes>


    </>
  )
}

export default App
