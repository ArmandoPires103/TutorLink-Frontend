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
    setToggleCreateReview(!toggleCreateReview);
    // setToggleReviews(!toggleReviews);
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
          <Link to="/dashboard" className=" button-spacing">
            <button className="view-more">Back to Home</button>
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
            {!toggleCreateReview ? "Create a Review!" : "Cancel"}
          </button>
        </div>

        {toggleCreateReview && (
          <StudentReviewForm
            selectedTutor={selectedTutor}
            toggleReviews={toggleReviews}
            setToggleReviews={setToggleReviews}
          />
        )}
        {toggleReviews && (
          <TutorReviews
            selectedTutor={selectedTutor}
            setToggleReviews={setToggleReviews}
            toggleReviews={toggleReviews}
          />
        )}
      </div>
    </div>
  );
};

export default TutorDetails;
