import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const URL = import.meta.env.VITE_BASE_URL;

const TutorsNewForm = () => {

  const navigate = useNavigate();
  const [tutorForm, setTutorForm] = useState({ 
    name: "", 
    profile_pic: "", 
    subject: "", 
    is_remote: "", 
    description: "" 
  });

  function handleChange(e) {
    const { id, value } = e.target;
    setTutorForm({ ...tutorForm, [id]: value });
  }
  
  // This function is being used in two places. It can be extracted to a helpers.js file

  async function postFetch(tutorForm) {
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      .split("=")[1]; // Extract CSRF token from cookies
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "CSRF-Token": csrfToken, // Include CSRF token in request headers
      },
      credentials: "include", // Important: Include cookies in the request
      body: JSON.stringify(tutorForm),
    };

    try {
      const res = await fetch(`${URL}/api/auth/login`, options);
      if (!res.ok) {
        alert("Login failed");
        setTutorForm({name: "", password: "" });
        throw new Error("Registration failed");
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  // Login Function
  async function handleSubmit(e) {
    e.preventDefault();
    if (!tutorForm.name || !tutorForm.password) {
      alert("You must enter a username and password");
      return;
    }

    postFetch(tutorForm);
  }

  //Demo User Login Function
  async function handleDemoSignIn(e) {
    e.preventDefault();
    const tutor = { tutorname: "demo", password: "password" };
    postFetch(tutor);
  }

  useEffect(() => {
    // Fetch call to the root route of your backend to get the CSRF token
    fetch(`${URL}`, {
      credentials: "include", 
    })
      .then((response) => {
        if (response.ok) {
          console.log("XSRF-Token cookie should now be set.");
        }
      })
      .catch((error) => console.error("Error fetching CSRF token:", error));
  }, []);


  return (
    <div>
      <button onClick={handleDemoSignIn}>Demo Tutor Profile</button>
      <h4>Login</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <input
            id="name"
            value={tutorForm.name}
            type="text"
            placeholder="name"
            autoComplete="name"
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="profile_pic">
          <input
            id="profile_pic"
            value={tutorForm.profile_pic}
            type="text"
            placeholder="profile_pic"
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <label htmlFor="subject">
          <input
            id="subject"
            value={tutorForm.subject}
            type="text"
            placeholder="subject"
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="is_remote">
          <input
            id="is_remote "
            value={tutorForm.is_remote }
            type="text"
            placeholder="is_remote"
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="description">
          <input
            id="description"
            value={tutorForm.description}
            type="checkbox"
            placeholder="idescription"
            onChange={handleChange}
          />
        </label>
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default TutorsNewForm;
