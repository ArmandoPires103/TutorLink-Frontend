import { useState } from "react";
import { useParams, useOutletContext } from 'react-router-dom'

const API = import.meta.env.VITE_BASE_URL;
const StudentsNewForm = () => {
  const { id } = useParams(); // ??
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context
  const [formData, setFormData] = useState({
    tutor_id: "",
    subject: "",
    description: "",
    user_id: user.id,
    ratings: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // tutor review by student (one to one)
    fetch(`${API}/users/tutors/${user.id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log("Data inserted successfully:", data);

      setFormData({
        tutor_id: "",
        subject: "",
        description: "",
        user_id: id,
        ratings: ""
      });
    })
    .catch(error => {
      console.error("Error inserting data:", error);
      // Handle error if insertion fails
    });
  };

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div>
      <h2>Add New Student Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Assigned Tutor ID:</label>
          <input
            type="number"
            name="assignedTutorId"
            value={formData.tutor_id}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>User ID:</label>
          <input
            type="number"
            name="userId"
            value={formData.user_id}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Ratings:</label>
          <input
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

export default StudentsNewForm;
