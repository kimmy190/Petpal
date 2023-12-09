import ProfileDropZone from "../ProfileDropZone";
import Input from "../Input";
import FormPage from "../FormPage";
import { useFormik } from 'formik';
import { useUserContext } from "../../contexts/UserContext";
import { useState } from 'react';
import FilledProfileDropZone from "../FilledProfileDropZone";
import { useNavigate, Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useToken } from "../../contexts/UserContext";

// import Cookies from 'universal-cookie';

const SeekerSetting = ()=>{
    const { user, setUser, token } = useUserContext();
    // const cookies = new Cookies();
    // const token = useToken(); 

    // const navigate = useNavigate();   
    // const history = useHistory();  
    
    const [profileImg, setProfileImg] = useState(null);
    const [userError, setUserError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [pwError, setPwError] = useState("");

    const [formKey, setFormKey] = useState(0);


    const handleFileChange = (selectedFile) => {
        setProfileImg(selectedFile);
        // formik.setFieldValue('profile_img', selectedFile);
        
    };
    let pwErrorString = ""; 
    let pwErrorElement; 

    const formik = useFormik({
        key: formKey, // will reinitalize the value of the form 
        initialValues: {
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username, 
          location: user.location, 
          email: user.email,
            password: "",
            password2: "",
        //   profile_img: user.profile_image, 
        },

        onSubmit: async (values) => {
            console.log("being called"); 

            const formData = new FormData();
            console.log("all form value before appending"); 
            
            for (const [key, value] of formData.entries()) {
                console.log(key, value);
            }
            const prev_img = user.profile_image; 
            console.log("image store in user : " + prev_img); 
            // console.log("submitted file " + profileImg.name ? profileImg.name : null); 
            
            if(profileImg){
                if(prev_img !== profileImg.name){
                    formData.append('profile_image', profileImg, profileImg.name);
                }
            }
            
            // formData.append('profile_img', profileImg, profileImg.name);

            console.log("all entires");
            // for (let entry of formData.entries()) {
            //     console.log(entry);
            // }
            Object.keys(values).forEach((key) => {
                // if (values[key] !== formik.initialValues[key]) {
                if (values[key] !== user[key]) {
                    formData.append(key, values[key]);
                }
            });

            
            // console.log(formData)
        
            // const updatedValues = { ...values, profile_img:profileImg };
            // console.log(JSON.stringify(updatedValues));
            // alert(JSON.stringify(updatedValues, null, 2));
            console.log("all form value"); 
            for (const [key, value] of formData.entries()) {
                console.log(key, value);
            }
            console.log(token); 
            const response = await fetch(`/accounts/seeker/${user.id}/`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                // body: JSON.stringify(updatedValues),
                body:formData,
            });

            const data = await response.json();
            console.log(data);
            
            if(!response.ok){
                // login unsuccessful 
                setUserError(data.username? data.username : "");
                setEmailError(data.email? data.email : ""); 
                setPwError(data.password? data.password : ""); 

            } else {
                console.log(data); 
                setUserError("");
                setEmailError(""); 
                setPwError("");
                setUser(data); 
                setFormKey((prevKey) => prevKey + 1);
                // window.location.reload();
                // formik.handleSubmit(); 
                
                // update the value 
                // navigate to current page 
                // history.push(history.location.pathname);
            }
        },
    });

    return (
        <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-md md:mt-0 sm:max-w-xl xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                {/* Gonna b the title */}
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                    Settings
                </h1>
            <form onSubmit={formik.handleSubmit}>
                <FilledProfileDropZone title="Upload Profile Picture" onProfileImgChange={handleFileChange}/>
                
                <div className="grid gap-6 mb-2 md:grid-cols-2">
                    <div>
                        <Input 
                        label="First name"
                        id="first_name"
                        type="text"
                        placeholder="Sean"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.first_name}
                        />
                    </div>
                    
                    <div>
                    <Input 
                        label="Last name"
                        id="last_name"
                        type="text"
                        placeholder="Song"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.last_name}
                    />
                    </div>
                </div>
                <div className="mb-2">
                    <Input 
                    label="Username"
                    id="username"
                    type="text"
                    placeholder=""
                    required
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    v
                    />
                    {userError && <p className="mt-2 text-xs text-red-600">{userError}</p>}

                </div>
                
                <div className="mb-2">
                    <Input
                    label="Location"
                    id="location"
                    type="text"
                    placeholder="Canada"
                    required
                    onChange={formik.handleChange} // Pass the custom function
                    value={formik.values.location}
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
                <div className="mb-2">
                    <Input
                        label="Password"
                        id="password"
                        type="password"
                        placeholder=""
                        required
                        onChange={formik.handleChange} // Pass the custom function
                        value={formik.values.password}
                    />
                </div>
                <div className="mb-4">
                <Input
                    label="Confirm Password"
                    id="password2"
                    type="password"
                    placeholder=""
                    required
                    onChange={formik.handleChange} // Pass the custom function
                    value={formik.values.password2}
                />  
                
                {/* { pwErrorString.includes('[') && (
                    {pwErrorElement}
                        ) : (
                            <p className="mt-2 text-xs text-red-600">{pwError}</p>
                        )}
                    // </div>
                    )} */}
                    
                    
                {pwError.includes('This password is too short.')? 
                <p className="mt-2 text-xs text-red-600">
                This password is too short. It must contain at least 8 characters.
                </p> : 
                (<p className="mt-2 text-xs text-red-600">{pwError[0]}</p>)  
                
                    }

                </div>

                <div className="mb-4">
                <p className="block font-medium text-gray-900">Preferences</p>
                <hr /> {/* TODO style me */}
                <div className="mt-2">
                <label className="inline-flex items-center">
                    <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="block text-sm font-medium text-gray-900 ml-2">
                    I wish to be sent emails about new pets available for adoption
                    </span>
                </label>
                </div>
                <div className="mt-2">
                <label className="inline-flex items-center">
                    <input
                    id="default-checkbox"
                    type="checkbox"
                    defaultValue=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="block  text-sm font-medium text-gray-900 ml-2">
                    I wish to be sent emails about updates to my ongoing adoptions
                    </span>
                </label>
                </div>
            </div>

                
    {/* BUTTONS */}
        <div className="flex flex-row gap-4">
            <button
            type="button"
            className="py-2.5 px-5 mr-2 mb-5 text-medium font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 w-1/2"
            >
            <Link to="/main" href="./main_after_login.html">Cancel</Link>
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



export default SeekerSetting; 