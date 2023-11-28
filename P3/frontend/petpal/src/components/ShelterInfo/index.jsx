import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import ReactRating from "../ReactRating";

const ShelterInfo = ({ shelterData }) => {
  return (
    <div className="p-4 relative w-full h-[500px]  overflow-auto">
      <div className="min-h-[350px]">
        <h1 className="text-2xl mb-4 font-bold text-gray-900">
          Mission Statement
        </h1>
        <p className="mb-6">{shelterData.shelter.mission_statement}</p>
      </div>
      <h1 className="text-2xl mb-4 font-bold text-gray-900">Contact us!</h1>
      <p>
        We are located at {shelterData.shelter.address1} in{" "}
        {shelterData.shelter.city}, {shelterData.shelter.state}. Our postal
        address is {shelterData.shelter.zip}
      </p>
    </div>
  );
};

export default ShelterInfo;
