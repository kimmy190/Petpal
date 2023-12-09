import React from "react";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Button } from "flowbite-react";

const Notification = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, token } = useContext(UserContext);

  const [filter, setFilter] = useState("all"); // Default filter is 'all'

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") {
      return true;
    } else if (filter === "read") {
      return notification.was_read;
    } else if (filter === "unread") {
      return !notification.was_read;
    }
    return true;
  });

  const formatDate = (timestamp) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };

    const formattedDate = new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", options).format(formattedDate);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const fetchNotifications = async (deleting) => {
    try {
        const response = await fetch(`http://localhost:8000/notification?page_size=${pageSize}&page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const notifs = notifications;
          if (deleting) {
              setNotifications(data.results);
          } else {
              setNotifications(notifs.concat(data.results));
          }
        setHasNext(data.next !== null);
      } else {
        console.error("Error fetching notifications:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleNotificationClick = async (notificationId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/notification/${notificationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add your authorization token here
          },
          body: JSON.stringify({ was_read: true }),
        }
      );

      if (response.ok) {
        const updatedNotifications = notifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, was_read: true }
            : notification
        );
        setNotifications(updatedNotifications);
      } else {
        console.error("Error updating notification:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [page]);

  return (
    <>
      <button
        id="dropdownNotificationButton"
        className="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none"
        type="button"
        onClick={handleDropdownToggle}
      >
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 14 20"
        >
          <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
        </svg>
        <div className="relative flex">
          <div className="relative inline-flex w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-2 right-3" />
        </div>
      </button>
      {/* Notification Dropdown menu */}
      <div
        id="dropdownNotification"
        aria-orientation="vertical"
        className={`z-10 ${
          isDropdownOpen ? "block" : "hidden"
        } w-full max-w-xs max-h-96 overflow-y-scroll bg-white border divide-y divide-gray-100 right-0 rounded-lg shadow sm:max-w-sm top-20 absolute`}
        style={{
          left: "70%",
          // position: "absolute",
          // top:16,
          // inset: "0px auto auto 0px",
          // margin: 0,
          // transform: "translate3d(1153.5px, 74px, 0px)"
        }}
      >
        <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50">
          Notifications
        </div>

        <div className="flex justify-center p-4">
          <button
            className={`text-sm ${
              filter === "all" ? "font-semibold text-gray-900" : "text-gray-500"
            } mx-10`}
            onClick={() => handleFilterChange("all")}
          >
            All
          </button>
          <button
            className={`text-sm ${
              filter === "read"
                ? "font-semibold text-gray-900"
                : "text-gray-500"
            } mx-10`}
            onClick={() => handleFilterChange("read")}
          >
            Read
          </button>
          <button
            className={`text-sm ${
              filter === "unread"
                ? "font-semibold text-gray-900"
                : "text-gray-500"
            } mx-10`}
            onClick={() => handleFilterChange("unread")}
          >
            Unread
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {filteredNotifications
            .slice()
            .reverse()
            .map((notification) => (
              <div className="relative" key={notification.id}>
                <a
                  href={notification.link}
                  className={`relative flex px-4 py-3 hover:bg-gray-100 ${
                    notification.was_read ? "" : "font-semibold"
                  } text-gray-900`}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div className="w-full pl-3">
                    <div className="text-gray-500 text-base mb-1.5">
                      {notification.message}
                    </div>
                    <div className="text-xs text-blue-600">
                      {formatDate(notification.creation_date)}
                    </div>
                  </div>
                </a>
                <svg
                  xmlns="http:www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute w-5 h-5 text-gray-700 top-1 right-1 hover:cursor-pointer hover:scale-110"
                  onClick={async () => {
                    await fetch(`/notification/${notification.id}`, {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Add your authorization token here
                      },
                    });
                    setPage(1);
                    setPageSize(notifications.length);
                    fetchNotifications(true);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            ))}
          {hasNext && (<Button color="gray" onClick={() => setPage(page+1) } className="w-full"> See more </Button>) }
        </div>
      </div>
    </>
  );
};

export default Notification;
