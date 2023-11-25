import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PetListing from "./pages/PetListing";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="pet_listing/:pet_listing_id" element={<PetListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
