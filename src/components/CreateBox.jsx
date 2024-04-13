import React, { useContext, useState } from 'react';
import axios from 'axios';
import { context } from '../contextapi/context';

const BoxComponent = () => {
  const [newBoxName, setNewBoxName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false); // State for isPrivate field

  const {setCreatebox} =useContext(context)

  const createBox = async () => {

    try {
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
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setCreatebox((prev)=> !prev)
      if (response.ok) {
        console.log('Box created:', response.data);
        
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
          type="text"
          className='border border-gray-800 outline-none rounded-md px-3 py-2'
          placeholder='Write box name'
          value={newBoxName}
          onChange={(e) => setNewBoxName(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
          />
    <span className='ml-2 font-thin text-sky-300'> Want to  Private </span>
        </label>
        <button onClick={createBox} className='bg-sky-300 rounded text-white'>Create Box</button>
      </div>
    </div>
  );
};

export default BoxComponent;
