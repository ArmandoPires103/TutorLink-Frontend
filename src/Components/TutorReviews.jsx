import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import StudentsEditReviewForm from "./StudentsEditReviewForm";

const TutorReviews = ({ selectedTutor }) => {
  const API = import.meta.env.VITE_BASE_URL;
  const { user } = useOutletContext();

  const [tutorReviews, setTutorReviews] = useState([]);
  const [editReviewId, setEditReviewId] = useState(null);
  const tutorId = selectedTutor.id;

  useEffect(() => {
    fetch(`${API}/api/users/tutors/${tutorId}/reviews`)
      .then((res) => res.json())
      .then((data) => setTutorReviews(data.tutorReviews));
  }, [tutorId]);

  function handleEdit(id) {
    setEditReviewId((prevId) => (prevId === id ? null : id));
  }

  return (
    <div>
      <h1>Reviews</h1>
      {tutorReviews.map(({ id, description, ratings, user_id }) => (
        <div key={id}>
          <p>{"⭐".repeat(ratings)}</p>
          <p>{description}</p>
          {user_id === user.id && (
            <>
              <button onClick={() => handleEdit(id)}>Edit</button>
              <button>Delete</button>
              {editReviewId === id && (
                <StudentsEditReviewForm tutorId={tutorId} />
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TutorReviews;
