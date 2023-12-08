import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ShelterTitle from "../../components/ShelterTitle";
import ReactCarousel from "../../components/ReactCarousel";
import SideBySide from "../../components/SideBySide";
import PetListingDetails from "../../components/PetListingDetails";
import Grid from "../../components/Grid";
import Card from "../../components/Card";
import { Link } from "react-router-dom/dist";
import { UserContext } from "../../contexts/UserContext";
import EditPageButtons from "../../components/EditPageButtons";
import NotFound from "../NotFound";
import { Tooltip } from "flowbite-react";
const PetListing = () => {
  const { pet_listing_id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(UserContext);
  const [petData, setPetData] = useState();
  const [shelterData, setShelterData] = useState();
  const [loadingData, setLoadingData] = useState(true);
  const [petImages, setPetImages] = useState([]);
  const [application, setApplication] = useState(null);

  const [notFound, set404] = useState(false);

  const setNotFound = () => {
    set404(true);
    setLoadingData(false);
  };

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
        setNotFound();
        return;
      }
      const petJson = await petResponse.json();
      setPetData(petJson);
      const shelterResponse = await fetch(
        `/accounts/shelter/${petJson.shelter.id}`,
        {
          method: "GET",
          redirect: "follow",
          headers: {
            accept: "application/json",
          },
        }
      );
      if (!shelterResponse.ok) {
        setNotFound();
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
        setNotFound();
        return;
      }
      const petImagesJson = await petImagesResponse.json();
      setPetImages(
        await Promise.all(
          petImagesJson
            .map(async (imageObj) => {
              // TODO: How to fix this?? I think this issue goes away
              // Once we upload using React
              const url = imageObj.image.replace("http://127.0.0.1:8000", "");
              const response = await fetch(url);
              if (!response.ok) {
                return "";
              }
              return URL.createObjectURL(await response.blob());
            })
            .reverse()
        )
      );

      if (user && !user.shelter) {
        const applicationResponse = await fetch(
          `/applications/pet_listing/${pet_listing_id}`,
          {
            method: "GET",
            redirect: "follow",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (applicationResponse.ok) {
          const application = await applicationResponse.json();
          setApplication(application);
        }
      }

      setLoadingData(false);
    };
    perfromUseEffect();
  }, [pet_listing_id, navigate]);

  return loadingData ? (
    <></>
  ) : notFound ? (
    <NotFound></NotFound>
  ) : (
    <div className="flex flex-col justify-center items-center bg-gray-50 py-3 min-h-screen">
      {user?.shelter?.id === shelterData.shelter.id ? (
        <EditPageButtons link={`/pet_listing/${pet_listing_id}/edit`} />
      ) : (
        <></>
      )}
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

      {!user?.shelter && petData.status === "Available" ? (
        <div className="flex justify-center pb-10 bg-gray-50 pt-3">
          {!application ? (
            <Link to={`/applications/pet_listing/${pet_listing_id}`}>
              <button className="bg-gray-700 m-3 text-white text-lg font-semibold hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-lg text-sm px-6 py-2.5 mr-2 mb-2">
                Adopt
              </button>
            </Link>
          ) : (
            <>
              <Tooltip content="You already have an application for this pet!">
                <button className="bg-gray-400 m-3 text-white text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-lg text-sm px-6 py-2.5 mr-2 mb-2">
                  Adopt
                </button>
              </Tooltip>
            </>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PetListing;
