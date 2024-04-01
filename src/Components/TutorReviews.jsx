import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import StudentsEditReviewForm from "./StudentsEditReviewForm";
import DeleteReviewSuccess from "./DeleteReviewSuccess";

const TutorReviews = ({ selectedTutor, toggleReviews, setToggleReviews }) => {
  const API = import.meta.env.VITE_BASE_URL;
  const { user } = useOutletContext();

  const [tutorReviews, setTutorReviews] = useState([]);
  const [editReviewId, setEditReviewId] = useState(null);
  const [displayComponent, setDisplayComponent] = useState(false);
  const tutorId = selectedTutor.id;

  const navigate = useNavigate();

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
        } else {
          console.error("Failed to delete review");
        }
      })
      .then(() => {
        setDisplayComponent(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 4000);
      })
      .catch((error) => {
        console.error("Error occurred while deleting review:", error);
      });
  }

  return (
    <div>
      <h1>Reviews</h1>
      {displayComponent && <DeleteReviewSuccess />}
      {tutorReviews.map(({ id, description, ratings, user_id }) => (
        <div key={id}>
          <p>{"⭐".repeat(ratings)}</p>
          <p>{description}</p>
          {user_id === user.id && (
            <>
              <div className=" button-layout">
                <button
                  onClick={() => handleEdit(id)}
                  className="button-spacing review-edit-del-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(id)}
                  className="button-spacing review-edit-del-button"
                >
                  Delete
                </button>
              </div>

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
