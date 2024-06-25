import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Feed() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [post, setPost] = useState([]);
  // const [photo, setphoto] = useState([]);
  const [openModal, setOpenModal] = useState(null);

  const fetchAll = async () => {
    const res = await axios.get("http://localhost:8080/ViewPost");
    // console.log(res.data);
    setPost(res.data);
  };

  const search = async () => {
    const res = await axios.get(`http://localhost:8080/posts/${query}`);
    console.log(res);
    setPost(res.data);
  };

  useEffect(() => {
    if (query.length > 2) search();
    if (query.length === 0) fetchAll();
  }, [query]);

  const handleDelete = async (no) => {
    try {
      console.log(no);
      await axios.delete(`http://localhost:8080/posts/${no}`);
      fetchAll();
    } catch (e) {
      console.log(e);
    }
  };

  const PersonCard = ({ person }) => {
    const [form, setForm] = useState({
      profile: person.profile,
      exp: person.exp,
      techs: person.techs,
      desc: person.desc,
      no: person.no,
      photo:person.photo,
    }); // Change 'No' to 'no'
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

  async function updatePost(no) {
      try {
          const response = await axios.put(`http://localhost:8080/updatePost/${no}`, form);
          console.log('Post updated successfully:', response.data);
      } 
      catch (error) {
          console.error('Error updating post:', error);      
      }
  }


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
    
    return (
      <div>
        <div className="p-5 border-2 max-w-96">
          <h2 className="font-bold">{person.profile}</h2>
          <img
              src={`http://localhost:8080/getImage/${person.photo}`}
              alt="Profile"
              className="max-w-full h-auto"
            />
          <p>{person.desc}</p>
          <p>Exp: {person.exp}</p>
          <ul>
            {person.techs.map((s, index) => (
              <li key={index}>{s}</li>
            ))}
          </ul>
          <button
            className="border-2 border-black m-2 p-2"
            htmlFor={person.no}
            onClick={() => setOpenModal(person.no)}
          >
            Edit
          </button>
          <button
            className="border-2 border-black p-2"
            onClick={() => {
              handleDelete(person.no);
            }}
          >
            Delete
          </button>
        </div>

        {/* Main modal */}
        {openModal === person.no && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit Post
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setOpenModal(null)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5 space-y-4 text-black">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Hello {person.profile}
                </p>
                <div className="mt-4">
            <img
              src={`http://localhost:8080/getImage/${person.photo}`}
              alt="Profile"
              className="max-w-full h-auto"
            />
          </div>
                <div>
                  <label className="text-white">Profile: </label>
                  <input
                    type="text"
                    defaultValue={form.profile}
                    onChange={(e) => {
                      setForm({ ...form, profile: e.target.value });
                    }}
                  ></input>
                </div>
                <div>
                  <label className="text-white">Exp: </label>
                  <input
                    type="text"
                    defaultValue={form.exp}
                    onChange={(e) => {
                      setForm({ ...form, exp: e.target.value });
                    }}
                  ></input>
                </div>
                <div>
                  <label className="text-white">Description: </label>
                  <input
                    type="text"
                    defaultValue={form.desc}
                    onChange={(e) => {
                      setForm({ ...form, desc: e.target.value });
                    }}
                  ></input>
                </div>
                <div className="text-white">
                  <ul>
                    {skillSet.map(({ name }, index) => (
                      <li key={index}>
                        <div>
                          <input
                            type="checkbox"
                            id={`custom-checkbox-${index}`}
                            name={name}
                            value={name}

                            defaultChecked={form.techs.includes(name)}
                            onChange={handleCheckboxChange}
                          />
                          <label htmlFor={`custom-checkbox-${index}`}>
                            {name}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={()=>{updatePost(person.no);setOpenModal(null)}}
                >
                  Save changes
                </button>
                <button
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={() => setOpenModal(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1>Feed Area</h1>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </button>
      <div>
        <label>Search</label>
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          className="border-4"
        />
      </div>
      <div className="flex gap-2 flex-wrap justify-center m-2">
        {post &&
          post.map((data) => {
            return <PersonCard key={data.no} person={data} />;
          })}
      </div>
    </div>
  );
}

export default Feed;
