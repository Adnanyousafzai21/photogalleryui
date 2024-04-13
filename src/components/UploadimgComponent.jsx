import React, { useState } from 'react';
import { MdOutlineInsertPhoto } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import cloudinaryUpload from './cloudinary'; // Import cloudinaryUpload function
import BoxComponent from './CreateBox';
import Allboxes from './Selectboxes';
import Selectboxes from './Selectboxes';

const UploadImage = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedBox, setSelectedBox] = useState("");

  const createObjectURL = (file) => {
    return file ? URL.createObjectURL(file) : null;
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const filePreviews = Array.from(files).map(createObjectURL);
    setSelectedFiles([...selectedFiles, ...files]);
    setPreviews([...previews, ...filePreviews]);
  };

  const removeFile = (index) => {
    const updatedFiles = [...selectedFiles];
    const updatedPreviews = [...previews];
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setSelectedFiles(updatedFiles);
    setPreviews(updatedPreviews);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const togglePrivate = () => {
    setIsPrivate(!isPrivate);
  };

  const isPostButtonVisible = selectedFiles.length > 0 || description.trim().length > 0;
  const token = localStorage.getItem('token');
  const handleForm = async () => {
    try {
      setIsLoading(true);

      const cloudinaryUrls = await Promise.all(selectedFiles.map(cloudinaryUpload));
      const requestBody = {
        box: selectedBox,
        isPrivate: isPrivate,
        imageUrls: cloudinaryUrls,
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
        console.log("Files uploaded successfully:", resdata);
        setDescription("");
        setSelectedFiles([]);
        setPreviews([]);
      }
    } catch (error) {
      console.log("Something went wrong:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='py-5 px-5 m-auto background max-w-[900px] w-[100%] md:w-[600px] bg-white rounded-md  mt-3 shadow-lg'>
      <BoxComponent />
      <hr className='my-2  mt-4' />
      <div className="rounded-md  m-auto px-3  lg:p-5">
        <div title='Click here to upload images' className='md:p-10 p-5 m-auto h-9  rounded-md border-sky-500 border flex justify-center items-center'>
          <label htmlFor="fileInput" className="cursor-pointer text-blue-500 text-2xl">
            <MdOutlineInsertPhoto />
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
            multiple
          />
        </div>
        <div className="flex">
          {previews.map((preview, index) => (
            <div key={index} className='duration-1000 w-[30%] m-auto text-center md:h-[120px] border relative'>
              <IoMdClose className="absolute top-0 right-0 cursor-pointer text-red-500" onClick={() => removeFile(index)} />
              <img
                src={preview}
                alt="Selected File Preview"
                className="max-w-full rounded w-[100%] h-[100%] m-auto"
              />
            </div>
          ))}
        </div>
        <Selectboxes setSelectedBox={setSelectedBox} selectedBox={selectedBox} />
        <div className="flex  items-center mt-4">
          <input
            id="isPrivate"
            type="checkbox"
            checked={isPrivate}
            onChange={togglePrivate}
      
          />
           <label htmlFor="isPrivate" className="ml-3">Want to Private the images</label>
        </div>
        <div className='text-center py-3 flex justify-center w-full'>
          <button onClick={handleForm} className='px-3 w-[100%] mx-auto text-white bg-sky-500 outline-none rounded text-customwhite'>{isLoading ? "File is Uploading..." : "Post"}</button>
        </div>



      </div>
    </div>
  );
}

export default UploadImage;
