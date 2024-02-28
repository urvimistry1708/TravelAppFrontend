import { Route, Routes } from"react-router-dom";
import {Home, SingleHotel } from './pages';
import './App.css'
import { SearchResults } from "./pages/SearchResults/SearchResults";
import { Filter } from "./components/Filters/Filter";

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels/:name/:address/:id/reserve" 
        element={<SingleHotel />} 
        />
         <Route path="/hotels/:address" element={<SearchResults />} />
         
        
      </Routes>
     

    </>
  )
}

export default App
