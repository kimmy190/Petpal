import FormPage from "../../components/FormPage";
import { useFormik } from 'formik';
import Input from "../../components/Input";
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import ProfileDropZone from "../../components/ProfileDropZone";
import FormLink from "../../components/FormLink";

const ShelterSignUp = () =>{    
    const navigate = useNavigate(); 

    const [formContent, setFormContent] = useState(1);
    const [profileImg, setProfileImg] = useState(null);
    const [shelterImgs, setShelterImgs] = useState([]);
    
    // ERROR FIELDS 
    const [userError, setUserError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [pwError, setPwError] = useState(null);
    const [phoneError, setPhoneError] = useState(null);


    const handlePrevClick = () => {
        setFormContent((prevContent) => Math.max(prevContent - 1, 1));
    };

    const handleFileChange = (selectedFile) => {
            setProfileImg(selectedFile);
        };

    const handleShelterFileChange = (e) => {
        const selectedFiles = e.target.files;
        setShelterImgs(Array.from(selectedFiles));
    };

    const handleShelterChange = (field, value) => {
        formik.setFieldValue(`shelter.${field}`, value);
        };
    
    const formik = useFormik({
        initialValues: {
            username: '', 
            email: '',
            password: '', 
            password2: '', 
            shelter: {
                organization_name: '',
                phone_number: '',
                mission_statement: '', 
                country: '', 
                address1: '',
                address2: '',
                city: '',
                state: '',
                zip: '', 
            }, 
        },

        onSubmit: async (values) => {
            // Wait for profileImg to update
            // await new Promise((resolve) => setTimeout(resolve, 0));
            const formData = new FormData();
            // formData.append('profile_img', profileImg, profileImg.name);
            formData.append('shelter.logo_image', profileImg, profileImg.name ?profileImg.name : null  );
            
            shelterImgs.forEach((img, index) => {
                formData.append(`shelter.images[${index}]`, img, img.name? img.name : null);
            });

            const appendToFormData = (data, prefix = '') => {
                Object.entries(data).forEach(([key, value]) => {
                    const fieldName = prefix ? `${prefix}.${key}` : key;
                    if (value instanceof File) {
                        formData.append(fieldName, value, value.name);
                    } else if (value instanceof Object) {
                        appendToFormData(value, fieldName);
                    } else {
                        formData.append(fieldName, value);
                    }
                });
            };
        
            appendToFormData(values);

            // will print out all the entries, including the next 
            for (const [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            
            const response = await fetch('/accounts/shelter/', {
                method: 'POST',
                body:formData,
            });

            const data = await response.json();
            console.log(data);
            
            if(!response.ok){
                // login unsuccessful 
                setUserError(data.username? data.username : null);
                setEmailError(data.email? data.email : null); 
                setPwError(data.password? data.password : null); 
                setPhoneError(data.shelter.phone_number? data.shelter.phone_number : null); 
                
            } else {
                // console.log(data); 
                setUserError(null);
                setEmailError(null); 
                setPwError(null);
                setPhoneError(null); 
                navigate("/login");
            }
        },
    });

    const handleNextClick = () => {
        // called when next button pressed 
        const errors = formik.validateForm(formik.values);
        
        if (Object.keys(errors).length === 0) {
            setFormContent((prevContent) => prevContent + 1);
        } else {
            // Optionally, you can show an error message or handle the case when the form is not valid.
            console.alert("Please fill out all required fields on page 1.");
        }
    };
    
    const formContentComponents = {
    1: (<>
    <ProfileDropZone title="Upload Shelter Logo" onProfileImgChange={handleFileChange}/>
    {/* Organization Name */}
    <div className="mb-2">
        <Input
        label="Organization Name"
        id="org-name"
        type="text"
        placeholder="Toronto Community Centre"
        required 
        onChange={(e) => handleShelterChange('organization_name', e.target.value)}
        value={formik.values.shelter.organization_name}
        />
            
        </div>
        {/* Username */}
        <div className="mb-2">
            <Input 
            label="Username"
            id="username"
            type="text"
            placeholder=""
            required
            onChange={formik.handleChange}
            value={formik.values.username}
            />
            {userError && <p className="mt-2 text-xs text-red-600">{userError}</p>}
            </div>
        {/* Phone Number */}
        <div className="mb-2">
        <Input 
            label="Phone Number"
            id="phone"
            type="tel"
            placeholder="123-456-7890"
            required
            onChange={(e) => handleShelterChange('phone_number', e.target.value)}   
            value={formik.values.shelter.phone_number}
            />
            {phoneError && <p className="mt-2 text-xs text-red-600">{phoneError}</p>}
        </div>
        {/* Shelter gallery */}
        <div className="mb-2">
            <p className="block mb-2 text-sm font-medium text-gray-900">
            Upload Shelter Pictures
            </p>
            <div className="flex justify-center mb-2">
            <div>
                <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer w-14 h-14 sm:w-16 sm:h-16 bg-gray-50 hover:bg-gray-100"
                >
                <div className="flex flex-col items-center">
                    <svg
                    className="object-center w-6 h-6 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                    >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                    </svg>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={handleShelterFileChange}/>
                </label>
            </div>
            </div>
        </div>
        
        {/* Mission Statement */}
        <div className="mb-2">
            <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900"
            >
                Mission Statement
            </label>
            <textarea
                id="message"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your Mission Statements"
                value={formik.values.shelter.mission_statement}
                onChange={(e) => handleShelterChange('mission_statement', e.target.value)}   
            />
            </div>
            {/* Right Arrow */}
            <div className="flex justify-end">
                <button
                type="button"
                onClick={handleNextClick}
                className="text-black hover:text-blue-700 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2"
                >
                {/* <a href="./sec_shelter_signup.html"> */}
                    <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                    >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                    </svg>
                    <span className="sr-only">right arrow</span>
                {/* </a> */}
                </button>
            </div>
        </>),
    2: (<>
        <div className="mb-2">
        <Input
            label="Email address"
            id="email"
            type="email"
            placeholder="toronto.shelter@community.ca"
            required
            onChange={formik.handleChange} // Pass the custom function
            value={formik.values.email}
            />
            {emailError && <p className="mt-2 text-xs text-red-600">{emailError}</p>}
    </div>
    {/* Password */}
    <div className="grid gap-3 md:grid-cols-2">
        <div className="mb-2">
        <Input
                label="Password"
                id="password"
                type="password"
                placeholder="•••••••••"
                required
                onChange={formik.handleChange} // Pass the custom function
                value={formik.values.password}
                />
        </div>
        <div className="mb-2">
            <Input
            label="Confirm Password"
            id="password2"
            type="password"
            placeholder="•••••••••"
            required
            onChange={formik.handleChange} // Pass the custom function
            value={formik.values.password2}
            />
        </div>
        {pwError && <p className="mt-2 text-xs text-red-600">{pwError}</p>}
    </div>
    {/* Address Section */}
    <div className="mb-4">
        <p className="block mb-2 text-sm font-medium text-gray-900">Address</p>
        {/* country */}
        <Input
                label=""
                id="country"
                type="text"
                placeholder="Country"
                required
                onChange={(e) => handleShelterChange('country', e.target.value)}   
                value={formik.values.shelter.country}
            />
        {/* address line 1 */}
        <Input
                label=""
                id="addr1"
                type="text"
                placeholder="Address Line 1"
                required
                onChange={(e) => handleShelterChange('address1', e.target.value)}   
                value={formik.values.shelter.address1}
            />
        {/* address line 2 */}
        <Input
                label=""
                id="addr2"
                type="text"
                placeholder="Address Line 2"
                required
                onChange={(e) => handleShelterChange('address2', e.target.value)}   
                value={formik.values.shelter.address2}
            />
        {/* city &province */}
        <div className="grid gap-x-2 md:gap-y-2 md:grid-cols-2">
        <div>
        <Input
                    label=""
                    id="city"
                    type="text"
                    placeholder="City/Town"
                    required
                    onChange={(e) => handleShelterChange('city', e.target.value)}   
                    value={formik.values.shelter.city}
                    />
        </div>
        <div>
            <Input
                label=""
                id="state"
                type="text"
                placeholder="State/Province"
                required
                onChange={(e) => handleShelterChange('state', e.target.value)}   
                value={formik.values.shelter.state}
                />
        </div>
        </div>
        {/* zip postal code */}
        <Input
            label=""
            id="zip"
            type="text"
            placeholder="ZIP/Postal Code"
            required
            onChange={(e) => handleShelterChange('zip', e.target.value)}   
            value={formik.values.shelter.zip}
        />
    </div>
    {/* Consent Statement */}
    <div className="flex items-start mb-2">
        <div className="flex items-center h-5">
        <input
            id="remember"
            type="checkbox"
            defaultValue=""
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
            required=""
        />
        </div>
        <label
        htmlFor="remember"
        className="ml-2 text-sm font-medium text-gray-900 "
        >
        I agree with the{" "}
        <a href="#" className="text-blue-600 hover:underline">
            terms and conditions
        </a>
        .
        </label>
    </div>
    {/* Arrow */}
    <div className="mb-2">
        <button
        type="button"
        onClick={handlePrevClick}
        className="text-black hover:text-blue-700 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2"
        >
        
            <svg
            className="w-5 h-5 text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
            >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5H1m0 0 4 4M1 5l4-4"
            />
            </svg>
        <span className="sr-only">left arrow</span>
        </button>
    </div>
    {/* Sign up button */}
    <button
        type="submit"
        className="text-white mb-5 bg-blue-500 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-medium w-full sm:w-full px-5 py-2.5 text-center"
        >
        Sign Up
        </button>


    {/* <a href="./shelter_signup_error.html"> */}
        {/* apparently later change this to button */}
        {/* <div className="text-white mb-5 bg-blue-700 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-medium w-full sm:w-full px-5 py-2.5 text-center"> */}
        {/* later give this type="submit" */}
        {/* when get rid of the a tag inside button, will not proceed to main after login */}
        {/* </div> */}
    {/* </a> */}
    </>
    )};

    return (

    <FormPage title="Shelter Sign Up">
    <form onSubmit={formik.handleSubmit}>

        <div id="form-content">
        {formContentComponents[formContent]}
        </div>
    {/* below the arrow button  */}
    <FormLink who="shelter"/>
    </form>
    </FormPage>
    );
}

export default ShelterSignUp; 