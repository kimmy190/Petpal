import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ShelterTitle = ({ shelterData, link }) => {
  const name = shelterData.username;
  const shelterID = shelterData.shelter.id;
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    const perfromUseEffect = async () => {
      if (!shelterData.shelter.logo_image) {
        return;
      }
      const url = shelterData.shelter.logo_image.replace(
        "http://127.0.0.1:8000",
        ""
      );
      const imageResponse = await fetch(url, {
        method: "GET",
        redirect: "follow",
        headers: {
          accept: "application/json",
        },
      });

      if (!imageResponse.ok) {
        return;
      }
      setImageURL(URL.createObjectURL(await imageResponse.blob()));
    };
    perfromUseEffect();
  }, [shelterData]);

  const SVG = () => (
    <div className="relative self-start ml-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
        />
      </svg>
    </div>
  );

  const NameSection = () => (
    <>
      <div className="rounded-full w-6 h-6 mr-2 mb-1">
        <img src={imageURL} alt="logo" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 md:text-3xl lg:text-3xl">
        {name}
      </h1>
    </>
  );

  return (
    <div className="flex justify-center items-center p-3">
      {link ? (
        <Link
          to={`/shelter/${shelterID}`}
          className="relative flex justify-center text-center items-center transform transition duration-300 hover:scale-105"
        >
          <NameSection />
          <SVG />
        </Link>
      ) : (
        <NameSection />
      )}
    </div>
  );
};

export default ShelterTitle;
