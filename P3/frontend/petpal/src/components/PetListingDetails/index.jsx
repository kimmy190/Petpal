import React from "react";
import StatusTag from "../StatusTag";
import ReactRating from "../ReactRating";

const PetListingDetails = ({ petData }) => {
  const date = new Date(petData.publication_date);
  const month = date.toLocaleString("default", { month: "long" });
  return (
    <div className="bg-white flex-col flex-start p-6 w-full">
      <div className="flex mb-2 md:text-2xl items-center font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        <div className="flex w-full flex-col md:flex-row md:gap-4 justify-between items-baseline ">
          <div className="flex justify-between mb-2">
            <h5 className="mr-3 font-bold">{petData.pet_name}</h5>
            <StatusTag status={petData.status} />
          </div>
          <p className="text-right text-sm">{`${month} ${date.getDate()}, ${date.getFullYear()}`}</p>
        </div>
      </div>

      <hr className="my-2" />

      <div className="flex items-center justify-between mb-1">
        <p className="font-semibold mr-4"> Species</p>
        <p> {petData.species} </p>
      </div>
      <div className="flex items-center justify-between mb-1">
        <p className="font-semibold mr-4"> Gender</p>
        <p> {petData.gender} </p>
      </div>
      <div className="flex items-center justify-between mb-1">
        <p className="font-semibold mr-4"> Age</p>
        <p> {petData.age} </p>
      </div>
      <div className="flex items-center justify-between mb-1">
        <p className="font-semibold mr-4"> Breed</p>
        <p> {petData.breed} </p>
      </div>
      <div className="flex items-center justify-between mb-1">
        <p className="font-semibold mr-4"> Size</p>
        <p> {petData.size} </p>
      </div>
      <div className="flex items-center justify-between mb-1">
        <p className="font-semibold mr-4"> Location</p>
        <p> {petData.location} </p>
      </div>

      <h2 className="text-xl mt-6 mb-1  font-bold leading-tight text-gray-800">
        Behaviour
      </h2>
      <hr className="my-2" />

      <div className="flex items-center justify-between">
        <p className="font-semibold">Aggressive</p>
        <ReactRating value={petData.behavior_aggresive} />
      </div>
      <div className="flex items-center justify-between">
        <p className="font-semibold">Social</p>
        <ReactRating value={petData.behavior_social} />
      </div>
      <div className="flex items-center justify-between">
        <p className="font-semibold">Noisy</p>
        <ReactRating value={petData.behavior_noisy} />
      </div>
      <div className="flex items-center justify-between">
        <p className="font-semibold">Scared</p>
        <ReactRating value={petData.behavior_scared} />
      </div>
      <div className="flex items-center justify-between">
        <p className="font-semibold">Friendly</p>
        <ReactRating value={petData.behavior_friendly} />
      </div>
    </div>
  );
};

export default PetListingDetails;
