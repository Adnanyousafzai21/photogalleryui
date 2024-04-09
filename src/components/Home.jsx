// Home.js
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { context } from '../contextapi/context'

const Home = () => {
  const navigate = useNavigate()
  const { isAuthorized  } = useContext(context)
console.log("isauthorized", isAuthorized)
useEffect(()=>{
  if(!isAuthorized){
    return navigate("/login")
  }
},[isAuthorized])

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      {/* Render home page content here */}
    </div>
  )
}

export default Home
