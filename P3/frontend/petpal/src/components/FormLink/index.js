import { Link } from "react-router-dom";

const FormLink = ({who}) => {

    const pet_shelter = "Pet Shelter";
    const pet_seeker = "Pet Seeker";
    return (
    <>
    {who==="seeker"? (
    <><div className="mb-0">
        <p className="text-sm font-medium text-gray-500">
        Not a {pet_seeker}?{" "}
        <Link to={`/signup/shelter`}
            className="font-medium text-blue-600 hover:underline"
        >{pet_shelter} Sign Up
        </Link>
        </p>
    </div>
    <div>
        <p className="text-sm font-medium text-gray-500">
        Already have an account?{" "}
        <Link to="/login"
            className="font-medium text-blue-600 hover:underline"
        >Login
        </Link>
        </p>
    </div></>) : 
    (<><div className="mb-0">
                        <p className="text-sm font-medium text-gray-500">
                        Not a {pet_shelter}?{" "}
                        <Link to={`/signup/seeker`}
                            className="font-medium text-blue-600 hover:underline"
                        >{pet_seeker} Sign Up
                        </Link>
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">
                        Already have an account?{" "}
                        <Link to="/login"
                            className="font-medium text-blue-600 hover:underline"
                        >Login
                        </Link>
                        </p>
        </div></>)
    }
    
    </>
    );
}

export default FormLink; 