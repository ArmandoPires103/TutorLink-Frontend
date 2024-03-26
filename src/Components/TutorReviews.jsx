import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TutorReviews = ({ selectedTutor }) => {
  const API = import.meta.env.VITE_BASE_URL;

  const [tutorReviews, setTutorReviews] = useState([]);
  //   const [student, setStudent] = useState([]);
  const tutorId = selectedTutor.id;

  useEffect(() => {
    fetch(`${API}/api/users/tutors/${tutorId}/reviews`)
      .then((res) => res.json())
      .then((data) => setTutorReviews(data.tutorReviews));
  }, [tutorId]);

  return (
    <div>
      <h1>Reviews</h1>
      <div>
        {tutorReviews &&
          tutorReviews.map(({ id, description, ratings }) => (
            <div key={id}>
              <p>{"⭐".repeat(ratings)}</p>
              <p>{description}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TutorReviews;
