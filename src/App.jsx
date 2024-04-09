import React, { useEffect } from 'react'
import './App.css'
import SignUp from './pages/SignUp'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Login from './pages/LogIn'
import Home from './components/Home'
import Notfound from './components/Notfound'
function App() {
  useEffect(() => {
    getUser()
  }, [])
  const getUser = async () => {
      const token = localStorage.getItem('token');
      console.log(token)
      const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/user/getuser`,{
        withCredentials: true,
      }) 

    const resdata = await response.json()
    console.log(resdata)
  }

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          {/* <Route path='/' element={<Home />} /> */}
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="*" element={<Notfound/>}/>
        </Routes>
      </Router>
      <Toaster />
    </div>
  )
}

export default App
