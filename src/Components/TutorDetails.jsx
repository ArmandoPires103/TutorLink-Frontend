import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import TutorReviews from "./TutorReviews";
import StudentReviewForm from "./StudentReviewForm";

const TutorDetails = () => {
  const API = import.meta.env.VITE_BASE_URL;

  const [selectedTutor, setSelectedTutor] = useState([]);
  const [toggleReviews, setToggleReviews] = useState(false);
  const [toggleCreateReview, setToggleCreateReview] = useState(false);

  const { tutorId } = useParams();

  useEffect(() => {
    fetch(`${API}/api/users/tutors/${tutorId}`)
      .then((res) => res.json())
      .then((data) => setSelectedTutor(data.tutor));
  }, [tutorId]);

  function handleToggleReviews() {
    setToggleReviews(!toggleReviews);
  }

  function handleCreateReview() {
    setToggleCreateReview(!toggleCreateReview)
  }

  const { name, subject, description, profile_pic } = selectedTutor;

  return (
    <div className="tutor-details-wrapper">
      <div className="tutor-details-content">
        <h1 className="tutor-card-spacing">{name}</h1>
        <img
          src={profile_pic}
          alt={profile_pic}
          className="tutor-img tutor-card-spacing"
        />
        <p className="tutor-card-spacing">
          <strong>Expertise: </strong>
          {subject}
        </p>
        <p className="tutor-card-spacing">{description}</p>
        <div className="button-layout">
          <Link to="/dashboard">
            <button className="view-more button-spacing">Back to Home</button>
          </Link>
          <button
            onClick={handleToggleReviews}
            className="view-more button-spacing"
          >
            {!toggleReviews ? "View Reviews" : "Close Reviews"}
          </button>
          <button
            onClick={handleCreateReview}
            className="view-more button-spacing"
          >
            {!toggleCreateReview? "Leave a Review": "Cancel"}
          </button>
          {toggleCreateReview && <StudentReviewForm selectedTutor={selectedTutor}/>}
        </div>
        {toggleReviews && <TutorReviews selectedTutor={selectedTutor} />}
      </div>
    </div>
  );
};

export default TutorDetails;
