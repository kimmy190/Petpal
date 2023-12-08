import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {Dropdown, Button, TextInput} from 'flowbite-react';


const dropdownItems = ["Dogs", "Cats", "Small animals"];

function SearchBar({location="", onSubmit}) {
    let [searchParams, setSearchParams] = useSearchParams();
    const [inputValue, setInputValue] = useState({  location  });
    const [species, setSpecies] = useState('Any species');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const handleItemClick = (item) => {
        // You can perform any action you want here based on the clicked item
        setSearchParams({ species: item});
    };
    useEffect(() => {
        // Function to fetch suggestions from the endpoint
        const fetchSuggestions = async () => {
            try {
                const response = await fetch('/accounts/shelter/');
                if (response.ok) {
                    const data = await response.json();
                    // Assuming the response data is an array of strings, update filteredSuggestions
                    setSuggestions(data.map((value) => { return ({id: value.shelter.id, location: value.shelter.organization_name}) }));
                    setFilteredSuggestions(data.map((value) => { return ({id: value.shelter.id, location: value.shelter.organization_name}) }));
                } else {
                    throw new Error('Failed to fetch suggestions');
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchSuggestions();
        }, []);

    const handleChange = (e) => {
        const inputValue = e.target.value;
        var new_filteredSuggestions;
        if (inputValue === "") {
            new_filteredSuggestions = suggestions;
        } else {
            new_filteredSuggestions = filteredSuggestions.filter(
                (suggestion) =>
                suggestion.location.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
            );
            // if (new_filteredSuggestions.length == 1) {
            //     setInputValue({location: inputValue, id: new_filteredSuggestions[0].id});
            // }
        }
        setInputValue({location: inputValue});
        setFilteredSuggestions(new_filteredSuggestions);
        setShowSuggestions(true);
    };

    const handleClick = (suggestion) => {
        setInputValue(suggestion);
        // setFilteredSuggestions([]);
        setShowSuggestions(false);
    };

    const handleSubmit = () => {
        console.log("Submitting");
        onSubmit(inputValue.location, inputValue.id);
    };

    return (
          <div className="w-full  sm:max-w-2xl">
            <form>
              <div className="flex">
                <div className="relative w-full">
                  <TextInput
                    autocomplete="off"
                    type="search"
                    value={inputValue.location}
                    onChange={handleChange}
                    sizing="lg"
                    id="search-dropdown"
                    placeholder="Enter Location"
                    required
                  />
                  {showSuggestions && (
                      <ul className="absolute z-10 left-0 mt-2 w-full bg-white rounded-md shadow-lg">

                        {filteredSuggestions.map((suggestion, index) => (
                            <li key={index} onClick={() => handleClick(suggestion)}
                                className="cursor-pointer py-2 px-4 hover:bg-gray-100"
                            >
                              {suggestion.location}
                            </li>
                        ))}
                      </ul>
                      )}
                  <Button
                    /* type="submit" */
                    color="dark"
                    onClick={handleSubmit}
                    className="absolute top-0 right-0 p-3"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                    <span className="sr-only">Search</span>
                  </Button>
                </div>
              </div>
            </form>
          </div>
);
}

export default SearchBar;
