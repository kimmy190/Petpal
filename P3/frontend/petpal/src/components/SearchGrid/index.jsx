import { useEffect, useState, React } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Dropdown, Button, Radio, Label, Select } from "flowbite-react";
import PageButtons from "../PageButtons";
import PetCard from "../PetCard";

const dropdownItems = ["Dog", "Cat"];

function SearchGrid({
  fetchOnLoad,
  location,
  shelter_id,
  editable = false,
  onEdit,
}) {
  const [hideFilter, setHideFilter] = useState("hidden");
  const [species, setSpecies] = useState("");
  const [highAge, setHighAge] = useState("");
  const [lowAge, setLowAge] = useState("");
  const [gender, setGender] = useState("");
  const [size, setSize] = useState("");
  const [orderBy, setOrderBy] = useState("publication_date");
  const [page, setPage] = useState(1);
  const [disableRightButton, setDisableRightButton] = useState(true);
  const [n, setN] = useState(0);
  const [pets, setPets] = useState([]);

  const toggleFilter = () => {
    if (hideFilter === "") {
      setHideFilter("hidden");
    } else {
      setHideFilter("");
    }
  };

  const handleGender = (event) => {
    setGender(event.target.value);
  };
  const handleAge = (gte, lte) => {
    setLowAge(gte);
    setHighAge(lte);
  };
  const handleSize = (event) => {
    setSize(event.target.value);
  };
  const handleSortChange = (event) => {
    setOrderBy(event.target.value);
  };

  const clearFilters = (event) => {
    // Handle sort change here
    setSpecies("");
    setLowAge("");
    setHighAge("");
    setSize("");
    setGender("");
  };

  // this is dumb w.e

  const fetchPets = () => {
    const x = {
      age__gte: lowAge,
      age__lte: highAge,
      gender: gender,
      size: size,
      species: species,
      shelter: shelter_id,
      order_by: orderBy,
    };
    console.log("shelter", shelter_id);
    let params = new URLSearchParams(x);
    let keysForDel = [];
    params.forEach((value, key) => {
      if (value == "" || value == 0) {
        keysForDel.push(key);
      }
    });
    keysForDel.forEach((key) => {
      params.delete(key);
    });
    // Fetch data from the API endpoint
    // fetch(`http://127.0.0.1:8000/pet_listing?${searchParams.toString()}&shelter=${1}`,
    fetch(`/pet_listing/?${params.toString()}&page=${page}&page_size=8`, {
      method: "GET",
      redirect: "follow",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((data) => {
        // Set the retrieved data to the state
        console.log(data);
        if (!data.next) {
          setDisableRightButton(true);
        } else {
          setDisableRightButton(false);
        }

        setN(data.count);
        setPets(data.results);
      })
      .catch((error) => {
        console.error("There was a problem fetching the data:", error);
      });
  };
  useEffect(() => {
    if (fetchOnLoad) fetchPets();
  }, [fetchOnLoad, shelter_id, lowAge, gender, size, species, orderBy, page]);

  return (
    <div className="flex flex-col md:flex-row m-4 container md:max-w-full  bg-white rounded-lg shadow-md gap-4">
      <div
        id="drawer-disabled-backdrop"
        className={`${hideFilter} flex z-40 p-4 w-full md:w-[300px] flex-none bg-white`}
        tabIndex="-1"
        aria-labelledby="drawer-disabled-backdrop-label"
      >
        <div className="flex flex-col w-full">
          <label htmlFor="species" className="mb-4 md:mb-2 mr-4 font-bold">
            Species
          </label>
          <Dropdown
            id="species"
            label={species === "" ? "Any species" : species + "s"}
            color="dark"
            className="flex-shrink-0 z-10 inline-flex items-center py-3.5 "
          >
            {dropdownItems.map((item, index) => (
              <Dropdown.Item key={index} onClick={() => setSpecies(item)}>
                {item + "s"}
              </Dropdown.Item>
            ))}
          </Dropdown>
          <hr className="mt-4 mb-2" />
          <label htmlFor="size" className="mb-4 md:mb-2 mr-4 font-bold">
            Size
          </label>
          <fieldset id="size" className="flex max-w-md flex-col gap-4">
            <div className="flex items-center gap-2">
              <Radio
                value="Small"
                checked={size == "Small"}
                onChange={handleSize}
              />
              <Label>Small</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                value="Medium"
                checked={size == "Medium"}
                onChange={handleSize}
              />
              <Label>Medium</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                value="Large"
                checked={size == "Large"}
                onChange={handleSize}
              />
              <Label>Large</Label>
            </div>
          </fieldset>
          <hr className="mt-4 mb-2" />
          <label htmlFor="age" className="mb-4 md:mb-2 mr-4 font-bold">
            Age
          </label>
          <fieldset className="flex max-w-md flex-col gap-4">
            <div className="flex items-center gap-2">
              <Radio
                value="1"
                checked={highAge == "1"}
                onChange={() => handleAge(0, 1)}
              />
              <Label> Less than 1 year </Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                value="3"
                checked={highAge == "3"}
                onChange={() => handleAge(1, 3)}
              />
              <Label>1 - 3</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                value="6"
                checked={highAge == "6"}
                onChange={() => handleAge(3, 6)}
              />
              <Label>3 - 6</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                value="7"
                checked={lowAge == "7"}
                onChange={() => handleAge(7, 100)}
              />
              <Label>Greater than 6</Label>
            </div>
          </fieldset>
          <hr className="mt-4 mb-2" />
          <label htmlFor="age" className="mb-4 md:mb-2 mr-4 font-bold">
            Gender
          </label>
          <fieldset id="age" className="flex max-w-md flex-col gap-4">
            <div className="flex items-center gap-2">
              <Radio
                value="Male"
                checked={gender == "Male"}
                onChange={handleGender}
              />
              <Label>Male</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                value="Female"
                checked={gender == "Female"}
                onChange={handleGender}
              />
              <Label>Female</Label>
            </div>
          </fieldset>
          <hr className="mt-4 mb-2" />
          <div className="flex gap-2 self-start">
            <Button onClick={clearFilters} type="button" color="dark">
              Clear filters
            </Button>
          </div>
        </div>
      </div>
      <div className="md:grow px-8 pt-4  bg-white">
        <div className="flex flex-row flex-wrap justify-between items-center md:items-end">
          <div className="flex flex-row items-center gap-x-4">
            <Button
              onClick={toggleFilter}
              id="showDrawer"
              className="gray-800"
              color="dark"
              type="button"
              aria-controls="drawer-disabled-backdrop"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                />
              </svg>
            </Button>
            <p className="bold">{n} pets </p>
          </div>
          <div className="gap-4 flex flex-row flex-wrap space-between md:items-end">
            <div>
              <label
                htmlFor="sort"
                className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Sort
              </label>
              <Select id="sort" onChange={(e) => setOrderBy(e.target.value)}>
                <option value="publication_date">Most recent</option>
                <option value="age">Age</option>
                <option value="gender">Gender</option>
                <option value="size">Size</option>
              </Select>
            </div>
          </div>
        </div>

        <div className="gap-4 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {editable && (
            <Link to="/pet_listing/create">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="block text-gray-700 w-full h-56"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="p-5 flex flex-col items-center text-medium text-gray-700">
                Create a new pet listing!
              </div>
            </Link>
          )}
          {pets.map((pet) => (
            <PetCard
              key={pet.id}
              id={pet.id}
              imageUrl={pet.images[0].image}
              petName={pet.pet_name}
              availability={pet.status}
              gender={pet.gender}
              age={pet.age}
              breed={pet.breed}
              adoptionCenter={pet.shelter.organization_name}
              adoptionDate={pet.publication_date}
              editable={editable}
              onEdit={
                onEdit
                  ? (id) => {
                      setPets(pets.filter((pet) => pet.id !== id));
                      onEdit(id);
                    }
                  : null
              }
            />
          ))}
        </div>

        <div className="my-4 flex flex-col items-center md:flex-col-reverse md:items-end">
          <PageButtons
            page={page}
            setPage={setPage}
            disableRightButton={disableRightButton}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchGrid;
