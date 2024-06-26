import React, { useState } from 'react';
import axios from 'axios';

function CreatePost() {
  const [form, setForm] = useState({ profile: "", exp: 0, techs: [], desc: "", no: 0 ,photo:""}); // Change 'No' to 'no'
  const [photoVal,setPhoto]=useState(null);
  const skillSet = [
    { name: "javascript" },
      { name: "java" },
      { name: "python" },
      { name: "django" },
      { name: "microservices" },
      { name: "hadoop" },
      { name: "bigdata" },
      { name: "numpy" },
      { name: "pandas" },
      { name: "c" },
      { name: "c++" },
      { name: "matplotlib" },
      { name: "springboot" },
      { name: "cloud" },
      { name: "jee" },
      { name: "spring" },
      { name: "AWZ" },
      { name: "Azure" },
      { name: "devops" },
  ];

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setForm(prevForm => {
      if (checked) {
        return { ...prevForm, techs: [...prevForm.techs, value] };
      } else {
        return { ...prevForm, techs: prevForm.techs.filter(tech => tech !== value) };
      }
    });
  };

  const handleData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get('http://localhost:8080/postCount');
      const updatedForm = { ...form, no: res.data + 1 };

      const formData = new FormData();
      // formData.append('profile', updatedForm.profile);
      // formData.append('exp', updatedForm.exp);
      // formData.append('techs', updatedForm.techs);
      // formData.append('desc', updatedForm.desc);
      // formData.append('no', updatedForm.no);
      // formData.append('post', JSON.stringify(updatedForm)); // Add JSON data as a string
      formData.append('post', new Blob([JSON.stringify(updatedForm)], { type: 'application/json' })); // Add JSON data as a Blob
      formData.append('photo', photoVal);


      const response = await axios.post('http://localhost:8080/AddPost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        // data: updatedForm // Send other form data as JSON
      });
      
      console.log('Post response:', response.data);

    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div>
      <h1>CreatePost</h1>
      <form onSubmit={handleData}>
        <div>
          <label>Job Profile:</label>
          <input
            className="border-2"
            type="text"
            name="job_profile"
            value={form.profile}
            onChange={(e) => setForm({ ...form, profile: e.target.value })}
          />
        </div>
        <div>
          <label>Year of Experience:</label>
          <input
            className="border-2"
            type="number"
            name="year_exp"
            value={form.exp}
            onChange={(e) => setForm({ ...form, exp: Number(e.target.value) })}
          />
        </div>
        <div>
          <label>Job Description:</label>
          <input
            className="border-2"
            type="text"
            name="description"
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
          />
        </div>
        <div>
          <label>Photo</label>
          <input
            className="border-2"
            type="file"
            name="description"
            // value={form.photo}
            alt='photo'
            // onChange={(e) => setForm({ ...form, photo: e.target.files[0] })}
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>
        <ul>
          {skillSet.map(({ name }, index) => (
            <li key={index}>
              <div>
                <input
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  name={name}
                  value={name}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
              </div>
            </li>
          ))}
        </ul>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreatePost;
