import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from '../components/Home';
import CreatePost from '../components/CreatePost';
import Feed from '../components/Feed';

function Router() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/createPost" element={<CreatePost/>}/>
      <Route path="/feed" element={<Feed/>}/>
  </Routes>
    </div>
  )
}

export default Router