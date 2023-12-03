import React, { useContext, useEffect, useState } from "react";
import ReactRating from "../ReactRating";
import ProfileImage from "../ProfileImage";
import PostReply from "../PostReply";
import { UserContext } from "../../contexts/UserContext";

// NOTE: shelterUserId != shelterID
const Review = ({ review, shelterUserId, allowReply }) => {
  const [reviewUser, setReviewUser] = useState();
  const [replyUsers, setReplyUsers] = useState();
  const { user } = useContext(UserContext);
  const [loadingData, setLoadingData] = useState(true);
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
        return;
      }
      const userJson = await userResponse.json();
      setReviewUser(userJson);

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
              return;
            }
            return userResponse.json();
          })
        )
      );
      setLoadingData(false);
    };

    perfromUseEffect();
  }, [review]);

  return loadingData ? (
    <></>
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-start">
        <ProfileImage user={reviewUser} />
        <p className="font-bold">{reviewUser.username}</p>
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
            <div className="flex flex-row w-full mb-3" key={reply.id}>
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
        {allowReply && user ? (
          <div className="flex flex-row w-full">
            <div className="w-1/6"></div>
            <div className="w-5/6">
              <PostReply commentId={review.id}></PostReply>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Review;
