import FormPage from "../../components/FormPage"; 
import { useFormik } from 'formik';
import Input from "../../components/Input";
import { useState } from 'react';
import Cookies from 'universal-cookie'; 
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate, Link} from 'react-router-dom';
import ProfileDropZone from "../../components/ProfileDropZone";
import FormLink from "../../components/FormLink";
// const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     // Perform any necessary logic with the selected file
// };

const SeekerSignUp = () => {
    const cookies = new Cookies(); 
    const navigate = useNavigate(); 
    const { setUser } = useUserContext();
    
    const [profileImg, setProfileImg] = useState(null);
    const [userError, setUserError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [pwError, setPwError] = useState(null);

    const handleFileChange = (selectedFile) => {
        // const selectedFile = e.target.files[0];
        // console.log(selectedFile);
        
        // const profileBlobUrl = URL.createObjectURL(selectedFile); 
        // console.log(profileBlobUrl);

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
            
            const response = await fetch('/accounts/seeker/', {
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
                navigate("/login");
            }
        },
    });

    return (
        <FormPage title="Seeker Sign Up">
            <form onSubmit={formik.handleSubmit}>
                <ProfileDropZone title="Upload Profile Picture" onProfileImgChange={handleFileChange}/>
                
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
                <FormLink who="seeker"/>
            </form>
        </FormPage>
    );
}

export default SeekerSignUp;