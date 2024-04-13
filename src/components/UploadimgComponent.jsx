import React, { useContext, useState } from 'react';
import { MdOutlineInsertPhoto } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import cloudinaryUpload from './cloudinary'; // Import cloudinaryUpload function
import BoxComponent from './CreateBox';
import Allboxes from './Selectboxes';
import Selectboxes from './Selectboxes';
import toast from 'react-hot-toast';
import axios from 'axios'; // Import Axios
import { context } from '../contextapi/context';

const UploadImage = () => {
  const { user } = useContext(context);
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
      console.log("user",user)
      if (!user || user.length === 0) {
        return toast.error("User not authorized");
      }
      if (!selectedBox ||!selectedFiles){
        return toast.error("Box and Image are required")
      }
      setIsLoading(true);

      const cloudinaryUrls = await Promise.all(selectedFiles.map(cloudinaryUpload));
      const requestBody = {
        box: selectedBox,
        isPrivate: isPrivate,
        imageUrls: cloudinaryUrls,
      };

      const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/img/uploadImage`, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status===201) {
        const resdata = response.data;
        console.log("Files uploaded successfully:", resdata.savedImages);
        toast.success(resdata.message)
        setDescription("");
        setSelectedFiles([]);
        setPreviews([]);
      }
    } catch (error) {
      console.log("Something went wrong:", error);
      toast.error(error.message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='py-5 px-5 m-auto background max-w-[900px] w-[100%] md:w-[600px] bg-white rounded-md  mt-3 shadow-lg'>
      <BoxComponent />
      <hr className='my-2 border-[#ffe6e6] mt-2 border' />
      <div className="rounded-md  m-auto pb-0 px-5 lg:p-5">
        <div title='Click here to upload images' className='md:p-10 p-5 m-auto h-9  rounded-md border-customtext border flex justify-center items-center'>
          <label htmlFor="fileInput" className="cursor-pointer text-customtextbold text-xl">
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
            <div key={index} className='duration-1000 w-[30%] m-auto text-center md:h-[120px] border-customtext relative'>
              <IoMdClose className="absolute top-0 right-0 cursor-pointer " onClick={() => removeFile(index)} />
              <img
                src={preview}
                alt="Selected File Preview"
                className="max-w-full rounded w-[100%] h-[100%] m-auto"
              />
            </div>
          ))}
        </div>
        <Selectboxes setSelectedBox={setSelectedBox} selectedBox={selectedBox} />
        <div className="flex items-center">
          <input
            id="isPrivate"
            type="checkbox"
            checked={isPrivate}
            onChange={togglePrivate}
          />
           <label htmlFor="isPrivate" className="ml-3 mb-2 text-customtext"> : Private</label>
        </div>
        <div className='text-center  flex justify-center w-full'>
          <button onClick={handleForm} className='px-3 w-[100%] py-1 duration-700 hover:bg-white hover:text-customtextbold border hover:border-customtext  mx-auto text-white bg-custombg outline-none rounded text-customwhite'>{isLoading ? "File is Uploading..." : "Post"}</button>
        </div>
      </div>
    </div>
  );
}

export default UploadImage;
