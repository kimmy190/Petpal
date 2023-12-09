import ApplicationCard from "../../components/ApplicationCard";
import React, { useState, useEffect } from 'react';
import {useUserContext} from "../../contexts/UserContext";
import { Select } from "flowbite-react";
import PageButtons from "../../components/PageButtons";


const ApplicationList = () => {
    const [page, setPage] = useState(1);
    const [disableRightButton, setDisableRightButton] = useState(true);
    const [applications, setApplications] = useState([]);
    const [orderBy, setOrderBy] = useState("creation_time");
    const [status, setStatus] = useState("Pending");
    const {token} = useUserContext();

    useEffect(() => {
        // Fetch data from the '/applications/' endpoint
        const fetchData = async () => {
            try {
                const response = await fetch(`/applications/?order_by=${orderBy}&status=${status}&page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json', // Add other headers if needed
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                const data = await response.json();
                if (!data.hasNext) {
                    setDisableRightButton(true);
                } else {
                    setDisableRightButton(false);
                }
                setApplications(data.results); // Assuming the response contains an array of application data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [orderBy, status]); // Empty dependency array to fetch data only once
  return (
    <div className="min-h-screen bg-gray-100 py-4">
      {/* Some hacky flex boxing */}
      <div className="flex justify-center mx-4">
        <div className="flex flex-col content-center w-full md:w-3/4 lg:w-1/2">
          <div className="flex flex-row flex-wrap items-center justify-between mt-4 mb-2">
            <div>
              <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl">
                Adoption Applications
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="status" className="block text-sm font-medium text-gray-900 dark:text-white">
                Status
              </label>
              <Select
                id="status"
                value={status}
                onChange={e => {setStatus(e.target.value); setPage(1);}}
              >
    setPage(1);
                <option value="Pending">Pending</option>
                <option value="Withdrawn">Withdrawn</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </Select>

              <label htmlFor="sort" className="block text-sm font-medium text-gray-900 dark:text-white">
                Sort by
              </label>
              <Select
                id="sort"
                value={orderBy}
                onChange={e => e => {setStatus(e.target.value); setPage(1);}}
              >
                <option value="creation_time">Creation Time</option>
                <option value="last_update_time">Update time</option>
              </Select>
            </div>
          </div>
          <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            {applications.map((application, index) => (
                <li key={index} className="w-full border-b border-gray-200 dark:border-gray-600">
                  <ApplicationCard {...application} />
                </li>
            ))}
          </ul>
          <div className="my-4 flex flex-col items-center">
          <PageButtons
            page={page}
            setPage={setPage}
            disableRightButton={disableRightButton}
          />
        </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationList;
