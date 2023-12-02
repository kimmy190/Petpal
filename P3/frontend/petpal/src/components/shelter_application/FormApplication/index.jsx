import React from 'react';
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";

const FormApplication = () => {
    const [formData, setFormData] = useState({
        pet_name: '',
        owner_name: '',
        area_code: '',
        phone_number: '',
        email: '',
        address1: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        pet_ownership: '',
        breed: '',
        past_pet: '',
        home_ownership: '',
        signature: '',
    });
    const navigate = useNavigate();
    const { user, token } = useContext(UserContext);
    const { application_id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/applications/${application_id}/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Check if the response is successful
            if (!response.ok) {
                console.error('Error fetching data:', response.statusText);
                navigate("/home");
                return;
            }

            // Parse the JSON data from the response
            const data = await response.json();

            // Update form data state with the fetched data
            setFormData(data);
        }

        fetchData();
    }, [application_id, user]);
    console.log('formData', formData)
    console.log('formData.petName', formData.petName)


    return (
        <section id="application">
            <form action="https://postman-echo.com/post" className="mb-4 m-3 shadow form">
                <div className="bg-white border border-gray-200 p-4 sm:p-7 rounded-lg" style={{ maxWidth: '100%' }}>

                    <div className="grid-cols-2 sm:grid md:grid-cols-1 gap-4">
                        <label htmlFor="pet_name" className="mt-1 p-2 block font-bold text-gray-700">Name of Pet You Wish to Adopt:<span className="text-red-500">*</span></label>
                        <div className="mb-4">
                            <input
                                type="text"
                                id="pet_name"
                                name="pet_name"
                                className="mt-1 p-2 w-full border rounded-md"
                                readOnly
                                defaultValue={formData.pet_name}
                            />
                        </div>

                        <label htmlFor="owner_name" className="mt-1 p-2 block font-bold text-gray-700">Your Name:<span className="text-red-500">*</span></label>
                        <div className="mb-4">
                            <input type="text" id="owner_name" name="owner_name" className="mt-1 p-2 w-full border rounded-md" value={formData.owner_name} readOnly />
                        </div>

                        <label htmlFor="phone_number" className="mt-1 p-2 block font-bold text-gray-700">Phone Number:<span className="text-red-500">*</span></label>
                        <div className="mb-4">
                            <div className="grid-cols-2 sm:grid md:grid-cols-1 gap-4">
                                <input
                                    type="text"
                                    id="area_code"
                                    name="area_code"
                                    className="mt-1 p-2 w-full border rounded-md"
                                    readOnly
                                    value={formData.area_code}
                                />
                                <input
                                    type="text"
                                    id="phone_number"
                                    name="phone_number"
                                    className="mt-1 p-2 w-full border rounded-md"
                                    readOnly
                                    value={formData.phone_number}
                                />
                            </div>
                        </div>

                        <label htmlFor="email" className="mt-1 p-2 block font-bold text-gray-700">Email:<span className="text-red-500">*</span></label>
                        <div className="mb-4">
                            <input type="text" id="email" name="email" className="mt-1 p-2 w-full border rounded-md" value={formData.email} readOnly />
                        </div>

                        <label htmlFor="address" className="mt-1 p-2 block font-bold text-gray-700">Address:<span className="text-red-500">*</span></label>
                        <div className="mb-4">
                            <div className="grid-cols-1 sm:grid md:grid-cols-1">
                                <input type="text" id="street_address1" name="street_address1" className="mb-4 p-2 w-full border rounded-md" value={formData.address1} readOnly />
                                <input type="text" id="street_address2" name="street_address2" className="mb-4 p-2 w-full border rounded-md" value="" readOnly />
                                <div className="grid-cols-2 sm:grid md:grid-cols-1 gap-4">
                                    <input type="text" id="city" name="city" className="mb-3 p-2 w-full border rounded-md" value={formData.city} readOnly />
                                    <input type="text" id="Province" name="Province" className="mb-4 p-2 w-full border rounded-md" value={formData.state} readOnly />
                                </div>
                                <div className="grid-cols-2 sm:grid md:grid-cols-1 gap-4">
                                    <input type="text" id="postal_code" name="postal_code" className="mb-4 p-2 w-full border rounded-md" value={formData.zip} readOnly />
                                    <select id="country" className="mb-4 p-2 w-full border rounded-md" disabled>
                                        <option value="select">Country</option>
                                        <option value={formData.country} selected>
                                            {formData.country}
                                        </option>
                                        <option value="United States of America">United States of America</option>
                                        {/* Add more options as needed */}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <label htmlFor="pet_ownership" className="mt-1 p-2 block font-bold text-gray-700">Do you own any pets?<span className="text-red-500">*</span></label>
                        <div className="mb-4">
                            <div className="justify-center mb-4">
                                <div>
                                    <label className="block mb-2">
                                        <input
                                            type="radio"
                                            className="form-radio text-blue-600"
                                            name="pet_ownership"
                                            value="Yes"
                                            checked={formData.pet_ownership === 'yes'}
                                            disabled
                                        />
                                        <span className="ml-2">Yes</span>
                                    </label>

                                    <label className="block">
                                        <input
                                            type="radio"
                                            className="form-radio text-red-600"
                                            name="pet_ownership"
                                            value="No"
                                            checked={formData.pet_ownership === 'no'}
                                            disabled
                                        />
                                        <span className="ml-2">No</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <label htmlFor="breed" className="mt-1 p-2 block font-bold text-gray-700">If yes, name the breed and age.</label>
                        <div className="mb-4">
                            <textarea
                                type="breed"
                                id="breed"
                                name="breed"
                                className="mt-1 p-2 w-full border rounded-md align-top"
                                style={{ resize: 'none', height: '200px' }}
                                readOnly
                                value={formData.breed}
                            />
                        </div>

                        <label htmlFor="past_pet" className="mt-1 p-2 block font-bold text-gray-700">Have you had a pet in the past? If yes, what animal and for how long?<span className="text-red-500">*</span></label>
                        <div className="mb-4">
                            <textarea
                                type="text"
                                id="past_pet"
                                name="past_pet"
                                className="mt-1 p-2 w-full border rounded-md"
                                style={{ resize: 'none', height: '200px' }}
                                readOnly
                                value={formData.past_pet}
                            />
                        </div>

                        <label htmlFor="pet_ownership" className="mt-1 p-2 block font-bold text-gray-700">Do you own or rent your home?<span className="text-red-500">*</span></label>
                        <div className="mb-10">
                            <div className="justify-center mb-4">
                                <div>
                                    <label className="block mb-2">
                                        <input
                                            type="radio"
                                            className="form-radio text-blue-600"
                                            name="home_ownership"
                                            value="own"
                                            checked={formData.home_ownership === 'own'}
                                            disabled
                                        />
                                        <span className="ml-2">Own</span>
                                    </label>

                                    <label className="block">
                                        <input
                                            type="radio"
                                            className="form-radio text-red-600"
                                            name="home_ownership"
                                            value="rent"
                                            checked={formData.home_ownership === 'rent'}
                                            disabled
                                        />
                                        <span className="ml-2">Rent</span>
                                    </label>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="flex justify-start mb-10">
                        <input type="checkbox" className="form-checkbox text-indigo-600 mr-3" checked disabled />
                        <p className="input-left-text" required>I have read and agree to the terms and conditions.</p>
                    </div>

                    <div className="flex justify-start p-2 mb-20">
                        <ul className="list-disc ml-4">
                            <li className="font-bold mb-4">
                                I agree to adopt the pet if the application is accepted, and will pay the adoption fee as necessary.
                            </li>
                            <li className="font-bold mb-4">
                                I understand that there can be additional documents to complete after the application is submitted.
                            </li>
                            <li className="font-bold">
                                By clicking the submit button, I verify all of the above information is true and accurate.
                            </li>
                        </ul>
                    </div>

                    <div className="flex items-center mb-4">
                        <label htmlFor="signature" className="block mt-1 p-2 font-bold text-gray-700 mr-4">Signature<span className="text-red-500">*</span></label>
                        <input type="text" id="signature" name="signature" className="block mt-1 p-2 w-full border rounded-md" style={{ width: '100%' }} value={formData.signature} readOnly />
                    </div>

                </div>
            </form>
        </section>
    );
};

export default FormApplication;