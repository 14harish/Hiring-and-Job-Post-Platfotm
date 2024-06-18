import React, { useEffect,useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function Feed() {
    const navigate=useNavigate();
    const [query, setQuery] = useState("");
    const [post,setPost]=useState([]);
    const fetchAll=async()=>{
      const res=await axios.get('http://localhost:8080/ViewPost')
      console.log(res.data);
      setPost(res.data);
    }
    const search=async()=>{
      const res=await axios.get(`http://localhost:8080/posts/${query}`)
      console.log(res);
      setPost(res.data);
    }
    useEffect(()=>{
     
    
      if(query.length > 2) search();
      if(query.length === 0) fetchAll();
      fetchAll();
    },[query])
    const handleDelete=async(profile)=>{
      try{
        console.log(profile)
        await axios.delete(`http://localhost:8080/posts/${profile}`)
        fetchAll();
      }
      catch(e){
        console.log(e);
      }
    }
  return (
    <div>
        <h1>Feed Area</h1>
        <button onClick={()=>{navigate("/")}}>Home</button>
        <div>
            <label>Search</label>
            <input type='text' onChange={(e)=>setQuery(e.target.value)} className='border-4'/>
        </div>
        <div className='flex gap-2 flex-wrap justify-center m-2'>
          {post &&
            post.map((data)=>{
              return(
                <div className='p-5 border-2 max-w-96'>
                  <h2 className='font-bold'>{data.profile}</h2>
                  <p>{data.desc}</p>
                  <p>Exp:  {data.exp}</p>
                  {
                    data.techs.map((s)=>{
                      return(
                        <li>
                          {s}
                        </li>
                      ) 
                    })
                  }
                  <button className='border-2 border-black m-2 p-2'>Edit</button>
                  <button className='border-2 border-black p-2' onClick={()=>{handleDelete(data.profile)}}>Delete</button>
                </div>
              )
            }
          )}
        </div>
    </div>
  )
}

export default Feed