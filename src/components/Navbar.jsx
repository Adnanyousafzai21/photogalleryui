import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { context } from '../contextapi/context';
import toast from 'react-hot-toast';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();
    const {isAuthorized, setIsAuthorized, user, setUser}= useContext(context)

    const handleLogOut = async () => {
        try {
            localStorage.removeItem('token');
            setIsAuthorized(false);
            navigate('/');
            toast.success('Logged out successfully');
          
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    useEffect(() => {
        setIsOpen(prevState => !prevState);
    }, [isAuthorized]);
    return (
        <div className='w-full bg-white text-sky-500  md:px-0 sticky top-0'>
            <div className='max-w-[900px] py-3 mx-auto'>
                <div className='flex justify-between px-5 items-center '>
                    <div className="">
                        <h2 className='mx:text-xl hidden md:block text-normal font-bold text-sky-500 '>PhotoGallery</h2>
                    </div>
                    <ul className={` lg:pl-0 duration-500 text-center w-full px-0 gap-5 flex  lg:static justify-center py-0 lg:mt-auto itmes-center  left-0 gap-15 lg:gap-3 bg-white z-[10]  lg:py-0 pl-11 lg:flex-row lg:w-auto lg:opacity-100 `}>
                        <li className={`my-2 duration-500 width-[50%] mx-auto`}>
                            <Link to="/" className="py-2">Allphoto</Link>
                        </li>
                        <li className={`my-2 duration-500 width-[50%] mx-auto`}>
                            <Link to="/dashboard" className="py-2">Dashboard</Link>
                        </li>
                        {!isAuthorized ? (
                            <li className={`my-2 duration-500 md:hover:bg-none width-[50%] mx-auto`}>
                                <Link to="/login" className="py-2">LogIn</Link>
                            </li>
                        ) : (
                            <li className={`my-2 duration-500 md:bg-none width-[50%] mx-auto`} onClick={handleLogOut}>
                                <button onClick={handleLogOut}>Log Out</button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
