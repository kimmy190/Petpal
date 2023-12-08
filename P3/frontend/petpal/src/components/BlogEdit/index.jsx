import { UserContext } from "../../contexts/UserContext";
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Textarea, TextInput, Tabs, Button, FileInput, Label } from 'flowbite-react';
import Markdown from "../Markdown";
import BlogPost from "../BlogPost";

const customTheme = {
    "tablist": {

    "tabitem": {
        "base": "flex items-center justify-center p-4 rounded-t-lg text-sm font-medium first:ml-0 ",
       "styles": {
            "default": {
                "active": {
                    "on": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-cyan-500",
                }
            }
            }
    }
        }
};

const TextEditComponent = () => {
    const { user, token } = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [activeTab, setActiveTab] = useState('Edit');
    const [image, setImage] = useState(null); // State to store the uploaded image
    const [author, setAuthor] = useState(null); // State to store the uploaded image
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    
    const handleTextChange = (event) => {
        setText(event.target.value);
    };
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    
    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
    };
    const handlePost = () => {
        if (title.trim() !== '' && text.trim() !== '' && image !== null) {
            // Text and image are valid, proceed with the post request
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', text);
            formData.append('image', image);

            fetch('/blog/posts/', {
                method: 'POST',
                body: formData,
                headers: {
                    contentType: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        // Handle success, maybe show a success message
                        console.log('Post successful!');
                        setText('');
                        setImage(null);
                        return response.json();
                    } else {
                        // Handle error response
                        console.error('Error occurred while posting.');
                    }
                }).then((data) => {
                    navigate(`/blog/${data.id}`);
                })
                .catch((error) => {
                    setErrorMessage("Error occured:" + error);
                });
        } else {
            setErrorMessage('All fields are required for posting.');

        }
    };

    useEffect(() => {
        if (!user.shelter) {
            navigate("/404");
            return;
        }
        fetch(`/accounts/shelter/${user.shelter.id}`,
              {method: "GET",
              redirect: "follow",
              headers: {
                  accept: "application/json",
              },
               }
             )

            .then((response) => {
                if (!response.ok) {
                    navigate("/404");
                }
                return response.json();
            })
            .then((data) => {
                setAuthor(data.shelter);
            })
                .catch((error) => {
                    console.error('Error occurred while posting:', error);
                });
    }, []);

    if (!author) {
        return (<h1>Loading...</h1>);
    }

    return (
        <div>
          <Tabs theme={customTheme} active={activeTab} onChange={handleTabClick}>
            <Tabs.Item className="text-gray-600" title="Edit">
              <div className="w-full">
                <div className="mb-2 block">
                  <Label value="Title" />
                </div>
                <TextInput className="mb-2" value={title} onChange={handleTitleChange} placeholder="A descriptive title..."/>
                <div className="mb-2 block">
                  <Label value="Content" />
                </div>
                <Textarea
                  rows={10}
                  className="w-full"
                  value={text}
                  onChange={handleTextChange}
                  placeholder="Enter text here..."
                />
                <div id="fileUpload" className="max-w-md">
                  <div className="mb-2 block">
                    <Label htmlFor="file" value="Upload a banner image" />
                  </div>
                  <FileInput id="file" onChange={handleImageChange} accept="image/*"  />
                </div>
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                <Button className="mt-4" color="dark" onClick={handlePost}>Post</Button>
              </div>
            </Tabs.Item>
            <Tabs.Item title="Preview">
              <BlogPost title={title} content={text} author={author} image={image ? URL.createObjectURL(image): null}/>
            </Tabs.Item>
          </Tabs>

        </div>
    );
};

export default TextEditComponent;