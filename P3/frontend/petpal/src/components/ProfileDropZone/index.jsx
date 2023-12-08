import { useState } from 'react';

const ProfileDropZone = ({title, onProfileImgChange}) => {
    
    const [profileImg, setProfileImg] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile);
        
        const profileBlobUrl = URL.createObjectURL(selectedFile); 
        console.log(profileBlobUrl);

        // setProfileImg(URL.createObjectURL(selectedFile));
        setProfileImg(selectedFile);
        onProfileImgChange(selectedFile); 
    };

    return (
        <div className="mb-1">
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
                {title}
                </p>
            </div>
    );
}

export default ProfileDropZone; 