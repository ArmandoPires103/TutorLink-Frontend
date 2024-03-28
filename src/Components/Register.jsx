import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Header from './Header'

const URL = import.meta.env.VITE_BASE_URL

const Register = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({ 
    profile_pic:'', // for cloudinary
    name:'', 
    username: '', 
    password: '', 
    email: '', 
    is_tutor: false, 
    is_remote: false, 
    subject: null,
    description: null,
    is_enrolled: false, // used for studentRequests
    is_booked: false // used for studentRequests
  });
  const [imageURL, setImageURL] = useState() // add profile_pic key

  function handleChange(event) {
    setUser({ ...user, [event.target.id]: event.target.value })
  }
// goes to back end to auth controller
  async function handleSubmit(e) {
    e.preventDefault()
    const csrfToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('XSRF-TOKEN='))
      .split('=')[1] // Extract CSRF token from cookies
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': csrfToken, // Include CSRF token in request headers
      },
      credentials: 'include', // Important: Include cookies in the request
      // body: JSON.stringify(user, imageURL),
      body: JSON.stringify(user),
    }

    try {
      const res = await fetch(`${URL}/api/auth/register`, options)
      if (!res.ok) throw new Error('Registration failed')

      navigate('/dashboard') // Navigate to /dashboard on success
    } catch (error) {
      console.error('Error during registration:', error)
    }
  }
  
  // to upload picture
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
      cloudinaryRef.current = window.cloudinary 
      console.log(cloudinaryRef.current)
      widgetRef.current = cloudinaryRef.current.createUploadWidget({
          cloudName:'dhexjuuzd',
          uploadPreset: 'upload-image',
      }, function (error, result) {
          if (result && result.event === 'success') {
              const uploadedURL = result.info.secure_url;
              setImageURL(uploadedURL);
              console.log('Image uploaded. URL:', uploadedURL);
          } else if (error) {
              console.error('Error uploading image:', error);
          }
          console.log(result.info.url)
      })
  }, [])

  // BUILD OUT YOUR FORM PROPERLY WITH LABELS AND WHATEVER CSS FRAMEWORK YOU MAY USE OR VANILLA CSS. THIS IS JUST A BOILERPLATE

  return (
    <div>
      <Header />
      <div className="login-body">
        <div className="wrapper">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <label htmlFor="name">
                <input
                  id="name"
                  name="name"
                  value={user.name}
                  type="text"
                  placeholder="Full Name"
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </label>
            </div>
            <br />
            <div className="input-box">
              <label htmlFor="username">
                <input
                  id="username"
                  name="username"
                  value={user.username}
                  type="text"
                  placeholder="Username"
                  onChange={handleChange}
                  autoComplete="username"
                  required
                />
              </label>
            </div>
            {/* temporary until css is fixed */}
            <br />
            <div className="input-box">
              <label htmlFor="email">
                <input
                  id="email"
                  name="email"
                  value={user.email}
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </label>
            </div>
            <br />
            <div className="input-box">
              <label htmlFor="password">
                <input
                  id="password"
                  name="password"
                  value={user.password}
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
              </label>
            </div>
            <br />
            <div>
              <label htmlFor="is_tutor">User Type</label>
              <select
                id="is_tutor"
                name="is_tutor"
                value={user.is_tutor}
                onChange={handleChange}
                required
              >
                <option value={false}>Student</option>
                <option value={true}>Tutor</option>
              </select>
            </div>
            <br />
            {/* Conditional rendering based on user type */}
            {user.is_tutor && (
              <div>
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  value={user.subject}
                  type="text"
                  placeholder="Subject"
                  onChange={handleChange}
                  autoComplete="subject"
                />
                <br />
                <label htmlFor="description">Biography</label>
                <input
                  id="description"
                  name="description"
                  value={user.description}
                  type="textarea"
                  placeholder="Add Short Description"
                  onChange={handleChange}
                />
                <label htmlFor="is_remote">Remote?</label>
                <select
                  id="is_remote"
                  name="is_remote"
                  value={user.is_remote}
                  onChange={handleChange}
                  required
                >
                  <option value={false}>In Person</option>
                  <option value={true}>Remote</option>
                </select>
              </div>
            )}
            <br />
            <button type='submit' className='btn'>Submit</button>
          </form>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
          <button className="add-image-button" onClick={() => widgetRef.current.open()}>
            Add Profile Picture
          </button>
        </div>
      </div>
    </div>
  );  
}

export default Register;