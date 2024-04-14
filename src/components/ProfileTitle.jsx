import React from 'react';
import { format, differenceInMinutes, differenceInDays } from 'date-fns';
// import { FaRegCircleUser } from "react-icons/fa6";
import { PiUserSwitchLight } from "react-icons/pi";

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
    <div className="flex gap-1 items-center rounded-md text-[#FFFFFF] hover:text-customtextbold duration-700 ">
      <PiUserSwitchLight  className="text-4xl"/>
      <div>
        <div className='text-normal font-normal capitalize'>{fullname}</div>
        <div className='postmargin text-sm font-light '>{formattedTime}</div>
      </div>
    </div>
  );
};

export default ProfileTitle;
