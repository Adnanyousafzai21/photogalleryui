import React, { useContext } from 'react';
import { AiOutlineInbox } from "react-icons/ai";
import axios from 'axios';
import { context } from '../contextapi/context';
import { Link } from 'react-router-dom';
import { MdDeleteOutline } from 'react-icons/md'
import toast from 'react-hot-toast';

const Allboxes = () => {
    const { boxes, setBoxes, setCreatebox } = useContext(context);
    const token = localStorage.getItem("token");

    const handleCheckboxClick = async (boxId, currentIsPrivate) => {
        try {
            const updatedIsPrivate = !currentIsPrivate;

            await axios.put(
                `${import.meta.env.VITE_APP_BASE_URL}/api/v1/box/updatebox/${boxId}`,
                { isPrivate: updatedIsPrivate },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            setBoxes(prevBoxes => prevBoxes.map(box => {
                if (box._id === boxId) {
                    return { ...box, isPrivate: updatedIsPrivate };
                }
                return box;
            }));
        } catch (error) {
            console.error('Error updating box privacy:', error);
        }
    };


    const handelDelete = async (boxId) => {

        const response = await axios.delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/box/deleteBoxeById/${boxId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if(response.status===201){
            setCreatebox(prev=>!prev)
            toast.success(response.data.message)
        }
    }

    return (
        <div className="bg-gray-100 my-10  pb-10">
            {
                boxes.length===0?(
                    <h2 className=' w-full text-center text-customtextbold text-xl mt-10'>Your created boxes will be showing below here</h2>
                ):
                (
                    <div className="flex flex-wrap   justify-between gap-5 w-full md:w-[80%] lg:w-[70%] mx-auto">
                        {boxes.map(box => (
                            <div key={box._id} className="hover:scale-101 duration-300 w-full md:w-[30%] sm:w-[45%] flex-col flex justify-center border border-gray-200 rounded-md items-center p-4 bg-white shadow-md">
                                <div className="flex justify-between items-center w-full text-customtextbold">
                                    <div >
                                        <input
                                            type="checkbox"
                                            checked={box.isPrivate}
                                            onChange={() => handleCheckboxClick(box._id, box.isPrivate)}
                                        />
                                        <span className='mr-3'>{box.isPrivate ? ' : Private ' : ' : Public '}</span>
                                    </div>
                                    <div className='' onClick={()=>handelDelete(box._id)}>
                                        <MdDeleteOutline imageId={box._id} className=" hover:text-red-300 text-xl" />
                                    </div>
                                </div>
                                <div className='mt-2'>
                                    <AiOutlineInbox className='text-[50px] text-sky-400' />
                                </div>
                                <p className="text-md capitalize mb-4 text-customtextbold">{box.boxName}</p>
                                <div className="flex gap-4 justify-center items-between  w-full ">
                                    <Link to={`/SingleFloder/${box._id}`} className="text-md w-full border  text-customtext hover:bg-custombg border-customtext hover:text-white duration-700 px-4 rounded text-center">View Images</Link>

                                </div>
                            </div>
                        ))}
                    </div>
                ) 
            }
        </div>
    );
}

export default Allboxes;
