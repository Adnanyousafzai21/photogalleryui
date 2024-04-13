import React, { useContext, useEffect, useState } from 'react';
import { BiDotsHorizontal, BiDotsVertical } from 'react-icons/bi';
import ProfileTitle from '../components/ProfileTitle';
import axios from 'axios';
import { BiWorld } from "react-icons/bi";
import { context } from '../contextapi/context';
const Posts = () => {

    const { user } = useContext(context)
    const token = localStorage.getItem('token')
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/img/getAllImg`);
            if (response.ok) {
                const postData = await response.json();
                setData(postData.reverse());
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handlePrivacyChange = async (imageId, isChecked) => {
        try {
            await axios.put(
                `http://localhost:8001/api/v1/img/updateimage/${imageId}`,
                { isPrivate: isChecked },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setData(prevData =>
                prevData.map(image =>
                    image._id === imageId ? { ...image, isPrivate: isChecked } : image
                )
            );
        } catch (error) {
            console.error('Error updating image privacy:', error);
        }
    };


    return (
        <div className='w-[80%] flex flex-wrap gap-9 justify-center items-center my-7 m-auto'>
            {data.map((image) => {
                if (!image.isPrivate) {
                    return (
                        <div className='flex flex-col rounded-md my-2 sm:w-full overflow-hidden md:w-[30%] w-[95%] bg-white shadow-lg' key={image._id}>
                            <div className="flex justify-between items-center px-5 my-3">
                                <ProfileTitle fullname={image?.user?.fullname} time={image?.createdAt} userId={image.user?._id} />
                                {user._id === image.user._id ? (
                                    <div className="">
                                        <input
                                            type="checkbox"
                                            checked={image.isPrivate}
                                            onChange={e => handlePrivacyChange(image._id, e.target.checked)}
                                            className="mr-1 outline-sky-300"
                                        />
                                        <span className='text-sky-300'> {image.isPrivate ? ": Private" : ": Public"}</span>
                                    </div>
                                ) : (
                                    <div className="text-sky-300">
                                        <BiWorld />
                                    </div>
                                )}
                            </div>
                            <div className="h-80">
                                <img src={image.imageUrls} alt="" className='h-full w-full object-cover rounded-b-md' />
                            </div>
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
};

export default Posts;
