import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ShelterTitle from "../../components/ShelterTitle";
import ReactCarousel from "../../components/Carousel";
import SideBySide from "../../components/SideBySide";
import PetListingDetails from "../../components/PetListingDetails";
import Grid from "../../components/Grid";
import Card from "../../components/Card";
import { Link } from "react-router-dom/dist";
const PetListing = (props) => {
  const { pet_listing_id } = useParams();
  const navigate = useNavigate();

  const [petData, setPetData] = useState();
  const [shelterData, setShelterData] = useState();
  const [loadingData, setLoadingData] = useState(true);
  const [petImages, setPetImages] = useState([]);

  useEffect(() => {
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
    perfromUseEffect();
  }, [pet_listing_id, navigate]);

  return loadingData ? (
    <></>
  ) : (
    <div className="flex flex-col justify-center items-center bg-gray-50 py-3 min-h-screen">
      <ShelterTitle shelterData={shelterData} link={true} />
      <section id="pet_gallery" className="p-2 w-5/6 sm:w-3/4 mb-3">
        <SideBySide>
          <ReactCarousel images={petImages} />
          <PetListingDetails petData={petData} />
        </SideBySide>
      </section>
      <section id="pet_history" className="w-5/6 sm:w-3/4 bg-50">
        <Grid cols={2}>
          <Card title={"Medical History"}>{petData.medical_history}</Card>
          <Card title={"Requirements"}>{petData.requirements}</Card>
        </Grid>
        <Grid cols={1}>
          <Card title={"Additional Comments"}>
            {petData.additional_comments}
          </Card>
        </Grid>
      </section>

      {/* TODO: what link to go to on click? */}
      <div className="flex justify-center pb-10 bg-gray-50 pt-3">
        <Link to="">
          <button className="bg-gray-700 m-3 text-white text-lg font-semibold hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-lg text-sm px-6 py-2.5 mr-2 mb-2">
            Adopt
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PetListing;
