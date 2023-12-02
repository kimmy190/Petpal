import React from "react";
import ReactRating from "../ReactRating";

const EditablePetListingDetails = ({ petData, updateParam }) => {
  const date = new Date(petData.publication_date);
  const month = date.toLocaleString("default", { month: "long" });

  return (
    <div className="bg-white flex-col flex-start p-6 w-full">
      <div className="flex mb-2 md:text-2xl items-center font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        <div className="flex w-full flex-col md:flex-row md:gap-4 justify-between items-baseline ">
          <div className="grid sm:grid-cols-2 gap-2 mb-2 mr-5">
            <div className="relative">
              <input
                type="text"
                id="name"
                value={petData.pet_name}
                onChange={(e) => {
                  updateParam("pet_name", e.target.value);
                }}
                className="border w-full px-2.5 pb-2.5 pt-3 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
              />
              <label
                htmlFor="name"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Name
              </label>
            </div>
            <div className="text-base md:ml-1">
              <div className="relative">
                <select
                  id="status"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => {
                    updateParam("status", e.target.value);
                  }}
                  defaultValue={petData.status}
                >
                  <option value="Available">Available</option>
                  <option value="Adopted">Adopted</option>
                  <option value="Pending">Pending</option>
                  <option value="Withdrawn">Withdrawn</option>
                </select>
                <label
                  htmlFor="status"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Status
                </label>
              </div>
            </div>
          </div>
          <p className="text-right text-sm">{`${month} ${date.getDate()}, ${date.getFullYear()}`}</p>
        </div>
      </div>

      <hr className="my-2" />

      <div className="flex items-center justify-between mb-1">
        <p className="font-semibold mr-4"> Gender</p>
        <div className="relative w-32 sm:w-48">
          <select
            id="gender"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={petData.gender}
            onChange={(e) => {
              updateParam("gender", e.target.value);
            }}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>
      <div className="flex items-center justify-between mb-1">
        <p className="font-semibold mr-4"> Age</p>
        <div className="w-32 sm:w-48">
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          ></label>
          <input
            value={petData.age}
            type="number"
            min="0"
            id="age"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Age"
            onChange={(e) => {
              updateParam("age", e.target.value);
            }}
            required
          />
        </div>
      </div>
      <div className="flex items-center justify-between mb-1">
        <p className="font-semibold mr-4"> Breed</p>
        <div className="relative w-32 sm:w-48">
          <select
            id="breed"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={petData.breed}
            onChange={(e) => {
              updateParam("breed", e.target.value);
            }}
          >
            <option value="Golden Doodle">Golden Doodle</option>
            <option value="Boston Terrier">Boston Terrier</option>
            <option value="Australian Terrier">Australian Terrier</option>
          </select>
        </div>
      </div>
      <div className="flex items-center justify-between mb-1">
        <p className="font-semibold mr-4"> Size</p>
        <div className="relative w-32 sm:w-48">
          <select
            id="size"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={petData.size}
            onChange={(e) => {
              updateParam("size", e.target.value);
            }}
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
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
        <ReactRating
          value={petData.behavior_aggresive}
          onClick={(value) => {
            updateParam("behavior_aggresive", value);
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="font-semibold">Social</p>
        <ReactRating
          value={petData.behavior_social}
          onClick={(value) => {
            updateParam("behavior_social", value);
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="font-semibold">Noisy</p>
        <ReactRating
          value={petData.behavior_noisy}
          onClick={(value) => {
            updateParam("behavior_noisy", value);
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="font-semibold">Scared</p>
        <ReactRating
          value={petData.behavior_scared}
          onClick={(value) => {
            updateParam("behavior_scared", value);
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="font-semibold">Friendly</p>
        <ReactRating
          value={petData.behavior_friendly}
          onClick={(value) => {
            updateParam("behavior_friendly", value);
          }}
        />
      </div>
    </div>
  );
};

export default EditablePetListingDetails;
