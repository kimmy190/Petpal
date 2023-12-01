const ShelterInfo = ({ shelter }) => {
  return (
    <div className="p-4 relative w-full h-[500px]  overflow-auto">
      <div className="min-h-[350px]">
        <h1 className="text-2xl mb-4 font-bold text-gray-900">
          Mission Statement
        </h1>
        <p className="mb-6 whitespace-pre-line">{shelter.mission_statement}</p>
      </div>
      <h1 className="text-2xl mb-4 font-bold text-gray-900">Contact us!</h1>
      <p>
        We are located at {shelter.address1} in {shelter.city}, {shelter.state}.
        Our postal address is {shelter.zip}. Call us at {shelter.phone_number}
      </p>
    </div>
  );
};

export default ShelterInfo;
