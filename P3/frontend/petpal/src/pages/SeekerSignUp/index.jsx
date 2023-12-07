import FormPage from "../../components/FormPage"; 
import { useFormik } from 'formik';
import Input from "../../components/Input";
import { useState } from 'react';

// const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     // Perform any necessary logic with the selected file
// };

const SeekerSignUp = () => {
    
    const [profileImg, setProfileImg] = useState(null);
    const [userError, setUserError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [pwError, setPwError] = useState(null);
    
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile);
        
        const profileBlobUrl = URL.createObjectURL(selectedFile); 
        console.log(profileBlobUrl);

        // setProfileImg(URL.createObjectURL(selectedFile));
        setProfileImg(selectedFile);

    };
    
    
    const formik = useFormik({
        initialValues: {
          first_name: '',
          last_name: '',
          username: '', 
          location: '', 
          email: '',
          password: '', 
          password2: '', 
        },

        onSubmit: async (values) => {
            // Wait for profileImg to update
            // await new Promise((resolve) => setTimeout(resolve, 0));
            const formData = new FormData();
            // formData.append('first_name', values.first_name);
            // formData.append('last_name', values.last_name);
            // formData.append('username', values.username);
            // formData.append('location', values.location);
            // formData.append('email', values.email);
            // formData.append('password', values.password);
            // formData.append('password2', values.password2);
            // console.log(values)

            // if (profileImg) {
                // const blobFile = await fetch(profileImg).then((res) => res.blob());
            formData.append('profile_img', profileImg, profileImg.name);
                // console.log(formData.Input.FormData.profileImg);
            // }
            
            console.log("all entires");
            // for (let entry of formData.entries()) {
            //     console.log(entry);
            // }
            Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
            });
            // console.log(formData)
        
            // const updatedValues = { ...values, profile_img:profileImg };
            // console.log(JSON.stringify(updatedValues));
            // alert(JSON.stringify(updatedValues, null, 2));
            for (const [key, value] of formData.entries()) {
                console.log(key, value);
            }
            
            const response = await fetch('http://127.0.0.1:8000/accounts/seeker/', {
                method: 'POST',
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
                setUserError(data.username? data.username : null);
                setEmailError(data.email? data.email : null); 
                setPwError(data.password? data.password : null); 
            } else {
                console.log(data); 
                setUserError(null);
                setEmailError(null); 
                setPwError(null);

                // based on the data, need to login and navigate to main page
            }
        },
    });

    // useEffect(() => {
    //     if (profileImg) {
    //       // Trigger form submission
    //             handleFileChange(); 
    //         }
    //     }, []);

    return (
        <FormPage title="Seeker Sign Up">
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <div className="flex items-center justify-center w-full mb-1">
                        <label
                            // htmlFor="dropzone-file"
                            htmlFor="profileImg"
                            className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-full cursor-pointer w-14 h-14 bg-gray-50 hover:bg-gray-100"
                        >
                        <div className="flex flex-col items-center">
                            
                        {profileImg ? (
                            <img
                                src={URL.createObjectURL(profileImg)}
                                alt="profile"
                                className="object-cover rounded-full w-14 h-14"
                            />
                        ) : (
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
                        )}
                        
                        </div>
                        <input 
                            id="profileImg" 
                            type="file" 
                            className="hidden"
                            onChange={handleFileChange} />
                    </label>
                    </div>
                    <p className="block text-sm font-normal text-center text-gray-700">
                    Upload Profile Pic
                    </p>
                </div>
                
                <div className="grid gap-6 mb-4 md:grid-cols-2">
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
                <div className="mb-4">
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
                
                <div className="mb-4">
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
                
                <div className="mb-4">
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
                <div className="mb-4">
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
                <div className="mb-3">
                <Input
                    label="Confirm Password"
                    id="password2"
                    type="password"
                    placeholder="•••••••••"
                    required
                    onChange={formik.handleChange} // Pass the custom function
                    value={formik.values.password2}
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
                <div className="mb-2">
                    <p className="text-sm font-medium text-gray-500">
                    Not a Pet Seeker?{" "}
                    <a
                        href="./first_shelter_signup.html"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Pet Shelter Sign Up
                    </a>
                    </p>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">
                    Already have an account?{" "}
                    <a
                        href="./login.html"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Login
                    </a>
                    </p>
                </div>
            </form>
        </FormPage>
    );
}

export default SeekerSignUp;