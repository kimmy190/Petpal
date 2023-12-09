import React from "react";
import { useContext, useEffect, useState } from "react";
import Chatbox from "../../components/shelter_application/Chatbox";
import FormApplication from "../../components/shelter_application/FormApplication";
import AcceptRejectButtons from "../../components/shelter_application/AcceptRejectButtons";
import Header from "../../components/shelter_application/Header";
import Breadcrumb from "../../components/shelter_application/Breadcrumb";
import ThankYou from "../../components/ThankYou";
import WithdrawnStatus from "../../components/WithdrawnStatus";
import AcceptedStatus from "../../components/AcceptedStatus";
import RejectedStatus from "../../components/RejectedStatus";
import WithdrawButton from "../../components/WithdrawButton";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import NotFound from "../NotFound";
import ShelterTitle from "../../components/ShelterTitle";

const Application = () => {
  const [applicationStatus, setApplicationStatus] = useState();
  const { user, token } = useContext(UserContext);
  const { application_id } = useParams();

  const applicationResult = (status) => {
    setApplicationStatus(status);
  };

  const [notFound, set404] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [shelterData, setShelterData] = useState();

  const setNotFound = () => {
    set404(true);
    setLoadingData(false);
  };

  useEffect(() => {
    // Assuming you have an API endpoint to fetch the application status
    // Replace this with your actual API call
    const fetchApplicationStatus = async () => {
      try {
        const response = await fetch(`/applications/${application_id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setApplicationStatus(data.status);

        const shelterResponse = await fetch(
          `/accounts/shelter/${data.shelter.id}`,
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
      } catch (error) {
        console.error("Error fetching application status:", error);
      }
    };

    console.log(user);
    fetchApplicationStatus();
  }, [application_id]);

  const handleWithdraw = () => {
    applicationResult("Withdrawn");
  };

  const handleAccept = () => {
    applicationResult("Accepted");
  };

  const handleReject = () => {
    applicationResult("Rejected");
  };

  return loadingData ? (
    <></>
  ) : notFound ? (
    <NotFound></NotFound>
  ) : (
    <div className="flex flex-col justify-center items-center bg-gray-50 py-4">
      <ShelterTitle shelterData={shelterData} link={true} />

      <Breadcrumb />
      <Chatbox />

      {applicationStatus === "Pending" && user && !user.shelter && <ThankYou />}

      {applicationStatus === "Withdrawn" && <WithdrawnStatus />}

      {applicationStatus === "Rejected" && <RejectedStatus />}

      {applicationStatus === "Accepted" && <AcceptedStatus />}

      <FormApplication applicationStatus={applicationStatus} />

      {applicationStatus === "Pending" && user && (
        <>
          {user.shelter ? (
            <AcceptRejectButtons
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ) : (
            <WithdrawButton onWithdraw={handleWithdraw} />
          )}
        </>
      )}
    </div>
  );
};

export default Application;
