import {useState, React} from 'react';
import { useSearchParams } from 'react-router-dom';
import {Dropdown, Button, TextInput} from 'flowbite-react';
import SearchGrid from "../../components/SearchGrid";
import SearchBar from "../../components/SearchBar";

const dropdownItems = ["Dogs", "Cats", "Small animals"];

function PetFinder() {
    let [searchParams, setSearchParams] = useSearchParams();
    let [location, setLocation] = useState("");
    let [shelter, setShelter] = useState(0);

    const handleSearch = (location, id) => {
        // You can perform any action you want here based on the clicked item
        setLocation(location);
        setShelter(id);
    };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8 mx-2">
      <div className="w-full md:w-3/4 p-2 md:p-8 rounded-lg w-4/5 mb-5">
        <div className="flex flex-col justify-center items-center mb-4">
          <div className="max-w-5xl py-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              Find a pet
            </h1>
          </div>
            <SearchBar onSubmit={handleSearch} />
        </div>
      </div>
      <SearchGrid shelter_id={shelter} location={location} fetchOnLoad={true} />
    </div>
  );
}

export default PetFinder;
