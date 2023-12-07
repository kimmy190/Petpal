import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PetListing from "./pages/PetListing";
import { UserContext, useUserContext } from "./contexts/UserContext";
import PetListingEditable from "./pages/PetListingEditable";
import Shelter from "./pages/Shelter";
import ShelterEditable from "./pages/ShelterEditable";
import Application from "./pages/Application";
import ApplicationEditable from "./pages/ApplicationEditable";
import ApplicationList from "./pages/ApplicationList";
import PetFinder from "./pages/Search";

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
            <Route
              path="shelter/:shelter_id/edit"
              element={<ShelterEditable />}
            />
            <Route
              path="applications/pet_listing/:pet_listing_id/"
              element={<ApplicationEditable />}
            />
            <Route
              path="applications/:application_id"
              element={<Application />}
            />
            <Route
              path="applications/"
              element={<ApplicationList />}
            />
            <Route
              path="search"
              element={<PetFinder />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
