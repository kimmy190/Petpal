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
const Shelter = () => {
  const { shelter_id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [shelterData, setShelterData] = useState();
  const [loadingData, setLoadingData] = useState(true);
  const [shelterImage, setShelterImages] = useState([]);
  const [reviews, setReviews] = useState([]);

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
              return URL.createObjectURL(await response.blob());
            })
            .reverse()
        )
      );

      const reviewResponse = await fetch(`/comments/shelter/${shelter_id}`, {
        method: "GET",
        redirect: "follow",
        headers: {
          accept: "application/json",
        },
      });
      if (!reviewResponse.ok) {
        navigate("/home");
        return;
      }
      const reviewJson = await reviewResponse.json();
      setReviews(reviewJson.results);
      setLoadingData(false);
    };
    perfromUseEffect();
  }, [shelter_id, navigate]);

  return loadingData ? (
    <></>
  ) : (
    <div className="flex flex-col justify-center items-center bg-gray-50 py-3 min-h-screen">
      {user?.shelter?.id === shelterData.shelter.id ? (
        <EditPageButtons link={`/shelter/${shelter_id}/edit`} />
      ) : (
        <></>
      )}
      <ShelterTitle shelterData={shelterData} />
      <section id="shelter-info" class="p-2 w-3/4 mb-3">
        <SideBySide>
          <div>temp</div>
          <ReactCarousel images={shelterImage} />
        </SideBySide>
      </section>

      <h2
        class="text-2xl font-bold text-gray-900 md:text-3xl lg:text-3xl
        mt-3 mb-1 p-2"
      >
        Pets Available for Adoption
      </h2>
      <h2 className="pb-3 font-light text-gray-500 text-sm sm:text-lg md:text-xl">
        Create lasting memories with a new loving companion!
      </h2>

      <section id="shelter-pets" class="flex justify-center w-full p-4">
        {/** TODO: add search feature via Andre component */}
      </section>

      <h2 className="text-2xl font-bold text-gray-900 md:text-3xl lg:text-3xl mb-1 p-2 pt-4">
        Reviews
      </h2>
      <h2 className="font-light text-gray-500 text-sm sm:text-lg md:text-xl pb-7">
        Tell us about your adoption experience!
      </h2>

      <section id="shelter-reviews" class="w-10/12">
        <Grid cols={2}>
          {reviews.map((review, i) => {
            return (
              <Card key={i}>
                <Review review={review} shelterUserId={shelterData.id} />
              </Card>
            );
          })}
        </Grid>
      </section>
    </div>
  );
};

export default Shelter;
