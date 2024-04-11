import React, { useState } from 'react';
import { MdOutlineInsertPhoto } from "react-icons/md";
import cloudinaryUpload from './cloudinary'; // Import the Cloudinary function

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false); // State for private/public status

  const createObjectURL = (file) => {
    return file ? URL.createObjectURL(file) : null;
  };

  const handleFileChange = (event) => {
    const file = event.target?.files[0];
    setSelectedFile(file);
    const preview = createObjectURL(file);
    setPreviewUrl(preview);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const togglePrivate = () => {
    setIsPrivate(!isPrivate);
  };

  const isPostButtonVisible = selectedFile || description.trim().length > 0;
  const token = localStorage.getItem('token');
  const handleForm = async () => {
    try {
      console.log("handle form clicked");
      setIsloading(true);
      const imageUrl = await cloudinaryUpload(selectedFile);
      console.log("img url", imageUrl);

      // Instead of FormData, send imageUrl directly in the request body
      const requestBody = {
        description: description,
        imageUrl: imageUrl,
        isPrivate: isPrivate
      };

      const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/img/uploadImage`, {
        method: "post",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        const resdata = await response.json();
        console.log("your post is successfully uploaded okay", resdata);
        setDescription("");
        setSelectedFile(null);
        setPreviewUrl(null);
      }
    } catch (error) {
      console.log("something went wrong", error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div title={`Don't Upload Uncompressed or large-File/Videos. It may take too much time and can be rejected. So, don't.`} className='py-5 px-5 rounded background bg-customwhite w-full'>
      <div className="rounded-md border-sky-200 border w-[40%] m-auto p-10 ">
        {!previewUrl ?
          <div className='p-20 m-auto h-9 overflow-hidden rounded-md border-sky-500 border flex justify-center items-center '>
            <label title='UploadImage' htmlFor="fileInput" className="cursor-pointer text-blue-500 text-2xl  ">
              <MdOutlineInsertPhoto />
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          : ""
        }

        {selectedFile && (
          <div className='duration-1000 w-[50%] m-auto text-center md:h-[200px] border ' >
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Selected File Preview"
                className="max-w-full rounded w-[100%] h-[85%] m-auto "
              />
            )}
            <p className='text-skyblue-500'>{(selectedFile.name).slice(0, 15)}</p>
          </div>
        )}

        {isPostButtonVisible && (
          <div className='text-center py-3 flex justify-center w-full'>
            <button onClick={handleForm} className='px-3 w-[65%] mx-auto bg-sky-500 outline-none rounded text-customwhite'>{isLoading ? "File is Uploading..." : "Post"}</button>
          </div>
        )}

        <div className="flex justify-center items-center mt-4">
          <label htmlFor="isPrivate" className="mr-2">Private:</label>
          <input
            id="isPrivate"
            type="checkbox"
            checked={isPrivate}
            onChange={togglePrivate}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
