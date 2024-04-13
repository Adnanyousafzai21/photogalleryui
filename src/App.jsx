import React, { useContext, useEffect } from 'react'
import './App.css'
import SignUp from './pages/SignUp'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Login from './pages/LogIn'
import Notfound from './components/Notfound'
import { context } from './contextapi/context'
import Allimage from './pages/Allimages'
import axios from 'axios';
import SingleBox from './components/SingleBox'
import MyUploads from './pages/Uploads'
function App() {
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(context)


  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/user/getuser`, {
          // withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setIsAuthorized(true)
          const userData = response.data;
          setUser(userData.user)
        
        } else {
          // Handle error responses
          console.error('Error fetching user:', response);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    getUser();
  }, [isAuthorized]);


  return (
    <div>
      <Router>
        <Navbar />
        <div className='bg-slate-50'>
          <Routes>
            <Route path="/" element={<Allimage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path='//myuploads' element={<MyUploads />} />
            <Route path='/SingleFloder/:id' element={<SingleBox />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>
      </Router>
      <Toaster />
    </div>
  )
}

export default App
