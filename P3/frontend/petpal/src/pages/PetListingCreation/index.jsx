import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ShelterTitle from "../../components/ShelterTitle";
import SideBySide from "../../components/SideBySide";
import Grid from "../../components/Grid";
import Card from "../../components/Card";
import { UserContext } from "../../contexts/UserContext";
import ConfrimDenyButton from "../../components/ConfirmDenyEditButtons";
import EditableReactCarousel from "../../components/EditableReactCarousel";
import EditablePetListingDetails from "../../components/EditablePetListingDetails";
import TextArea from "../../components/TextArea";
import ErrorModal from "../../components/ErrorModal";
import NotFound from "../NotFound";
const PetListingCreation = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(UserContext);

  const [petData, setPetData] = useState({
    location: "",
    images: [],
    behavior_aggresive: 0,
    behavior_social: 0,
    behavior_noisy: 0,
    behavior_scared: 0,
    behavior_friendly: 0,
    pet_name: "",
    status: "Available",
    publication_date: new Date().toDateString(),
    gender: "Male",
    age: 0,
    breed: "Golden Doodle",
    size: "Small",
    medical_history: "",
    requirements: "",
    additional_comments: "",
  });
  const [shelterData, setShelterData] = useState();
  const [loadingData, setLoadingData] = useState(true);
  const [petImages, setPetImages] = useState([]);
  const [nextPetImageId, setNextPetImageId] = useState(0);

  const [showError, setShowError] = useState(false);
  const [errorObj, setErrorObj] = useState({
    title: "There was an issue creating your pet listing",
    body: "",
  });

  const [notFound, set404] = useState(false);

  const setNotFound = () => {
    set404(true);
    setLoadingData(false);
  };

  useEffect(() => {
    const perfromUseEffect = async () => {
      if (!user.shelter) {
        setNotFound();
        return;
      }

      const shelterResponse = await fetch(
        `/accounts/shelter/${user.shelter.id}`,
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
      if (user?.shelter?.id !== shelterJson.shelter.id) {
        setNotFound();
        return;
      }

      setPetData({ ...petData, location: shelterJson.shelter.address1 });

      setLoadingData(false);
    };
    perfromUseEffect();
  }, [navigate, user, petData]);

  const addNewImage = (image) => {
    setPetImages([
      {
        url: URL.createObjectURL(image),
        id: nextPetImageId,
        onDelete: (images) => {
          setPetImages(images.filter((image) => image.id !== nextPetImageId));
        },
        file: image,
      },
      ...petImages,
    ]);
    setNextPetImageId(nextPetImageId + 1);
  };

  const errorCheck = () => {
    let error = false;
    const setMsg = (msg) => {
      setErrorObj({
        ...errorObj,
        body: msg,
      });
      error = true;
      setShowError(true);
    };

    if (petImages.length === 0) {
      setMsg("You must include at least one image for your gallery");
    }
    if (petData.pet_name === "" || petData.pet_name.length > 50) {
      setMsg("The pet named you entered is invalid");
    }
    if (petData.medical_history === "") {
      setMsg("You must include a medical history");
    }
    if (petData.requirements === "") {
      setMsg("You must include requirements");
    }
    if (petData.additional_comments === "") {
      setMsg("You must include additional comments");
    }
    return error;
  };

  const uploadPetData = async () => {
    if (errorCheck()) {
      return;
    }

    const response = await fetch(`/pet_listing/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(petData),
    });

    const json = await response.json();
    const pet_listing_id = json.id;

    await Promise.all(
      petImages.map((image) => {
        const imagePostBody = new FormData();
        imagePostBody.append("image", image.file);
        return fetch(`/pet_listing/${pet_listing_id}/image/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: imagePostBody,
        });
      })
    );
    navigate(`/pet_listing/${pet_listing_id}`);
  };

  const updateParam = (field, value) => {
    setPetData({ ...petData, [field]: value });
  };

  return loadingData ? (
    <></>
  ) : notFound ? (
    <NotFound></NotFound>
  ) : (
    <div className="flex flex-col justify-center items-center bg-gray-50 py-3 min-h-screen">
      <ConfrimDenyButton
        onConfirm={uploadPetData}
        onDeny={() => navigate(`/shelter/${user.shelter.id}`)}
      />
      <ErrorModal
        errorObj={errorObj}
        show={showError}
        setShow={setShowError}
      ></ErrorModal>
      <ShelterTitle shelterData={shelterData} link={true} />
      <section id="pet_gallery" className="p-2 w-5/6 sm:w-3/4 mb-3">
        <SideBySide>
          <EditableReactCarousel images={petImages} addNewImage={addNewImage} />
          <EditablePetListingDetails
            petData={petData}
            updateParam={updateParam}
          />
        </SideBySide>
      </section>
      <section id="pet_history" className="w-5/6 sm:w-3/4 bg-50">
        <Grid cols={2}>
          <Card title={"Medical History"}>
            <TextArea
              title={"Medical History"}
              rows={4}
              onChange={(value) => {
                updateParam("medical_history", value);
              }}
              value={petData.medical_history}
            ></TextArea>
          </Card>
          <Card title={"Requirements"}>
            <TextArea
              title={"Requirements"}
              rows={4}
              onChange={(value) => {
                updateParam("requirements", value);
              }}
              value={petData.requirements}
            ></TextArea>
          </Card>
        </Grid>
        <Grid cols={1}>
          <Card title={"Additional Comments"}>
            <TextArea
              title={"Additional Comments"}
              rows={4}
              onChange={(value) => {
                updateParam("additional_comments", value);
              }}
              value={petData.additional_comments}
            ></TextArea>
          </Card>
        </Grid>
      </section>
    </div>
  );
};

export default PetListingCreation;
