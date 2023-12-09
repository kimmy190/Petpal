import React from "react";
import { useUserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";

const ApplicationCard = ({
  pet_name,
  pet_listing,
  status,
  shelter,
  applicant,
  creation_time,
  id,
}) => {
  const { user } = useUserContext();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  var formattedDate = new Date(creation_time);
  formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    formattedDate
  );
  // Render the shelter information if the current user is a shelter
  const renderShelterInfo = () => {
    const isShelter = user.is_shelter;
    // const isShelter = false;
    if (user && user.shelter) {
      return (
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            Application from:{" "}
            <span>
              {applicant.first_name} {applicant.last_name}
            </span>
          </p>
      );
    }
      return (
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
          Application to:{" "}
          <a href={`/shelter/${shelter.id}`}>
            <span>{shelter.organization_name}</span>
          </a>
        </p>

    ); // Render nothing if the current user is not a shelter
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex justify-start items-center gap-4">
        <div>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">
            {pet_name}
          </h5>
        </div>
        <div>
          <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
            {status}
          </span>
        </div>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-between mt-4 gap-4 w-full">
        <div className="flex flex-row items-center justify-start gap-4">
          <Link to={`/pet_listing/${pet_listing.id}`}>
            <img
              data-popover-target="popover-default"
              className="w-20 h-20 rounded-full"
              src={`${pet_listing.images[0].image}`}
              alt={`Rounded avatar of ${pet_name}`}
            />
          </Link>
          <div className="flex flex-col items-start justify-center">
            {renderShelterInfo()}
            <div>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                Created: {formattedDate}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-self-end ">
          <Link
            to={`/applications/${id}`}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            View application
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
