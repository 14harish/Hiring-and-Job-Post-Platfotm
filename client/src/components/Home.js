import React from 'react'
import { useNavigate } from "react-router-dom";


function Home() {
    const navigate=useNavigate();
  return (
    <div className='p-12'>
        <h1>Hiring Platfotm</h1>
        <button onClick={()=>{navigate("/createPost")}} className='border-red-500 border-2 m-4 p-2'>Create Post</button>
        <button onClick={()=>{navigate("/Feed")}} className='border-red-500 border-2 p-2'>Feed</button>
    </div>
  )
}

export default Home