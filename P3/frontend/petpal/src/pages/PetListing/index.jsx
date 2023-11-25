import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PetListing = (props) => {
  const { pet_listing_id } = useParams();
  const navigate = useNavigate();

  const [petData, setPetData] = useState();
  useEffect(() => {
    fetch(`/pet_listing/${pet_listing_id}`, {
      method: "GET",
      redirect: "follow",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then((json) => {
        setPetData(json);
      })
      .catch((error) => navigate("/home"));
  }, [pet_listing_id, navigate]);

  return (
    <div className="flex flex-col justify-center items-center bg-gray-50 py-3">
      Test
    </div>
  );
};

export default PetListing;
