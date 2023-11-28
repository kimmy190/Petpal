import { useEffect, useState } from "react";

const ProfileImage = ({ user }) => {
  const [imageURL, setImageURL] = useState(false);
  useEffect(() => {
    const perfromUseEffect = async () => {
      const url = user.profile_image.replace("http://127.0.0.1:8000", "");
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
    if (user.profile_image) {
      perfromUseEffect();
    }
  }, [user]);
  return imageURL ? (
    <img
      src={imageURL}
      className="object-cover rounded-full w-[50px] h-[50px] mr-1 mb-1"
      alt="Profile"
    />
  ) : (
    <></>
  );
};

export default ProfileImage;
