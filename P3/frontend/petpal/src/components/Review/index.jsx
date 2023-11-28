import React, { useEffect, useState } from "react";
import ReactRating from "../ReactRating";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../ProfileImage";
import PostReply from "../PostReply";

// NOTE: shelterUserId != shelterID
const Review = ({ review, shelterUserId }) => {
  const [user, setUser] = useState();
  const [replyUsers, setReplyUsers] = useState();

  const [loadingData, setLoadingData] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const perfromUseEffect = async () => {
      const userResponse = await fetch(`/accounts/seeker/${review.author}`, {
        method: "GET",
        redirect: "follow",
        headers: {
          accept: "application/json",
        },
      });

      if (!userResponse.ok) {
        navigate("/home");
        return;
      }
      const userJson = await userResponse.json();
      setUser(userJson);

      setReplyUsers(
        await Promise.all(
          review.reply.map(async (reply) => {
            const userResponse = await fetch(
              `/accounts/seeker/${reply.author}`,
              {
                method: "GET",
                redirect: "follow",
                headers: {
                  accept: "application/json",
                },
              }
            );

            if (!userResponse.ok) {
              navigate("/home");
              return;
            }
            return userResponse.json();
          })
        )
      );
      setLoadingData(false);
    };
    perfromUseEffect();
  }, [review, navigate]);

  return loadingData ? (
    <></>
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-start">
        <ProfileImage user={user} />
        <p className="font-bold">{user.username}</p>
      </div>
      <div className="my-1 flex list-none gap-1 p-0">
        <ReactRating value={review.rating} />
      </div>
      <div className="pb-3">{review.body}</div>
      <div className="flex flex-col w-full mb-3">
        {review.reply.map((reply, i) => {
          let background = "";
          if (replyUsers[i].id === shelterUserId) {
            background += "bg-yellow-100";
          }
          return (
            <div className="flex flex-row w-full mb-3">
              <div className={"w-1/6 " + background}></div>
              <div className={"w-5/6 " + background}>
                <div className="flex items-center justify-start">
                  <ProfileImage user={replyUsers[i]} />
                  <p className="font-bold">{replyUsers[i].username}</p>
                </div>
                <div>{reply.body}</div>
              </div>
            </div>
          );
        })}
        <div className="flex flex-row w-full">
          <div className="w-1/6"></div>
          <div className="w-5/6">
            <PostReply commentId={review.id}></PostReply>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
