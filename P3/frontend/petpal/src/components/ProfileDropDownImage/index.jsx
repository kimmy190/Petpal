import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";

//const ProfileImage = ({ user }) => {
const ProfileDropDownImage = () => {
  const { user } = useUserContext();

//   console.log(user);
  const defaultImageUrl = process.env.PUBLIC_URL + "/default.jpeg";

  // const [imageURL, setImageURL] = useState(null);
  const imageURL = user.shelter ? user.shelter.logo_image : user.profile_image;

  // useEffect(() => {
  //     const perfromUseEffect = async () => {
  //     // const url = user.profile_image.replace("http://127.0.0.1:8000", "");
  //     let url;

  //     if (user.shelter) {
  //         // User has a shelter property
  //         console.log("its me");
  //         setImageURL(user.shelter.logo_image);
  //         url = user.shelter.logo_image.replace("http://127.0.0.1:8000", "");
  //     } else {
  //         // User does not have a shelter property
  //         setImageURL(user.profile_image);
  //         url = user.profile_image.replace("http://127.0.0.1:8000", "");
  //     }

  //     // const imageResponse = await fetch(url, {
  //     //     method: "GET",
  //     //     redirect: "follow",
  //     //     headers: {
  //     //     accept: "application/json",
  //     //     },
  //     // });

  //     // if (!imageResponse.ok) {
  //     //     return;
  //     // }
  //     // setImageURL(URL.createObjectURL(await imageResponse.blob()));
  //     // };

  //     if (user.profile_image) {
  //     perfromUseEffect();
  //     } else if( user ? false : user.shelter.logo_image){
  //         perfromUseEffect();
  //     }

  //     }
  // }, [user]);
  console.log(imageURL)
  return imageURL ? (
    <img
      src={imageURL}
      className="object-cover w-8 h-8 rounded-full md:w-10 md:h-10 bg-white"
      alt="Profile"
    />
  ) : (
    <img
      src={defaultImageUrl}
      className="object-cover w-8 h-8 rounded-full md:w-10 md:h-10 bg-white"
      alt="Profile"
    />
  );
};

export default ProfileDropDownImage;
