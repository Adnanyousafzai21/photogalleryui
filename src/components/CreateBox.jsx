import React, { useContext, useState } from 'react';
import axios from 'axios';
import { context } from '../contextapi/context';
import toast from 'react-hot-toast';

const BoxComponent = () => {
  const [newBoxName, setNewBoxName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false); // State for isPrivate field

  const { setCreatebox, user } = useContext(context);

  const createBox = async () => {
    try {
      if (user.length === 0) {
        return toast.error('User not authorized');
      }
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/box/createbox`,
        {
          isPrivate: isPrivate,
          boxName: newBoxName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCreatebox((prev) => !prev);
      if (response.status === 201) {
        console.log('Box created:', response.data);
        toast.success(response.data.message);
      }

      setNewBoxName('');
      setIsPrivate(false); // Reset isPrivate state after creating box
    } catch (error) {
      console.error('Error creating box:', error);
    }
  };

  return (
    <div className='p-1 px-4'>
      <div className='flex flex-col gap-3'>
        <input
          type='text'
          className='border border-customtext outline-none rounded-md px-3 py-2'
          placeholder='Write box name'
          value={newBoxName}
          onChange={(e) => setNewBoxName(e.target.value)}
        />
        <label>
          <input
            type='checkbox'
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
          />
          <span className='ml-1 font-thin text-customtext'>: Private </span>
        </label>
        <button onClick={createBox} className='py-1 bg-custombg rounded text-white duration-700 hover:bg-white hover:text-customtextbold border hover:border-t-customtext '>
          CreateBox
        </button>
      </div>
    </div>
  );
};

export default BoxComponent;
