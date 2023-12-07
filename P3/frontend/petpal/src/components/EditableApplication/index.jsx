import React from "react";
import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import SubmitButton from "../SubmitButton";

const EditableApplication = () => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    pet_name: "",
    owner_name: "",
    area_code: "",
    phone_number: "",
    email: "",
    address1: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    pet_ownership: "",
    breed: "",
    past_pet: "",
    home_ownership: "",
    signature: "",
  });
  const navigate = useNavigate();
  const { user, token } = useContext(UserContext);
  const { pet_listing_id } = useParams();

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const submitData = async (e) => {
    e.preventDefault();
    console.log(formData);
    const response = await fetch(
      `/applications/pet_listing/${pet_listing_id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      console.error("Error updating data:", response.statusText);
      setError(`All fields are not filled out`);
    } else {
      console.log("Submitted");
      const data = await response.json();
      const applicationId = data.id; // Assuming the response includes the application ID

      // Redirect to the application details page
      navigate(`/applications/${applicationId}/`);
    }
  };

  return (
    <section id="application">
      <form onSubmit={submitData} className="shadow form mb-4 m-3">
        <div
          className="bg-white border border-gray-200 p-4 sm:p-7 rounded-lg"
          style={{ maxWidth: "100%" }}
        >
          <div className="flex text-xl md:text-2xl font-bold text-gray-900 mb-1">
            Adoption Application, Contract, and Waiver
          </div>
          <div className="grid-cols-2 sm:grid md:grid-cols-1 gap-4">
            <label
              for="pet_name"
              className="mt-1 p-2 block font-bold text-gray-700"
            >
              Name of Pet You Wish to Adopt:<span className="text-red-500">*</span>
            </label>
            <input
              onChange={handleChange}
              type="pet name"
              name="pet name"
              id="pet_name"
              className="bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-4 mt-1"
              placeholder="Pet Name"
              required
            />

            <label
              for="owner_name"
              className="mt-1 p-2 block font-bold text-gray-700"
            >
              Your Name:<span className="text-red-500">*</span>
            </label>
            <input
              onChange={handleChange}
              type="name"
              name="name"
              id="owner_name"
              className="bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-4"
              placeholder="Full Name"
              required
            />

            <label
              for="phone_number"
              className="mt-1 p-2 block font-bold text-gray-700"
            >
              Phone Number:<span className="text-red-500">*</span>
            </label>
            <div className="mb-4">
              <div className="grid-cols-2 sm:grid md:grid-cols-1 gap-4">
                <input
                  onChange={handleChange}
                  type="area code"
                  name="area_code"
                  id="area_code"
                  className="bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-4"
                  placeholder="Area Code"
                  required
                />
                <input
                  onChange={handleChange}
                  type="phone number"
                  name="phone_number"
                  id="phone_number"
                  className="bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-4"
                  placeholder="Phone Number"
                  required
                />
              </div>
            </div>

            <label for="email" className="mt-1 p-2 block font-bold text-gray-700">
              Email:<span className="text-red-500">*</span>
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              className="bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-4"
              placeholder="name@company.com"
              required
            />

            <label for="address" className="mt-1 p-2 block font-bold text-gray-700">
              Address:<span className="text-red-500">*</span>
            </label>
            <div className="mb-4">
              <div className="grid-cols-1 sm:grid md:grid-cols-1">
                <input
                  onChange={handleChange}
                  type="street address 1"
                  name="street address 1"
                  id="address1"
                  className="bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-4"
                  placeholder="Street Address 1"
                  required
                />
                <input
                  onChange={handleChange}
                  type="street address 2"
                  name="street address 2"
                  id="address2"
                  className="bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-4"
                  placeholder="Street Address 2"
                  required
                />
                <div className="grid-cols-2 sm:grid md:grid-cols-1 gap-4">
                  <input
                    onChange={handleChange}
                    type="city"
                    name="city"
                    id="city"
                    className="bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-4"
                    placeholder="City"
                    required
                  />
                  <input
                    onChange={handleChange}
                    type="province"
                    name="province"
                    id="state"
                    className="bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-4"
                    placeholder="Province"
                    required
                  />
                </div>
                <div className="grid-cols-2 sm:grid md:grid-cols-1 gap-4">
                  <input
                    onChange={handleChange}
                    type="postal code"
                    name="postal code"
                    id="zip"
                    className="bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-4"
                    placeholder="Postal Code"
                    required
                  />
                  <select
                    onChange={handleChange}
                    id="country"
                    className="bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-4"
                    required>
                    <option value="placeholder" selected hidden>
                      Select
                    </option>
                    <option value="Canada">Canada</option>
                    <option value="United States of America">
                      United States of America
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <label
              for="pet_ownership"
              className="mt-1 p-2 block font-bold text-gray-700"
            >
              Do you own any pets?<span className="text-red-500">*</span>
            </label>
            <div className="mb-4">
              <div className="justify-center mb-4">
                <div>
                  <label className="block mb-2">
                    <input
                      onChange={handleChange}
                      id="pet_ownership"
                      type="radio"
                      className="form-radio text-blue-600"
                      name="choice"
                      value="yes"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="block">
                    <input
                      onChange={handleChange}
                      id="pet_ownership"
                      type="radio"
                      className="form-radio text-red-600"
                      name="choice"
                      value="no"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>
            </div>

            <label for="breed" className="mt-1 p-2 block font-bold text-gray-700">
              If yes, name the breed and age.<span className="text-red-500">*</span>
            </label>
            <div className="mb-4">
              <textarea
                onChange={handleChange}
                id="breed"
                className="bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-4 mt-2"
                style={{ height: "200px", resize: "none" }}
                placeholder="Enter Answer Here"
                required
              ></textarea>
            </div>

            <label
              for="past_pet"
              className="mt-1 p-2 block font-bold text-gray-700"
            >
              Have you had a pet in the past? If yes, what animal and for how
              long?<span className="text-red-500">*</span>
            </label>
            <div className="mb-4">
              <div className="mb-4">
                <textarea
                  onChange={handleChange}
                  id="past_pet"
                  className="bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-4 mt-2"
                  style={{ height: "200px", resize: "none" }}
                  placeholder="Enter Answer Here"
                  required
                ></textarea>
              </div>
            </div>

            <label
              for="home_ownership"
              className="mt-1 p-2 block font-bold text-gray-700"
            >
              Do you own or rent your home?<span className="text-red-500">*</span>
            </label>
            <div className="mb-10">
              <div className="justify-center mb-4">
                <div>
                  <label className="block mb-2">
                    <input
                      onChange={handleChange}
                      id="home_ownership"
                      type="radio"
                      className="form-radio text-blue-600"
                      name="choice"
                      value="own"
                    />
                    <span className="ml-2">Own</span>
                  </label>
                  <label className="block">
                    <input
                      onChange={handleChange}
                      id="home_ownership"
                      type="radio"
                      className="form-radio text-red-600"
                      name="choice"
                      value="rent"
                    />
                    <span className="ml-2">Rent</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-start p-2 mb-10 items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600 mr-3" />
            <p className="input-left-text" required>
              I have read and agree to the terms and conditions.
            </p>
          </div>

          <div className="flex justify-start p-2 mb-20">
            <ul className="list-disc ml-4">
              <li className="font-bold mb-4">
                I agree to adopt the pet if the application is accepted, and
                will pay the adoption fee as necessary.
              </li>
              <li className="font-bold mb-4">
                I understand that there can be additional documents to complete
                after the application is submitted.
              </li>
              <li className="font-bold">
                By clicking the submit button, I verify all of the above
                information is true and accurate.
              </li>
            </ul>
          </div>

          <div className="flex items-center mb-4">
            <label
              for="signature"
              className="block p-2 font-bold text-gray-700 mr-2"
            >
              Signature<span className="text-red-500">*</span>
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="signature"
              id="signature"
              className="block bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              style={{ width: "100%" }}
              placeholder="Signature"
              required
            />
          </div>

        </div>
        <SubmitButton />
        <div style={{ textAlign: 'center' }}>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
      </form>
    </section>
  );
};

export default EditableApplication;
