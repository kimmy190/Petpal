import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ShelterTitle from "../../components/ShelterTitle";
import SideBySide from "../../components/SideBySide";
import Grid from "../../components/Grid";
import Card from "../../components/Card";
import { UserContext } from "../../contexts/UserContext";
import Review from "../../components/Review";
import EditableReactCarousel from "../../components/EditableReactCarousel";
import ConfrimDenyButton from "../../components/ConfirmDenyEditButtons";
import EditableShelterInfo from "../../components/EditableShelterInfo";
import PageButtons from "../../components/PageButtons";
const ShelterEditable = () => {
  const { shelter_id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const [shelterData, setShelterData] = useState();
  const [loadingData, setLoadingData] = useState(true);
  const [shelterImage, setShelterImages] = useState([]);
  const [deletedShelterImages, setDeletedShelterImages] = useState([]);
  const [nextShelterImageId, setNextShelterImageId] = useState(0);

  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [disableRightButton, setDisableRightButton] = useState(false);

  useEffect(() => {
    const perfromUseEffect = async () => {
      const onUploadedImageDelete = (currObj) => (images) => {
        setShelterImages(images.filter((image) => image.id !== currObj.id));
        setDeletedShelterImages((prev) => [...prev, currObj.id]);
      };

      const shelterResponse = await fetch(`/accounts/shelter/${shelter_id}`, {
        method: "GET",
        redirect: "follow",
        headers: {
          accept: "application/json",
        },
      });
      if (!shelterResponse.ok) {
        navigate("/home");
        return;
      }
      const shelterJson = await shelterResponse.json();
      setShelterData(shelterJson);

      const shelterImageResponse = await fetch(
        `/accounts/shelter/${shelter_id}/image`,
        {
          method: "GET",
          redirect: "follow",
          headers: {
            accept: "application/json",
          },
        }
      );
      if (!shelterImageResponse.ok) {
        navigate("/home");
        return;
      }
      const shelterImageJson = await shelterImageResponse.json();
      if (shelterImageJson.length !== 0) {
        setNextShelterImageId(
          shelterImageJson[shelterImageJson.length - 1].id + 1
        );
      }

      setShelterImages(
        await Promise.all(
          shelterImageJson
            .map(async (imageObj) => {
              // TODO: How to fix this?? I think this issue goes away
              // Once we upload using React. Nope
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
  }, [shelter_id, navigate]);

  useEffect(() => {
    const perfromUseEffect = async () => {
      const reviewResponse = await fetch(
        `/comments/shelter/${shelter_id}?page=${page}`,
        {
          method: "GET",
          redirect: "follow",
          headers: {
            accept: "application/json",
          },
        }
      );
      if (!reviewResponse.ok) {
        navigate("/home");
        return;
      }
      const reviewJson = await reviewResponse.json();
      if (!reviewJson.next) {
        setDisableRightButton(true);
      } else {
        setDisableRightButton(false);
      }
      setReviews(reviewJson.results);
    };
    perfromUseEffect();
  }, [shelter_id, page, navigate]);

  const addNewImage = (image) => {
    setShelterImages([
      {
        url: URL.createObjectURL(image),
        id: nextShelterImageId,
        onDelete: (images) => {
          setShelterImages(
            images.filter((image) => image.id !== nextShelterImageId)
          );
        },
        file: image,
      },
      ...shelterImage,
    ]);
    setNextShelterImageId(nextShelterImageId + 1);
  };

  const uploadShelterData = async () => {
    const copy = { ...shelterData.shelter };

    // This is really scuffed, and it should probably be done in the backend
    delete copy.user;
    delete copy.logo_image;

    await fetch(`/accounts/shelter/${shelter_id}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shelter: copy }),
    });

    await Promise.all(
      shelterImage
        .filter((image) => !!image.file)
        .map((image) => {
          const imagePostBody = new FormData();
          imagePostBody.append("image", image.file);
          return fetch(`/accounts/shelter/${shelter_id}/image/`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: imagePostBody,
          });
        })
    );

    await Promise.all(
      deletedShelterImages.map((id) => {
        return fetch(`/accounts/shelter/${shelter_id}/image/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
    );

    navigate(`/shelter/${shelter_id}`);
  };

  return loadingData ? (
    <></>
  ) : (
    <div className="flex flex-col justify-center items-center bg-gray-50 py-3 min-h-screen">
      <ConfrimDenyButton
        onConfirm={uploadShelterData}
        onDeny={() => navigate(`/shelter/${shelter_id}`)}
      />
      <ShelterTitle shelterData={shelterData} />
      <section id="shelter-info" className="p-2 w-3/4 mb-3">
        <SideBySide>
          <EditableShelterInfo
            shelter={shelterData.shelter}
            updateParam={(param, value) => {
              setShelterData({
                ...shelterData,
                shelter: { ...shelterData.shelter, [param]: value },
              });
            }}
          />
          <EditableReactCarousel
            images={shelterImage}
            addNewImage={addNewImage}
          />
        </SideBySide>
      </section>

      <h2
        className="text-2xl font-bold text-gray-900 md:text-3xl lg:text-3xl
        mt-3 mb-1 p-2"
      >
        Pets Available for Adoption
      </h2>
      <h2 className="pb-3 font-light text-gray-500 text-sm sm:text-lg md:text-xl">
        Create lasting memories with a new loving companion!
      </h2>

      <section id="shelter-pets" className="flex justify-center w-full p-4">
        {/** TODO: add search feature via Andre component */}
      </section>

      <h2 className="text-2xl font-bold text-gray-900 md:text-3xl lg:text-3xl mb-1 p-2 pt-4">
        Reviews
      </h2>
      <h2 className="font-light text-gray-500 text-sm sm:text-lg md:text-xl pb-7">
        Tell us about your adoption experience!
      </h2>
      <div className="pb-7">
        <PageButtons
          page={page}
          setPage={setPage}
          disableRightButton={disableRightButton}
        />
      </div>

      <section id="shelter-reviews" className="w-10/12">
        <Grid cols={2}>
          {reviews.map((review, i) => {
            return (
              <Card key={review.id}>
                <Review review={review} shelterUserId={shelterData.id} />
              </Card>
            );
          })}
        </Grid>
      </section>
    </div>
  );
};

export default ShelterEditable;
