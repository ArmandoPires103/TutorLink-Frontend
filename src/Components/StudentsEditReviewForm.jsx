import React, { useEffect, useState } from "react";

const StudentsEditReviewForm = ({ tutorId, id, selectedTutor }) => {
  const API = import.meta.env.VITE_BASE_URL;

  const [editedTutorReview, setEditedTutorReview] = useState({
    subject: "",
    description: "",
    ratings: 0,
    tutor_name: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedTutorReview({
      ...editedTutorReview,
      [name]: value,
    });
  };

  useEffect(() => {
    fetch(`${API}/api/users/tutors/${selectedTutor.id}/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => setEditedTutorReview(data.review));
  }, []);

  return (
    <div>
      <h2>Edit Review</h2>
      <form>
        <div>
          <label htmlFor="username">Student:</label>
          <input id="username" type="text" name="username" required />
        </div>
        <div>
          <label htmlFor="name">Tutor Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={editedTutorReview.tutor_name}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            id="subject"
            type="text"
            name="subject"
            value={editedTutorReview.subject}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="description">Review:</label>
          <textarea
            id="description"
            name="description"
            value={editedTutorReview.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="ratings">Rating:</label>
          <select
            id="ratings"
            name="ratings"
            value={editedTutorReview.ratings}
            onChange={handleInputChange}
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

export default StudentsEditReviewForm;
