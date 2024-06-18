import React, { useState } from 'react';
import axios from 'axios';

function CreatePost() {
  const [form, setForm] = useState({ profile: "", exp: 0, techs: [], desc: "", no: 0 }); // Change 'No' to 'no'

  const skillSet = [
    { name: "Javascript" },
    { name: "Java" },
    { name: "Python" },
    { name: "Django" },
    { name: "Rust" }
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
      console.log('Number of posts:', res.data);

      const updatedForm = { ...form, no: (res.data) + 1 }; // Change 'No' to 'no'
      console.log('Updated form data:', updatedForm);

      setForm(updatedForm);

      const response = await axios.post('http://localhost:8080/AddPost', updatedForm, {
        headers: {
          'Content-Type': 'application/json',
        },
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
