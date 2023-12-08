import React from "react";
import { useContext, useEffect, useState } from "react";
import Chatbox from "../../components/shelter_application/Chatbox";
import Header from "../../components/shelter_application/Header";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import EditableApplication from "../../components/EditableApplication";

const UserApplication = () => {
  const [applicationStatus, setApplicationStatus] = useState("Pending");
  const { user, token } = useContext(UserContext);
  const { pet_listing_id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const performUseEffect = async () => {
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
    };
    performUseEffect();
  }, [pet_listing_id]);
  return (
    <div className="flex flex-col justify-center items-center bg-gray-50 py-4">
      <Header />
      <Chatbox />
      {/* make sure shelter cannot create applications? or backend check? */}
      <EditableApplication />
    </div>
  );
};

export default UserApplication;
