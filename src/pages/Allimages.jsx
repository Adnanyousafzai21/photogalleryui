import React, { useContext, useEffect, useState } from 'react';
import { BiDotsHorizontal, BiDotsVertical } from 'react-icons/bi';
import ProfileTitle from '../components/ProfileTitle';
import axios from 'axios';
// import { MdDeleteOutline } from "react-icons/md";
import { MdPublic } from "react-icons/md";
import { context } from '../contextapi/context';
import Deleteimage from '../components/Deleteimage';
const Posts = () => {

    const { user, isAuthorized, deleteimag } = useContext(context)
    const token = localStorage.getItem('token')
    const [data, setData] = useState([]);



    console.log("isAUTHORIZED", isAuthorized)


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
    useEffect(() => {
        getData();
    }, [isAuthorized, deleteimag]);

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
        <div className='w-[95%] max-w-[1210px] flex flex-wrap gap-9 justify-center min-h-screen items-start py-10 m-auto'>
            {data.map((image) => {
                if (!image.isPrivate) {
                    return (
                        <div className='flex flex-col rounded-md hover:scale-101 duration-300 my-2 sm:w-full relative border overflow-hidden md:w-[30%] w-[100%] bg-white shadow-lg' key={image._id}>
                        <div className="flex justify-between items-center w-full px-2   absolute py-1 ">
                                <ProfileTitle fullname={image?.user?.fullname} time={image?.createdAt} userId={image.user?._id} />
                                {user?._id === image.user?._id ? (
                                    <div className="mr-[2px] flex flex-col items-end ">
                                        <div className='text-[#FFFFFF]  hover:text-customtextbold duration-700'>
                                            <span className='mr-2'> {image.isPrivate ? "Private :" : "Public :"}</span>
                                            <input
                                                type="checkbox"
                                                checked={image.isPrivate}
                                                onChange={e => handlePrivacyChange(image._id, e.target.checked)}
                                                className="mr-1 outline-sky-300"
                                            /> </div>
                                        <div>
                                            <Deleteimage imageId={image._id} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-[#FFFFFF] text-3xl hover:text-customtextbold duration-700">
                                        <MdPublic />
                                    </div>
                                )}
                            </div>
                            <div className="h-80 ">
                                <img src={image.imageUrls} alt="" className='h-full w-full object-cover rounded-b' />
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
