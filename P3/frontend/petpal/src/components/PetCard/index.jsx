import React from "react";

const PetCard = ({
  id,
  imageUrl,
  petName,
  availability,
  age,
  gender,
  breed,
  adoptionCenter,
  adoptionDate,
  editable = false,
  onEdit,
}) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  var formattedDate = new Date(adoptionDate);
  formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    formattedDate
  );
  return (
    <div className="relative max-h-max max-w-xs md:max-w-sm bg-white shadow rounded-lg mb-2 transition duration-300 ease-in-out hover:shadow-lg hover:opacity-80">
      {editable && (
        <a
          onClick={() => {
            onEdit(id);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="absolute top-2 right-2 w-12 h-12 hover:cursor-pointer hover:scale-110 z-40"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </a>
      )}
      <a href="./pet_detail.html">
        <div className="relative w-full h-56">
          <img
            className="w-full h-full object-cover rounded-t-lg"
            src={imageUrl}
            alt=""
          />
        </div>
      </a>
      <div className="p-5 flex flex-col">
        <div className="flex justify-between">
          <a href="#">
            <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900">
              {petName}
            </h5>
          </a>
          <div>
            <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
              {availability}
            </span>
          </div>
        </div>
        <p className="text-medium text-gray-700">
          {gender} {"\u2022"} {age}
        </p>
        <p className="text-medium text-gray-700">{breed}</p>
        <p className="text-medium text-gray-700">{adoptionCenter}</p>
        <p className="text-xs mt-2  text-gray-700">
          {formattedDate.toString()}
        </p>
      </div>
    </div>
  );
};

export default PetCard;
