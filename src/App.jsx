import React, { useContext, useEffect } from 'react'
import './App.css'
import SignUp from './pages/SignUp'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Login from './pages/LogIn'
import Notfound from './components/Notfound'
import { context } from './contextapi/context'
import ImageUploadComponent from './components/UploadimgComponent'
import Allimage from './pages/Allimages'
import axios from 'axios';
import MyProfile from './components/MyProfile'
// import BoxComponent from './components/BoxeComponent'
import SingleBox from './components/SingleBox'
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
          console.log("response data", userData);
        } else {
          // Handle error responses
          console.error('Error fetching user:', response);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    getUser();
  }, []);


  return (
    <div>
      <Router>
        <Navbar />
        <div className='bg-slate-50'>
          <Routes>
            <Route path="/" element={<Allimage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path='/dashboard' element={<MyProfile />} />
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
