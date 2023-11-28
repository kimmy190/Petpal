import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PetListing from "./pages/PetListing";
import { UserContext, useUserContext } from "./contexts/UserContext";
import PetListingEditable from "./pages/PetListingEditable";
import Shelter from "./pages/Shelter";
function App() {
  return (
    <UserContext.Provider value={useUserContext()}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              path="pet_listing/:pet_listing_id"
              element={<PetListing />}
            />
            <Route
              path="pet_listing/:pet_listing_id/edit"
              element={<PetListingEditable />}
            />
            <Route path="shelter/:shelter_id" element={<Shelter />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
