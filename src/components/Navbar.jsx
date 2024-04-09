import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
    const [isOpen, setIsOpen]= useState(false)
    const [user, setuser]=useState(true)
    const handleLogOut = async()=>{
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/user/logedout`,
            {
                method:"post",
                withCredentials: true})
    
            // toast(response.data.message)
            // setIsAuthorized(false)
        } catch (error) {
            // toast(error.response.data.message)
            // setIsAuthorized(true)
        }
    }

    return (
        <div className='w-full bg-customwhite text-sky-500 px-3 md:px-0 sticky top-0 z-30'>
            <div className=' max-w-[900px]   py-3 mx-auto '>
                <div className='flex justify-between  px-5 relative'>
                    <div className="">
                <h2 className='mx:text-xl text-normal font-bold text-sky-500 '>SocialNetwork</h2>
                    </div>
                    <ul className={` px-20 md:px-0 lg:pl-0 duration-500 text-center lg:flex absolute lg:static lg:justify-center lg:mt-auto ${isOpen?'mt-[60px] opacity-[100%]':'mt-[-200px] opacity-0 '} itmes-center w-full left-0 gap-15  lg:gap-3 bg-white z-[10] py-5 lg:py-0 pl-11  lg:mt-auto lg:flex-row lg:w-auto lg:opacity-100 `}>
                    <li className={`my-2 ${isOpen?"hover:bg-sky-500 hover:text-white":""}  duration-500  width-[50%] mx-auto`} onClick={()=>setIsOpen(false)}>
                            <Link to="/" className="py-2 ">Home</Link>
                        </li>
                        
                        {!user ? (<li className={`my-2 ${isOpen?"hover:bg-sky-500 hover:text-white":""}   duration-500 md:hover:bg-none width-[50%] mx-auto`} onClick={()=>setIsOpen(false)}>
                            <Link to="/login" className="py-2 ">LogIn</Link>
                        </li>)
                            : (<li className={`my-2 ${isOpen?"hover:bg-sky-500 hover:text-white":""}  duration-500 md:bg-none width-[50%] mx-auto`}  onClick={handleLogOut}>
                                    <button onClick={handleLogOut}>logOut</button>
                            </li>)}
                    </ul>
                    <div className='text-sky-500 md:hidden text-3xl '>
                {isOpen?<RxCross2   onClick={()=>setIsOpen((open)=>!open)}/>:<IoReorderThreeOutline onClick={()=>setIsOpen((open)=>!open)}  />    }
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Navbar