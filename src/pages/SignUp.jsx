import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { context } from '../contextapi/context';

const Signup = () => {
    const {setIsAuthorized}=useContext(context)
    const navigate = useNavigate();
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    console.log("this is the sign up page!!");

    const Registeration = async (data) => {
        try {
            const { confirm_Password, ...datatosend } = watch();
            const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/user/register`, data, {
                headers: { "Content-Type": "application/json" }
            });
            console.log("this is the response", response);

            if (response.status === 200) {
                setIsAuthorized(true)
                const { token } = response.data;
                localStorage.setItem('token', token);
                toast.success(response.data.message);
                navigate("/");
                reset();
            } else {
                throw new Error(response.data.message || "Registration failed");
            }
        } catch (error) {
            console.log(error.response);
            toast.error(error.message);
            console.log("there is an error while registration ", error);
        }
    };

    return (
        <>
            <div className="w-[100%] bg-slate-100 md:px-20 px-4  flex items-center justify-center h-screen ">
                <form onSubmit={handleSubmit(Registeration)} className=' lg:w-[40%] md:w-[50%] text-sm  m-auto w-[100%]  bg-white py-7 lg:px-20 px-10  rounded-md'>
                    <h3 className='text-sky-500 text-center font-bold text-xl'> SignUp </h3>
                    <div className='w-full my-3 '>
                        <label className='' htmlFor="fullname">FullName:</label>
                        <input type="text" {...register('fullname', { required: "fullname is required" })} className='w-full px-2 md:px-6  border-0 border-b outline-none ' />
                    </div>
                    {errors.fullname && <p className='text-red-500 mt-[-20px] mb-2 font-thin'>{errors.fullname.message}</p>}
                    <div className='w-full my-3 '>
                        <label className='' htmlFor="">Email:</label>
                        <input type="email"  {...register('email', { required: "email is required" })} className='w-full px-2 md:px-6  border-0 border-b outline-none  ' />
                    </div>
                    {errors.email && <p className='text-red-500 mt-[-20px] mb-2 font-thin'>{errors.email.message}</p>}
                    <div className='w-full my-3'>
                        <label className='' htmlFor="">Password:</label>
                        <input
                            type="password"  {...register('password', { required: "password is required" })} className='w-full px-2 md:px-6  border-0 border-b outline-none' autoComplete="off" />
                    </div>
                    {errors.password && <p className='text-red-500 mt-[-20px] mb-2 font-thin'>{errors.password.message}</p>}
                    <div className='w-full my-3'>
                        <label className='' htmlFor="">Confirm Password:</label>
                        <input autoComplete='off' type="password"  {...register('confirm_Password', {
                            required: 'confirm password is required',
                            validate: (value) => value === watch('password') || 'Passwords do not match',
                        })} className='w-full px-2 md:px-6  border-0 border-b outline-none  ' />
                    </div>
                    {errors.confirm_Password && <p className='text-red-500 mt-[-20px] mb-2 font-thin'>{errors.confirm_Password.message}</p>}
                    <div className='w-[100%]   flex items-center mb-7 flex-col'>
                        <input type="submit" value="Create Account" className='px-3 w-[100%] py-1 duration-700 hover:bg-white hover:text-customtextbold border hover:border-customtext  mx-auto text-white bg-custombg outline-none rounded text-customwhite' />
                    </div>
                </form>
            </div>
        </>
    );
};

export default Signup;
