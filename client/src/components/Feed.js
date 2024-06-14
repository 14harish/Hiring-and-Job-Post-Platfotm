import React from 'react'
import { useNavigate } from "react-router-dom";

function Feed() {
    const navigate=useNavigate();

  return (
    <div>
        <h1>Feed Area</h1>
        <button onClick={()=>{navigate("/")}}>Home</button>
        <div>
            <label>Search</label>
            <input type='text'/>
        </div>
    </div>
  )
}

export default Feed