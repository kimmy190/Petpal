import React from 'react'
import { useContext, useEffect, useState } from "react";
import Chatbox from '../../components/shelter_application/Chatbox';
import FormApplication from '../../components/shelter_application/FormApplication';
import AcceptRejectButtons from '../../components/shelter_application/AcceptRejectButtons';
import Header from '../../components/shelter_application/Header';
import Breadcrumb from '../../components/shelter_application/Breadcrumb';
import WithdrawButton from '../../components/WithdrawButton';
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const Application = () => {
  const [applicationStatus, setApplicationStatus] = useState('Pending');
  const { user, token } = useContext(UserContext);

  const applicationResult = (status) => {
    setApplicationStatus(status);
  };
  console.log('applicationStatus', applicationStatus);

  return (
    <div className="flex flex-col justify-center items-center bg-gray-50 py-4">
      <Header />
      <Breadcrumb />
      <Chatbox />
      <FormApplication applicationStatus={applicationStatus} />

      {user && user.shelter && (
        <AcceptRejectButtons
          onAccept={() => applicationResult('Accepted')}
          onReject={() => applicationResult('Rejected')}
        />
      )}

      {user && !user.shelter && (
        <WithdrawButton
          onWithdraw={() => applicationResult('Withdrawn')}
        />
      )}
    </div>
  );
};

export default Application;