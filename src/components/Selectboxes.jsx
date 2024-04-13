import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { context } from '../contextapi/context';

function Selectboxes({ setSelectedBox, selectedBox }) {
  const token = localStorage.getItem('token');
  const { setBoxes, boxes, createbox, isauthorized } = useContext(context);

  const fetchBoxes = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/box/getboxByUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data) {
        throw new Error('Failed to fetch data');
      }
      setBoxes(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchBoxes();
  }, [createbox, isauthorized]);

  const handleSelectChange = (e) => {
    setSelectedBox(e.target.value);
  };

  return (
    <div className="flex flex-wrap justify-center">
      <select
        className='w-full border border-customtext p-1 rounded my-2 outline-none'
        value={selectedBox}
        onChange={handleSelectChange}
      >
        <option value="" disabled>Select box</option>
        {boxes.map((box, index) => (
          <option key={index} value={box._id}>{box.boxName}</option>
        ))}
      </select>
    </div>
  );
}

export default Selectboxes;
