import React, { useContext } from 'react';
import { AiOutlineInbox } from "react-icons/ai";
import axios from 'axios';
import { context } from '../contextapi/context';
import { Link } from 'react-router-dom';

const Allboxes = () => {
    const { boxes, setBoxes } = useContext(context);
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

    return (
<div className="bg-gray-100">
<div className="flex flex-wrap  justify-between gap-5 w-full md:w-[80%] lg:w-[70%] mx-auto">
    {boxes.map(box => (
        <div key={box._id} className="w-full md:w-[30%] sm:w-[45%] flex-col flex justify-center border border-gray-200 rounded-md items-center p-4 bg-white shadow-md">
            <p className="text-md capitalize text-sky-400">{box.boxName}</p>
            <div className='my-3'>
                <AiOutlineInbox className='text-[50px] text-sky-400' />
            </div>
            <div className="flex gap-4 justify-between items-between  w-full ">
                <Link to={`/SingleFloder/${box._id}`} className="text-md mb-2 border border-sky-400 px-4 rounded-md">View</Link>
                <div ><span className='mr-3'>{box.isPrivate ? 'Private' : 'Public'}:</span>
                <input
                    type="checkbox"
                    checked={box.isPrivate}
                    onChange={() => handleCheckboxClick(box._id, box.isPrivate)}
                /></div>
            </div>
        </div>
    ))}
</div>

</div>
    );
}

export default Allboxes;
