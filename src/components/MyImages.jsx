import React, { useEffect, useState } from 'react';
import { BiDotsHorizontal, BiDotsVertical } from 'react-icons/bi';
import ProfileTitle from './ProfileTitle';

const MyImages = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/img//getImageByUser`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        const postData = await response.json();
        setData(postData.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-full flex flex-wrap justify-center items-center m-auto p-5'>
      {data.map((item) => {
        if (!item.isPrivate) {
          return (
            <div className='flex flex-col py-5 rounded my-2 sm:w-full md:w-1/3 lg:w-1/4 xl:w-1/5 bg-white shadow-md' key={item._id}>
              <div className="flex justify-between items-center px-5">
                <ProfileTitle fullname={item?.user?.fullname} time={item?.createdAt} userId={item.user?._id} />
                <div className="text-xs text-gray-500">private</div>
              </div>
              <div>
                <img src={item.imageUrls} alt="" className='h-auto w-full my-3 object-cover rounded-t-md' />
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default MyImages;
