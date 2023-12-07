import ApplicationCard from "../../components/ApplicationCard";
import React, { useState, useEffect } from 'react';
import {useUserContext} from "../../contexts/UserContext";


const ApplicationList = () => {
    const [applications, setApplications] = useState([]);
    const [orderBy, setOrderBy] = useState("creation_time");
    const [status, setStatus] = useState("Pending");
    const {token} = useUserContext();

    useEffect(() => {
        // Fetch data from the '/applications/' endpoint
        const fetchData = async () => {
            try {
                const response = await fetch(`/applications/?order_by=${orderBy}&status=${status}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json', // Add other headers if needed
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                const data = await response.json();
                setApplications(data.results); // Assuming the response contains an array of application data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to fetch data only once
  return (
    <div className="min-h-screen bg-gray-100 py-4">
      {/* Some hacky flex boxing */}
      <div className="flex justify-center mx-4">
        <div className="flex flex-col content-center w-full md:w-3/4 lg:w-1/2">
          <div className="flex flex-row items-center justify-between mt-4 mb-2">
            <div>
              <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl">
                Adoption Applications
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="block text-sm font-medium text-gray-900 dark:text-white">
                Status
              </label>
              {/* TODO switch me to a button that is clickable to reverse order, that is sufficient here */}
              <select
                id="Status"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                value={status}
                onChange={e => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Withdrawn">Withdrawn</option>
                <option value="Accepted">Accepted</option>
              </select>

              <label htmlFor="sort" className="block text-sm font-medium text-gray-900 dark:text-white">
                Sort by
              </label>
              <select
                id="sort"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={orderBy}
                onChange={e => setOrderBy(e.targetValue)}
              >
                <option value="creation_time">Creation Time</option>
                <option value="last_update_time">Update time</option>
              </select>
            </div>
          </div>
          <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              {applications.map((application, index) => (
                  <li key={index} className="w-full border-b border-gray-200 dark:border-gray-600">
                    <ApplicationCard {...application} />
                  </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ApplicationList;
