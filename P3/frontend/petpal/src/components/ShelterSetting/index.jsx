import FormPage from "../../components/FormPage";
import { useFormik } from 'formik';
import Input from "../../components/Input";
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import FilledProfileDropZone from "../FilledProfileDropZone";
// import ProfileDropZone from "../../components/ProfileDropZone";
import FormLink from "../../components/FormLink";
import { useUserContext } from "../../contexts/UserContext";
import { useToken } from "../../contexts/UserContext";

const ShelterSetting = () => {
    const { user, setUser } = useUserContext(); 
    const shelter = user.shelter; 
    const token = useToken(); 

    const [profileImg, setProfileImg] = useState(null);
    const [shelterImgs, setShelterImgs] = useState([]);
    
    // ERROR FIELDS 
    const [userError, setUserError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [pwError, setPwError] = useState(null);
    const [phoneError, setPhoneError] = useState(null);

    // const [formKey, setFormKey] = useState(0);


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
            username: user.username, 
            email: user.email,
            password: user.password, 
            password2: user.password2, 
            shelter: {
                organization_name: shelter.organization_name,
                phone_number: shelter.phone_number,
                mission_statement: shelter.mission_statement, 
                country: shelter.country, 
                address1: shelter.address1,
                address2: shelter.address2,
                city: shelter.city,
                state: shelter.state,
                zip: shelter.zip, 
            }, 
        },

        onSubmit: async (values) => {
            // Wait for profileImg to update
            // await new Promise((resolve) => setTimeout(resolve, 0));
            const formData = new FormData();
            const prefix = "http://127.0.0.1:8000/images/logo_images/";
            // formData.append('profile_img', profileImg, profileImg.name);
            const prev_img = user.shelter.logo_image.substring(prefix.length); 
            console.log(prev_img); 
            
            if(profileImg){
                if(profileImg.name !== prev_img){
                    formData.append('shelter.logo_image', profileImg, profileImg.name ?profileImg.name : null  );
                }
            }
            // shelterImgs.forEach((img, index) => {
            //     formData.append(`shelter.images[${index}]`, img, img.name? img.name : null);
            // });
            // const formValues = formik.values;
            // const initialValues = user;
            // const appendToFormData = (data, prefix = '') => {

            //     Object.entries(data).forEach(([key, value]) => {
            //         const fieldName = prefix ? `${prefix}.${key}` : key;
            //         if (formValues[fieldName] !== user[fieldName]) {
            //             if (value instanceof File) {
            //                 formData.append(fieldName, value, value.name);
            //             } else if (value instanceof Object) {
            //                 appendToFormData(value, fieldName);
            //             } else {
            //                 formData.append(fieldName, value);
            //             }
            //         }
            //     });
            // };
            // Object.keys(values).forEach((key) => {
            //     if (user[key] !== undefined && values[key] !== user[key]) {
            //         formData.append(key, values[key]);
            //     }
            //   });
            // Object.keys(values).forEach((key) => {
            //     // if (values[key] !== formik.initialValues[key]) {
            //     if(key === "shelter"){
            //         Object.keys(values.shelter).forEach((key) => {
            //             if (values.shelter[key] !== user.shelter[key]) {
            //                 values.shelter[key] = user.shelter[key];
            //             }
            //         });
            //     }
            //     if (values[key] !== user[key]) {
            //         formData.append(key, values[key]);
            //     }
            // });
            Object.keys(values).forEach((key) => {
                if (key === 'shelter') {
                  Object.keys(values.shelter).forEach((shelterKey) => {
                    if(values.shelter[shelterKey] !== user.shelter[shelterKey]){
                        formData.append(`shelter.${shelterKey}`, values.shelter[shelterKey]);
                    }
                    
                  });
                } else {
                    if (values[key] !== user[key]){
                        formData.append(key, values[key]);
                    }
                
                }
              });
        
            // appendToFormData(values);

            // will print out all the entries, including the next 
            console.log("this is start of form daata ")
            for (const [key, value] of formData.entries()) {
                
                console.log(`${key}: ${value}`);
            }
            
            const response = await fetch(`/accounts/shelter/${user.shelter.id}/`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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
                setUser(data); 
                
                // navigate("/login");
            }
        },
    });


    return (
        <section className="bg-gray-100">
            {/* //        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"> */}

        <div className="flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full bg-white rounded-lg shadow-md md:mt-0 sm:max-w-xl xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                {/* Gonna b the title */}
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                    Settings
                </h1>
    <form onSubmit={formik.handleSubmit}>
        <FilledProfileDropZone title="Upload Shelter Logo" onProfileImgChange={handleFileChange}/>
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

        <div className="mb-2">
        <Input
            label="Email address"
            id="email"
            type="email"
            placeholder="sean.song@gmail.com"
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
    {/* BUTTONS */}
    <div className="flex flex-row gap-4 mt-2">
            <button
            type="button"
            className="py-2.5 px-5 mr-2 mb-5 text-medium font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 w-1/2"
            >
            <a href="./main_after_login.html">Cancel</a>
            {/* when get rid of the a tag inside button, will not proceed to main after login */}
            </button>
            <button
            type="submit"
            className="text-white mb-5 bg-blue-500 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-medium w-1/2 px-5 py-2.5 text-center"
            >
            Update
            {/* when get rid of the a tag inside button, will not proceed to main after login */}
            </button>
    </div>
    </form>

            </div>
            </div>
            </div>
    </section>
    );

}

export default ShelterSetting; 