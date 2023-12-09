import React from "react";
import { useContext, useEffect, useState } from "react";
import Chatbox from "../../components/shelter_application/Chatbox";
import Header from "../../components/shelter_application/Header";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import EditableApplication from "../../components/EditableApplication";
import ShelterTitle from "../../components/ShelterTitle";
import NotFound from "../NotFound";

const UserApplication = () => {
  const [applicationStatus, setApplicationStatus] = useState("Pending");
  const { user, token } = useContext(UserContext);
  const { pet_listing_id } = useParams();
  const navigate = useNavigate();

  const [notFound, set404] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [shelterData, setShelterData] = useState();

  const setNotFound = () => {
    set404(true);
    setLoadingData(false);
  };
  useEffect(() => {
    const performUseEffect = async () => {
      if (user.shelter) {
        navigate("/*");
        return;
      }

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
        navigate(`/applications/${application.id}`);
      }

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
      setLoadingData(false);
    };
    performUseEffect();
  }, [pet_listing_id]);
  return loadingData ? (
    <></>
  ) : notFound ? (
    <NotFound></NotFound>
  ) : (
    <div className="flex flex-col justify-center items-center bg-gray-50 py-4">
      <ShelterTitle shelterData={shelterData} link={true} />
      {/* make sure shelter cannot create applications? or backend check? */}
      <EditableApplication />
    </div>
  );
};

export default UserApplication;
