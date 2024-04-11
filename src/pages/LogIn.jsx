import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { context } from '../contextapi/context';

const LogIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { setIsAuthorized}= useContext(context)
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLogin = async (formData) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/user/login`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem('token', token);
                setIsAuthorized(true)
                toast.success('Login successful!');
                navigate('/');
            } else {
                throw new Error(response.data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            if (error.message) {
                toast.error(error.message);
            } else {
                toast.error('Login failed. Please try again.');
            }
        }
    };

    return (
        <div className="bg-slate-100 w-full py-8 h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit(handleLogin)} autoComplete="off" className="bg-white rounded-md w-[400px] px-10 py-8">
                <h2 className="text-sky-500 text-center font-bold text-xl mb-8">Log In</h2>
                <div className="my-5">
                    <label htmlFor="email">Email:</label>
                    <input type="email" {...register('email', { required: 'Email is required*' })} className="w-full px-6 py-1 border-0 border-b outline-none" />
                    {errors.email && <p className="text-red-500 mt-2 font-thin">{errors.email.message}</p>}
                </div>
                <div className="my-5">
                    <label htmlFor="password">Password:</label>
                    <div className="flex items-center">
                        <input type={showPassword ? 'text' : 'password'} {...register('password', { required: 'Password is required*' })} className="w-full px-6 py-1 border-0 border-b outline-none" />
                        {showPassword ? <IoEyeOffOutline className="cursor-pointer" onClick={() => setShowPassword(false)} /> : <IoEyeOutline className="cursor-pointer" onClick={() => setShowPassword(true)} />}
                    </div>
                    {errors.password && <p className="text-red-500 mt-2 font-thin">{errors.password.message}</p>}
                </div>
                <div className="my-5 text-center">
                    <button type="submit" className="text-sm hover:bg-white duration-1000 hover:text-sky-500 border-2 border-sky-500 px-7 outline-none bg-sky-500 rounded text-white">Log In</button>
                </div>
                <p className="text-center text-sm font-thin">Don't have an account? <Link to="/signup" className="text-sky-600 underline ml-1">Sign Up</Link></p>
            </form>
        </div>
    );
};

export default LogIn;
