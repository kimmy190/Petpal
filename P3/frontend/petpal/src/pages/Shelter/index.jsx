import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ShelterTitle from "../../components/ShelterTitle";
import ReactCarousel from "../../components/ReactCarousel";
import SideBySide from "../../components/SideBySide";
import Grid from "../../components/Grid";
import Card from "../../components/Card";
import { UserContext } from "../../contexts/UserContext";
import EditPageButtons from "../../components/EditPageButtons";
import Review from "../../components/Review";
import PostReview from "../../components/PostReview";
import ShelterInfo from "../../components/ShelterInfo";
import PageButtons from "../../components/PageButtons";
import SearchGrid from "../../components/SearchGrid";
import NotFound from "../NotFound";
const Shelter = () => {
  const { shelter_id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [shelterData, setShelterData] = useState();
  const [loadingData, setLoadingData] = useState(true);
  const [shelterImage, setShelterImages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [disableRightButton, setDisableRightButton] = useState(false);
  const [notFound, set404] = useState(false);

  const setNotFound = () => {
    set404(true);
    setLoadingData(false);
  };

  useEffect(() => {
    const perfromUseEffect = async () => {
      const shelterResponse = await fetch(`/accounts/shelter/${shelter_id}`, {
        method: "GET",
        redirect: "follow",
        headers: {
          accept: "application/json",
        },
      });
      if (!shelterResponse.ok) {
        setNotFound();
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
        setNotFound();
        return;
      }
      const shelterImageJson = await shelterImageResponse.json();
      setShelterImages(
        await Promise.all(
          shelterImageJson
            .map(async (imageObj) => {
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
        setNotFound();
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

  return loadingData ? (
    <></>
  ) : notFound ? (
    <NotFound></NotFound>
  ) : (
    <div className="flex flex-col justify-center items-center bg-gray-50 py-3 min-h-screen">
      {user?.shelter?.id === shelterData.shelter.id ? (
        <EditPageButtons link={`/shelter/${shelter_id}/edit`} />
      ) : (
        <></>
      )}
      <ShelterTitle shelterData={shelterData} />
      <section id="shelter-info" className="p-2 w-3/4 mb-3">
        <SideBySide>
          <ShelterInfo shelter={shelterData.shelter} />
          <ReactCarousel images={shelterImage} />
        </SideBySide>
      </section>

      <h2 className="text-2xl font-bold text-gray-900 md:text-3xl lg:text-3xl mt-3 mb-1 p-2">
        Pets Available for Adoption
      </h2>
      <h2 className="pb-3 font-light text-gray-500 text-sm sm:text-lg md:text-xl">
        Create lasting memories with a new loving companion!
      </h2>

      <section id="shelter-pets" className="flex justify-center w-full p-4">
        {/* <SearchGrid fetchOnLoad shelter_id={shelter_id} /> */}
      </section>

      <h2 className="text-2xl font-bold text-gray-900 md:text-3xl lg:text-3xl mb-1 p-2 pt-4">
        Reviews
      </h2>
      <h2 className="font-light text-gray-500 text-sm sm:text-lg md:text-xl mb-5">
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
                <Review
                  review={review}
                  shelterUserId={shelterData.id}
                  allowReply={true}
                />
              </Card>
            );
          })}
        </Grid>
      </section>
      <section id="post-shelter-reviews" className="w-1/2">
        <Grid cols={1}>
          {(user && !user.shelter) ||
          (user && user.shelter.id !== shelterData.shelter.id) ? (
            <Card>
              <PostReview shelterID={shelterData.shelter.id} />
            </Card>
          ) : (
            <></>
          )}
        </Grid>
      </section>
    </div>
  );
};

export default Shelter;
