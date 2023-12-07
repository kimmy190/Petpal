import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthenticatedRoute from "./components/AuthenticatedRoute"
import PetListing from "./pages/PetListing";
import { UserContext, useUserContext } from "./contexts/UserContext";
import PetListingEditable from "./pages/PetListingEditable";
import Shelter from "./pages/Shelter";
import ShelterEditable from "./pages/ShelterEditable";
import Application from "./pages/Application";
import ApplicationEditable from "./pages/ApplicationEditable";
import ApplicationList from "./pages/ApplicationList";
import PetFinder from "./pages/Search";
import PetListingCreation from "./pages/PetListingCreation";
import NotFound from "./pages/NotFound";
import MarkdownComponent from "./pages/BlogPost";

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
            <Route path="pet_listing/create" element={<PetListingCreation />} />
            <Route
              path="applications/pet_listing/:pet_listing_id/"
              element={<ApplicationEditable />}
            />
            <Route
              path="applications/:application_id"
              element={
                  <Application />
              }
            />
            <Route
              path="applications/"
              element={
                  <AuthenticatedRoute>
                    <ApplicationList />
                  </AuthenticatedRoute>
              }
            />
            <Route
              path="search"
              element={<PetFinder />}
            />
          </Route>
          <Route
              path="blog"
              element={<MarkdownComponent />}
            />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
