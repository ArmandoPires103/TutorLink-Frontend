import { useState } from "react";
import { useOutletContext } from "react-router-dom";
// Created by Juli & Carlitos
const API = import.meta.env.VITE_BASE_URL;
const StudentReviewForm = ({ selectedTutor }) => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context

  console.log(user);

  console.log(user);
  const [formData, setFormData] = useState({
    username: user.username, // username of student
    name: selectedTutor.name, // from prop get tutor username
    subject: selectedTutor.subject,
    description: "",
    ratings: 5,
    user_id: user.id,
    tutor_id: selectedTutor.id,
  });

  console.log(formData);

  console.log(`${API}api/users/tutors/${selectedTutor.id}/reviews`);

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

        setFormData({
          username: user.username, // username of student
          name: selectedTutor.name, // from prop get tutor username
          subject: selectedTutor.subject,
          description: "",
          ratings: 5,
          user_id: user.id,
          tutor_id: selectedTutor.id,
        });
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
        // Handle error if insertion fails
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
    <div>
      <h2>Add New Student Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Student:</label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="input-gray-out"
            required
          />
        </div>
        <div>
          <label htmlFor="name">Tutor Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="input-gray-out"
            required
          />
        </div>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            id="subject"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="input-gray-out"
            required
          />
        </div>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StudentReviewForm;
