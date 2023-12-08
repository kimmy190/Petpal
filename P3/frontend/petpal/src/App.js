import "./App.css";
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PetListing from "./pages/PetListing";
// import { UserContext, useUserContext } from "./contexts/UserContext";
import PetListingEditable from "./pages/PetListingEditable";
import Shelter from "./pages/Shelter";
import ShelterEditable from "./pages/ShelterEditable";
import Application from "./pages/Application";
import ApplicationEditable from "./pages/ApplicationEditable";
import PetListingCreation from "./pages/PetListingCreation";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Main from "./pages/Main";
import SeekerSignUp from "./pages/SeekerSignUp";
import ShelterSignUp from "./pages/ShelterSignUp";
import Setting from "./pages/Setting";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    // <UserContext.Provider value={useUserContext()}>
    <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
                path="main"
                element={<Main />}
                />
            <Route
              path="setting"
              element={<Setting />}
            />
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
              element={<Application />}
            />
            
          </Route>
          <Route
              path="login"
              element={<Login />}
            />
            <Route
              path="signup/seeker"
              element={<SeekerSignUp />}
            />
            <Route
              path="signup/shelter"
              element={<ShelterSignUp />}
            />

        </Routes>
      </BrowserRouter>
    </UserProvider>
    </React.StrictMode>
  );
}

export default App;
