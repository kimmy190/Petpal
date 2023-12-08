import ProfileDropZone from "../ProfileDropZone";
import Input from "../Input";
import FormPage from "../FormPage";
import { useFormik } from 'formik';
import { useUserContext } from "../../contexts/UserContext";
import { useState } from 'react';


const SeekerSetting = ()=>{
    const { user, setUser } = useUserContext();

    const [profileImg, setProfileImg] = useState(null);
    const [userError, setUserError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [pwError, setPwError] = useState(null);

    const handleFileChange = (selectedFile) => {

        setProfileImg(selectedFile);

    };

    return (
        <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-md md:mt-0 sm:max-w-xl xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                {/* Gonna b the title */}
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                    Settings
                </h1>
            {/* <form onSubmit={formik.handleSubmit}> */}
            <form >
                <ProfileDropZone title="Upload Profile Picture" onProfileImgChange={handleFileChange}/>
                
                <div className="grid gap-6 mb-2 md:grid-cols-2">
                    <div>
                        <Input 
                        label="First name"
                        id="first_name"
                        type="text"
                        placeholder="Sean"
                        required
                        // onChange={formik.handleChange}
                        value={user.first_name}
                        />
                    </div>
                    
                    <div>
                    <Input 
                        label="Last name"
                        id="last_name"
                        type="text"
                        placeholder="Song"
                        required
                        // onChange={formik.handleChange}
                        value={user.last_name}
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
                    // onChange={formik.handleChange}
                    value={user.username}
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
                    // onChange={formik.handleChange} // Pass the custom function
                    value={user.location}
                />
                </div>
                
                <div className="mb-2">
                <Input
                    label="Email address"
                    id="email"
                    type="email"
                    placeholder="sean.song@gmail.com"
                    required
                    // onChange={formik.handleChange} // Pass the custom function
                    value={user.email}
                />
                    {emailError && <p className="mt-2 text-xs text-red-600">{emailError}</p>}

                </div>
                <div className="mb-2">
                    <Input
                        label="Password"
                        id="password"
                        type="password"
                        placeholder="•••••••••"
                        required
                        // onChange={formik.handleChange} // Pass the custom function
                        // value={formik.values.password}
                        value=""
                    />
                </div>
                <div className="mb-2">
                <Input
                    label="Confirm Password"
                    id="password2"
                    type="password"
                    placeholder="•••••••••"
                    required
                    // onChange={formik.handleChange} // Pass the custom function
                    // value={user.password2}
                    value=""
                />
                    {pwError && <p className="mt-2 text-xs text-red-600">{pwError}</p>}

                    
                </div>
                <div className="flex items-start mb-5">
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
                    <span className="text-blue-600 hover:underline">
                        terms and conditions
                    </span>
                    .
                    </label>
                </div>
                <div>
                    <button
                    type="submit"
                    className="text-white mb-5 bg-blue-500 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-medium w-full sm:w-full px-5 py-2.5 text-center"
                    >
                    Sign Up
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