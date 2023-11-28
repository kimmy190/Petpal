import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import ReactRating from "../ReactRating";

const PostReview = ({ shelterID }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const { token } = useContext(UserContext);
  return (
    <>
      <div className="pb-3">
        <ReactRating
          value={rating}
          onClick={(value) => {
            setRating(value);
          }}
        />
      </div>

      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <label htmlFor="comment" className="sr-only">
            Your Review
          </label>
          <textarea
            id="comment"
            rows="4"
            className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Write a review..."
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          <button
            onClick={async () => {
              const body = new FormData();
              body.append("body", comment);
              body.append("rating", rating);
              const response = await fetch(`/comments/shelter/${shelterID}`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                body: body,
              });

              if (!response.ok) {
                return;
              }
              window.location.reload();
            }}
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Post Review
          </button>
        </div>
      </div>
    </>
  );
};

export default PostReview;
