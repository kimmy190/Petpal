import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ShelterTitle from "../../components/ShelterTitle";
import ReactCarousel from "../../components/Carousel";

const PetListing = (props) => {
  const { pet_listing_id } = useParams();
  const navigate = useNavigate();

  const [petData, setPetData] = useState();
  const [shelterData, setShelterData] = useState();
  const [loadingData, setLoadingData] = useState(true);
  const [petImages, setPetImages] = useState([]);

  const perfromUseEffect = async () => {
    const petResponse = await fetch(`/pet_listing/${pet_listing_id}`, {
      method: "GET",
      redirect: "follow",
      headers: {
        accept: "application/json",
      },
    });
    if (!petResponse.ok) {
      navigate("/home");
      return;
    }
    const petJson = await petResponse.json();
    setPetData(petJson);
    const shelterResponse = await fetch(
      `/accounts/shelter/${petJson.shelter}`,
      {
        method: "GET",
        redirect: "follow",
        headers: {
          accept: "application/json",
        },
      }
    );
    if (!shelterResponse.ok) {
      navigate("/home");
      return;
    }
    const shelterJson = await shelterResponse.json();
    setShelterData(shelterJson);

    const petImagesResponse = await fetch(
      `/pet_listing/${pet_listing_id}/image`,
      {
        method: "GET",
        redirect: "follow",
        headers: {
          accept: "application/json",
        },
      }
    );
    if (!petImagesResponse.ok) {
      navigate("/home");
      return;
    }
    const petImagesJson = await petImagesResponse.json();
    setPetImages(petImagesJson);

    setLoadingData(false);
  };

  useEffect(() => {
    perfromUseEffect();
  }, [pet_listing_id]);

  return loadingData ? (
    <></>
  ) : (
    <div className="flex flex-col justify-center items-center bg-gray-50 py-3">
      <ShelterTitle
        logo={shelterData.shelter.logo_image}
        name={shelterData.username}
        shelterID={shelterData.shelter.id}
        link={true}
      />
      <section id="pet_gallery" className="p-2 w-5/6 sm:w-3/4 mb-3">
        <ReactCarousel images={petImages} />
      </section>
    </div>
  );
};

export default PetListing;
