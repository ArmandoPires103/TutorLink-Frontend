import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { useRef } from 'react';
import Header from './Header'; // Import your context hook


const URL = import.meta.env.VITE_BASE_URL;

const Register = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useOutletContext() || {}; // Access the user object from context
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    is_tutor: false,
    is_remote: false,
    name: '',
    profile_pic: '',
    subject: '',
    description: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        password: '', // Password should not be populated for security reasons
        email: user.email || '',
        is_tutor: user.is_tutor || false,
        is_remote: user.is_remote || false,
        name: user.name || '',
        profile_pic: user.profile_pic || '',
        subject: user.subject || '',
        description: user.description || ''
      });
    }
  }, [user]);
  
  function setImageURL(uploadedURL){

    setUser({
      ...user,
      profile_pic: uploadedURL
    })
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

  function handleChange(event) {
    const { id, type, checked, value } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: newValue
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const csrfToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('XSRF-TOKEN='))
      .split('=')[1];

    const options = {
      method: user ? 'PUT' : 'POST', // Use PUT for updating, POST for new registration
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': csrfToken
      },
      credentials: 'include',
      body: JSON.stringify(formData)
    };

    try {

      const res = await fetch(user ? `${URL}/api/users/${user.id}` : `${URL}/api/auth/register`, options);
      if (!res.ok) throw new Error(user ? 'Update failed' : 'Registration failed');
      navigate('/dashboard')
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div>
      <Header/>
      <div className='login-body'>
        <div className='wrapper'>
      <h1>{user ? 'Edit_Profile' : 'Register'}</h1>
      <form onSubmit={handleSubmit}>
        <div className='input-box'>
        <label htmlFor="username">Username:</label>
        <input id="username" type="text" value={formData.username} onChange={handleChange} required />
        </div>
        <br />
        <div className='input-box'>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>
        <br />
        {!user && (
          <div className='input-box'>
            <label htmlFor="password">Password:</label>
            <input id="password" type="password" value={formData.password} onChange={handleChange} required />
          </div>
        )}
        <br />
        <br />
        <label htmlFor="is_tutor"> Are you a tutor?</label>
        <input id="is_tutor" type="checkbox" checked={formData.is_tutor} onChange={handleChange} />
        <div className='input-box'>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" checked={formData.name} onChange={handleChange}/>
        </div>
        <br />
        <div className='input-box'>
        <label htmlFor="subject">Subject:</label>
        <input id="subject" type="text" checked={formData.subject} onChange={handleChange}/>
        </div>
        <br />
        <div className='input-box'>
        <label htmlFor="description">Description:</label>
        <input id="description" type="text" checked={formData.description} onChange={handleChange}/>
        </div>
        <br />
        Do you prefer remote tutoring?
        <label htmlFor="is_remote">  </label>
        <input id="is_remote" type="checkbox" checked={formData.is_remote} onChange={handleChange}/>
        <br />
          <button type="submit" className='btn'>{user ? 'Update' : 'Register'}</button>
      </form>
      <div className='p-login'>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
      </div>
      <button className="btn" onClick={() => widgetRef.current.open()}> Add Image </button>
    </div>

    </div>
    </div>
  );
};

export default Register;

