import React, { useState } from 'react'
import axios from 'axios';

function CreatePost() {
    
    const [form, setForm] = useState({ profile: "", exp: 0, techs: [], desc:"" });
    
    const skillSet = [
        {
          name: "Javascript"
        },
        {
          name: "Java"
        },
        {
          name: "Python"
        },
        {   
          name: "Django"
        },
        {
          name: "Rust"
        }
      ];
      const handleData=async(e)=>{

        e.preventDefault();
        try {
          
          await axios.post("http://localhost:8080/AddPost",form,
          {
            headers: {
              "Content-type": "multipart/form-data",
            },
          });
        } catch (error) {
          console.log("error", error);
        }
        
      }
  return (
    <div>
        <h1>CreatePost</h1>
        <form>
            <div>
                <label>Job Profile:</label>
                <input type="text" name="job_profile" value={form.profile} onChange={(e) => setForm({ ...form, profile: e.target.value })}/>
            </div>
            <div>
                <label>Year of Experience</label>
                <input type="number"  name="yeer_exp" value={form.exp} onChange={(e) => setForm({ ...form, exp: e.target.value })}/>
            </div>
            <div>
                <label>Job Descrption</label>
                <input type="text" name="description" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })}/>
            </div>
            {skillSet.map(({ name }, index) => {
          return (
            <li key={index}>
              <div >
                <div>
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    onChange={(e)=>{setForm({...form , techs : [...form.techs, e.target.value]});}}  
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                </div>
              </div>
            </li>
          );
        })}
            <button type='submit' onClick={(e)=>{handleData(e)}}>submit</button>
        </form>
    </div>
  )
}

export default CreatePost