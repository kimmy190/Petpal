import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const PetListing = (props) => {
  const { pet_listing_id } = useParams();
  const [petData, setPetData] = useState();
  useEffect(() => {
    fetch(`/pet_listing/${pet_listing_id}`, {
      method: "GET",
      redirect: "follow",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.text())
      .then((json) => {
        console.log(json);
        setPetData(json);
      })
      .catch((error) => console.log("error", error));
  }, [pet_listing_id]);

  return <>{petData}</>;
};

export default PetListing;
