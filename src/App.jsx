import React, { useContext, useEffect } from 'react'
import './App.css'
import SignUp from './pages/SignUp'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Login from './pages/LogIn'
import Home from './components/Home'
import Notfound from './components/Notfound'
import { context } from './contextapi/context'
function App() {
const {isAuthorized, setIsAuthorized, user, setUser}= useContext(context)
useEffect(() => {
  const getUser = async () => {
      try {
          const token = localStorage.getItem('token');
          console.log(token)
          const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/user/getuser`, {
              withCredentials: true,
          });
          if (response.ok) {
             
          }
          //  setIsAuthorized(true);
          const resdata = await response.json();
          console.log(resdata);
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  )
}

export default App
