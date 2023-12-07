import FormPage from "../../components/FormPage"; 
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext, UserContext } from "../../contexts/UserContext";

const Login = () => {
    const { user, token, setToken, setUser } = useUserContext();
    console.log('Component is re-rendered!');
    
    let navigate = useNavigate(); 
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage1, setErrorMessage1] = useState(null);
    const [errorMessage2, setErrorMessage2] = useState(null);

    // const [userData, setUserData] = useState({ user, token });


    // useEffect(() => {
    //     // both user & token info updated
    //     // console.log("Updated userName:", userData.user);
    //     // console.log("Updated token:", userData.token);
    //     navigate("/main");  
    // }, [userData]);

    useEffect(() => {
        // setUserData({ user, token });
        if (user !== null && token !== "") {
            console.log(user); 
            console.log(token);
            navigate("/main");
        }
    }, [user, token]);

    const LoginSubmit = async(e) => {
        e.preventDefault(); //prevents from page reload 

        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });
        const data = await response.json();

        if (!response.ok) {
            // login unsuccessful 
            if(response.status === 400) {
                setErrorMessage1(data.username? data.username : null);
                setErrorMessage2(data.password? data.password : null); 
            } else if(response.status === 401){
                setErrorMessage1(null);
                setErrorMessage2(data.detail); 
            }
            // console.log(data.detail);
        } else {
            // login success
            console.log('Authentication successful', data);
            setErrorMessage1(null);
            setErrorMessage2(null);
            // update the token 
            // const id = data.user_id; 
            let user_info; 
            if(data.is_shelter === 1){
                user_info = {
                    shelter: {id: data.user_id}
                }
            } else {
                user_info = {
                    seeker: {id: data.user_id}
                }
            }

            setUser(user_info); 
            // const accessToken = data.access;
            setToken(data.access); 
        }
    }

    return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
    <FormPage title="Log In">
        <form className="space-y-4 md:space-y-6" onSubmit={LoginSubmit}>
            <div>
                <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                >
                    Username
                </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type your username"
                    required=""
                    value={username} onChange={(e) => setUsername(e.target.value)}
                />
                {errorMessage1 && <p className="mt-2 text-xs text-red-600">{errorMessage1}</p>}
            </div>
            
            {/* Password  */}
            <div>
                <div className="flex items-center justify-between">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                    > Password </label>
                    <a href="./forgot_pw.html"
                        className="inline-block mb-2 text-sm font-light text-gray-500 hover:underline"
                    >
                    Forgot Password?
                    </a>
                </div>
                <div className="relative">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        required=""
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {errorMessage2 && <p className="mt-2 text-xs text-red-600">{errorMessage2}</p>}
            </div>
            
            <div>
                <button
                type="submit"
                // style={{ backgroundColor: '#2563eb',  }}
                className="bg-blue-500 w-full text-white hover:bg-gray-900 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-medium px-5 py-2.5 text-center"
                >Log In</button>
            </div>
            
            <p className="text-sm font-medium text-gray-500">
                Don't have an account?{" "}
                <a
                href="./seeker_signup.html"
                className="font-medium text-blue-600 hover:underline"
                >
                Sign Up
                </a>
            </p>
        </form>
    </FormPage>
    </UserContext.Provider>
    ); 
}

export default Login;