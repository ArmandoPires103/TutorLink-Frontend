import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Components/Login.css"
import Header from "./Header";

const URL = import.meta.env.VITE_BASE_URL;
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" });

  function handleChange(event) {
    setUser({ ...user, [event.target.id]: event.target.value });
  }
  // This function is being used in two places. It can be extracted to a helpers.js file

  async function postFetch(user) {
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
      body: JSON.stringify(user),
    };
    // next 3 lines are to see/test data - we want to save this to a state variable for logged in user
    // once looged in state variable witll update with logged in user's info
    // fetch(`${URL}/api/auth/login`, options)
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
    try {
      const res = await fetch(`${URL}/api/auth/login`, options);
      const data = await res.json();
      if (!res.ok) {
        alert("Login failed");
        setUser({ username: "", password: "" });
        throw new Error("Registration failed");
      }
      // change line 44  when we create the tutors perspective
      console.log(data)
      if (!data.user_details.is_tutor) navigate("/dashboard");
      else navigate("/requests");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  // Login Function
  async function handleSubmit(e) {
    e.preventDefault();
    if (!user.username || !user.password) {
      alert("You must enter a username and password");
      return;
    }

    postFetch(user);
  }

  //Demo User Login Function
  async function handleDemoSignIn(e) {
    e.preventDefault();
    const user = { username: "demo", password: "password" };
    postFetch(user);
  }

  // BUILD OUT YOUR FORM PROPERLY WITH LABELS AND WHATEVER CSS FRAMEWORK YOU MAY USE OR VANILLA CSS. THIS IS JUST A BOILERPLATE

  return (
    <div>
      <Header/>
      
    <div className="login-body">
    <div className="wrapper">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
        <label htmlFor="username">
          <input
            id="username"
            value={user.username}
            type="text"
            placeholder="username"
            autoComplete="username"
            onChange={handleChange}
          />
        </label>
        </div>
        <br />
        <div className="input-box">
        <label htmlFor="password">
          <input
            id="password"
            value={user.password}
            type="password"
            placeholder="password"
            onChange={handleChange}
            autoComplete="current-password"
          />
        </label>
        </div>
        <br />
        <button type="submit" class="btn">Login</button>
      </form>
        <div className="register-link">
      <p>
        No Account? <Link to="/register">Register</Link>
      </p>
        </div>
    </div>
    </div>
    </div>
  );
};

export default Login;
