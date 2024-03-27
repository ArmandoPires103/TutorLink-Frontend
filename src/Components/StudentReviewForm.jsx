import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const API = import.meta.env.VITE_BASE_URL;
const StudentReviewForm = ({ selectedTutor }) => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context

  console.log(user);
  const [formData, setFormData] = useState({
    username: user.username, // username of student
    name: selectedTutor.name, // from prop get tutor username
    subject: selectedTutor.subject,
    description: "",
    ratings: 1,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Retrieve CSRF token from cookies
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1]; // Use optional chaining to handle cases where token is not found

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "CSRF-Token": csrfToken, // Include CSRF token in request headers
        },
        body: JSON.stringify(formData),
      };
      const response = await fetch(
        `${API}/users/tutors/${selectedTutor.id}/reviews`,
        options
      );

      if (!response.ok) {
        throw new Error(`Failed to submit review: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data inserted successfully:", data);

      // Clear form data after successful submission
      setFormData({
        username: user.username,
        name: selectedTutor.name,
        subject: selectedTutor.subject,
        description: "",
        ratings: 1,
      });
    } catch (error) {
      console.error("Error inserting data:", error);
      // Handle error if insertion fails
    }
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
          <input
            id="ratings"
            type="number"
            name="ratings"
            value={formData.ratings}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StudentReviewForm;
