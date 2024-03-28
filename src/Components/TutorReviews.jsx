import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import StudentsEditReviewForm from "./StudentsEditReviewForm";

const TutorReviews = ({ selectedTutor, toggleReviews, setToggleReviews }) => {
  const API = import.meta.env.VITE_BASE_URL;
  const { user } = useOutletContext();

  const [tutorReviews, setTutorReviews] = useState([]);
  const [editReviewId, setEditReviewId] = useState(null);
  const tutorId = selectedTutor.id;

  useEffect(() => {
    fetch(`${API}/api/users/tutors/${tutorId}/reviews`)
      .then((res) => res.json())
      .then((data) => setTutorReviews(data.tutorReviews));
  }, [tutorId, tutorReviews]);

  function handleEdit(id) {
    setEditReviewId((prevId) => (prevId === id ? null : id));
  }

  function handleDelete(id) {
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      .split("=")[1];

    fetch(`${API}/api/users/tutors/${tutorId}/reviews/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "CSRF-Token": csrfToken,
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setTutorReviews(tutorReviews.filter((review) => review.id !== id));
          // setToggleReviews(!toggleReviews);
        } else {
          console.error("Failed to delete review");
        }
      })
      .catch((error) => {
        console.error("Error occurred while deleting review:", error);
      });
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
              <button onClick={() => handleDelete(id)}>Delete</button>
              {editReviewId === id && (
                <StudentsEditReviewForm
                  tutorId={tutorId}
                  id={id}
                  selectedTutor={selectedTutor}
                  toggleReviews={toggleReviews}
                  setToggleReviews={setToggleReviews}
                />
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TutorReviews;
