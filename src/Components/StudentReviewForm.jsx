import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import "./StudentReviewForm.css";
import SuccessCreateReview from "./SuccessCreateReview";
// Created by Juli & Carlitos
const API = import.meta.env.VITE_BASE_URL;
const StudentReviewForm = ({ selectedTutor }) => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context
  const navigate = useNavigate();

  const [displayComponent, setDisplayComponent] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    name: selectedTutor.name,
    subject: selectedTutor.subject,
    description: "",
    ratings: 5,
    user_id: user.id,
    tutor_id: selectedTutor.id,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      .split("=")[1]; // Extract CSRF token from cookies

    // tutor review by student (one to one)
    fetch(`${API}/api/users/tutors/${selectedTutor.id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "CSRF-Token": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data inserted successfully:", data);
        setDisplayComponent(true); // Set displayComponent to true to show the success message
        setTimeout(() => {
          navigate("/dashboard"); // Navigate after 4 seconds
        }, 4000);
      })

      .catch((error) => {
        console.error("Error inserting data:", error);
      });
  };

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="st-review-form">
      {displayComponent && <SuccessCreateReview />}
      <h2 className="leave-review">Leave a review</h2>
      <form onSubmit={handleSubmit}>
        <div className="input">
          {/* <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div> */}
          {/* <div>
          <label htmlFor="name">Tutor Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div> */}
          {/* <div>
          <label htmlFor="subject">Subject:</label>
          <input
            id="subject"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
          />
        </div> */}
          <div>
            <label htmlFor="description">Review:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="ratings">Rating:</label>
            <select
              id="ratings"
              name="ratings"
              value={formData.ratings}
              onChange={handleInputChange}
              required
            >
              <option value={5}>5</option>
              <option value={4}>4</option>
              <option value={3}>3</option>
              <option value={2}>2</option>
              <option value={1}>1</option>
            </select>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StudentReviewForm;
