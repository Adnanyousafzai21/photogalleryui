import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProfileTitle from './ProfileTitle';
import Deleteimage from './Deleteimage';
import { context } from '../contextapi/context';

const SingleBox = () => {
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const {deleteimag}= useContext(context)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/api/v1/img/getImagesByBoxId/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [id, token, deleteimag]);

  const handlePrivacyChange = async (imageId, isChecked) => {
    try {
      await axios.put(
        `http://localhost:8001/api/v1/img/updateimage/${imageId}`,
        { isPrivate: isChecked },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setImages(prevImages =>
        prevImages.map(image =>
          image._id === imageId ? { ...image, isPrivate: isChecked } : image
        )
      );
    } catch (error) {
      console.error('Error updating image privacy:', error);
    }
  };

  return (
    <div className="w-[95%] max-w-[1210px] flex flex-wrap gap-9 justify-center  items-center py-10 m-auto" >
      {images.map((image, index) => (
        <div key={image._id} className="flex flex-col rounded-md my-2 sm:w-full relative  border overflow-hidden md:w-[30%] w-[100%] bg-white shadow-lg">
          <div className="flex justify-between items-center w-full px-2   absolute py-1">
            <ProfileTitle fullname={image?.user?.fullname} time={image?.createdAt} userId={image.user?._id} />
            <div className='mr-[2px] flex flex-col items-end '>
              <div className='text-[#FFFFFF]  hover:text-customtextbold duration-700'>
              <span className='text-customtext'>{image.isPrivate ? "Private : " : "Public : "}</span>
                <input
                  type="checkbox"
                  checked={image.isPrivate}
                  onChange={e => handlePrivacyChange(image._id, e.target.checked)}
                  className="mr-1"
                />
              </div>
              <div>
                <Deleteimage imageId={image._id} />
              </div>
            </div>
          </div>
          <div>
            <img src={image.imageUrls} alt="Image" className="w-full -z-50 h-80 object-cover" />
          </div>
        </div>
      ))
      }
    </div >
  );
};

export default SingleBox;
