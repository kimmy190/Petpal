import { useParams, useNavigate } from "react-router-dom";
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
const PetListingEditable = () => {
  const { pet_listing_id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(UserContext);

  const [petData, setPetData] = useState();
  const [shelterData, setShelterData] = useState();
  const [loadingData, setLoadingData] = useState(true);
  const [petImages, setPetImages] = useState([]);
  const [deletedPetImageIds, setDeletedPetImageIds] = useState([]);
  const [nextPetImageId, setNextPetImageId] = useState(0);

  useEffect(() => {
    const onUploadedImageDelete = (currObj) => (images) => {
      setPetImages(images.filter((image) => image.id !== currObj.id));
      setDeletedPetImageIds((prev) => [...prev, currObj.id]);
    };
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
      setNextPetImageId(petImagesJson[petImagesJson.length - 1].id + 1);
      setPetImages(
        await Promise.all(
          petImagesJson
            .map(async (imageObj, i) => {
              // TODO: How to fix this?? I think this issue goes away
              // Once we upload using React.
              // Nope, it does not.
              const url = imageObj.image.replace("http://127.0.0.1:8000", "");
              const response = await fetch(url);
              if (!response.ok) {
                return "";
              }
              return {
                url: URL.createObjectURL(await response.blob()),
                id: imageObj.id,
                onDelete: onUploadedImageDelete(imageObj),
              };
            })
            .reverse()
        )
      );

      setLoadingData(false);
    };
    perfromUseEffect();
  }, [navigate, pet_listing_id, user]);

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

  const uploadPetData = async () => {
    await fetch(`/pet_listing/${pet_listing_id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(petData),
    });

    await Promise.all(
      petImages
        .filter((image) => !!image.file)
        .map((image) => {
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

    await Promise.all(
      deletedPetImageIds.map((id) => {
        return fetch(`/pet_listing/${pet_listing_id}/image/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

export default PetListingEditable;
