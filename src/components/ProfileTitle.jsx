import React from 'react';
import { format, differenceInMinutes, differenceInDays } from 'date-fns';
import { Link } from 'react-router-dom';

const ProfileTitle = ({ avater, time = "2024-01-18T07:49:43.261Z", fullname, classname, userId }) => {

  const postDate = new Date(time);
  const now = new Date();

  const timeDifferenceInMinutes = differenceInMinutes(now, postDate);
  const timeDifferenceInDays = differenceInDays(now, postDate);

  let formattedTime;
  if (timeDifferenceInMinutes < 1) {
    formattedTime = 'Just now';
  } else if (timeDifferenceInMinutes < 60) {
    formattedTime = `${timeDifferenceInMinutes}m ago`;
  } else if (timeDifferenceInDays < 1) {
    formattedTime = `${Math.floor(timeDifferenceInMinutes / 60)}hrs ago`;
  } else if (timeDifferenceInDays < 7) {
    formattedTime = `${timeDifferenceInDays}d ago`;
  } else {
    formattedTime = format(postDate, 'MMM d');
  }

  return (
    <div className="flex gap-1 items-center rounded-md  ">
    <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7vB-49_BT-dirwttYZaeE_VByjlQ3raVJZg&usqp=CAU"} alt="" className="w-16 h-16 overflow-hidden rounded-[50%]" /> 
  
      <div>
        <div className='text-normal font-normal text-[#333333] capitalize'>{fullname}</div>
        <div className='postmargin text-sm font-light text-[#777777]'>{formattedTime}</div>
      </div>
    </div>
  );
};

export default ProfileTitle;
