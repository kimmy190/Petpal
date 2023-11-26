import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ShelterTitle from "../../components/ShelterTitle";
import ReactCarousel from "../../components/ReactCarousel";
import SideBySide from "../../components/SideBySide";
import PetListingDetails from "../../components/PetListingDetails";
import Grid from "../../components/Grid";
import Card from "../../components/Card";
import { UserContext } from "../../contexts/UserContext";
import ConfrimDenyButton from "../../components/ConfirmDenyEditButtons";
import EditableReactCarousel from "../../components/EditableReactCarousel";
const PetListingEditable = () => {
  const { pet_listing_id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(UserContext);

  const [petData, setPetData] = useState();
  const [shelterData, setShelterData] = useState();
  const [loadingData, setLoadingData] = useState(true);
  const [petImages, setPetImages] = useState([]);
  const [newPetImages, setNewPetImages] = useState([]);
  const [deletedPetImageIds, setDeletedPetImageIds] = useState([]);

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
      if (user?.shelter?.id !== shelterJson.shelter.id) {
        navigate("/home");
      }

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

      setPetImages(
        await Promise.all(
          petImagesJson.map(async (imageObj) => {
            // TODO: How to fix this?? I think this issue goes away
            // Once we upload using React
            const url = imageObj.image.replace("http://127.0.0.1:8000", "");
            const response = await fetch(url);
            if (!response.ok) {
              return "";
            }
            return URL.createObjectURL(await response.blob());
          })
        )
      );

      setLoadingData(false);
    };
    perfromUseEffect();
  }, [pet_listing_id, navigate]);

  const updateSpecificPetData = (field) => (value) => {
    setPetData({ ...petData, [field]: [value] });
  };

  const addNewImage = (image) => {
    setPetImages([URL.createObjectURL(image), ...petImages]);
    setNewPetImages([image, ...newPetImages]);
  };

  const uploadPetData = () => {
    const body = new FormData();

    Object.keys(petData).forEach((key) => {
      body.append(key, petData[key]);
    });

    fetch(`/pet_listing/${pet_listing_id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    newPetImages.forEach((image) => {
      const imagePostBody = new FormData();
      imagePostBody.append("image", image);
      fetch(`/pet_listing/${pet_listing_id}/image/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: imagePostBody,
      });
    });

    deletedPetImageIds.forEach((id) => {
      fetch(`/pet_listing/${pet_listing_id}/image/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    });

    navigate(`/pet_listing/${pet_listing_id}`);
  };

  return loadingData ? (
    <></>
  ) : (
    <div className="flex flex-col justify-center items-center bg-gray-50 py-3 min-h-screen">
      <ShelterTitle shelterData={shelterData} link={true} />
      <ConfrimDenyButton
        onConfirm={uploadPetData}
        onDeny={() => navigate(`/pet_listing/${pet_listing_id}`)}
      />
      <section id="pet_gallery" className="p-2 w-5/6 sm:w-3/4 mb-3">
        <SideBySide>
          <EditableReactCarousel images={petImages} addNewImage={addNewImage} />
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

      <button onClick={uploadPetData}>Click me</button>
    </div>
  );
};

export default PetListingEditable;
