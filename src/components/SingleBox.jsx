import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SingleBox = () => {
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const token = localStorage.getItem("token");

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
  }, [id, token]);

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
    <div className="container mx-auto px-4 md:w-70 py-10 lg:w-full min-h-screen -z-50" >
      <div className="flex flex-wrap -mx-4">
        {images.map((image, index) => (
          <div key={image._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 px-4 mb-4">
            <div className="relative border bg-bg-costumtext rounded-md overflow-hidden">
              <div className="text-customtext px-2 py-1 rounded text-sm">{image.user.fullname}</div>
              <img src={image.imageUrls} alt="Image" className="w-full h-80 object-cover" />
              <div className="absolute top-0 right-0 text-customtext px-2 py-1 rounded text-sm flex items-center">
                <input
                  type="checkbox"
                  checked={image.isPrivate}
                  onChange={e => handlePrivacyChange(image._id, e.target.checked)}
                  className="mr-1"
                />
              <span className='text-customtext'>{image.isPrivate ? "Private" : "Public"}</span>  
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleBox;
