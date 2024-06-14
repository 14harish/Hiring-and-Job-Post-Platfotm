import React from 'react'
import { useNavigate } from "react-router-dom";


function Home() {
    const navigate=useNavigate();
  return (
    <div>
        <h1>Hiring Platfotm</h1>
        <button onClick={()=>{navigate("/createPost")}}>Create Post</button>
        <button onClick={()=>{navigate("/Feed")}}>Feed</button>
    </div>
  )
}

export default Home