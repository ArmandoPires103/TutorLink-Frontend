import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import TutorReviews from "./TutorReviews";
import StudentReviewForm from "./StudentReviewForm";
import { useOutletContext } from "react-router-dom";
import Header from "./Header";

const TutorDetails = () => {
  const API = import.meta.env.VITE_BASE_URL;

  const [selectedTutor, setSelectedTutor] = useState([]);
  const [toggleReviews, setToggleReviews] = useState(false);
  const [toggleCreateReview, setToggleCreateReview] = useState(false);
  const [availability, setAvailability] = useState(null);

  const { tutorId } = useParams();

  const { user } = useOutletContext();

  const [userData, setUserData] = useState({
    student_name: user.name,
    student_id: user.id,
    student_email: user.email,
    student_profile_pic: null,
    accepted: true,
  });

  useEffect(() => {
    fetch(`${API}/api/users/tutors/${tutorId}`)
      .then((res) => res.json())
      .then((data) => setSelectedTutor(data.tutor))
      .then(() => setAvailability(selectedTutor.is_enrolled));
  }, [tutorId]);

  function handleToggleReviews() {
    setToggleReviews(!toggleReviews);
  }

  function handleCreateReview() {
    setToggleCreateReview(!toggleCreateReview);
  }

  const handleBooking = (event) => {
    event.preventDefault();

    const bookingData = {
      ...userData,
      userId: user.id,
    };

    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      .split("=")[1];

    fetch(`${API}/api/requests/${tutorId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "CSRF-Token": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify(bookingData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => console.log("Data inserted!:", data))
      .catch((error) => console.error("Error handling booking:", error));
    setAvailability(true);
  };

  const { name, subject, description, profile_pic } = selectedTutor;

  return (
    <div>
      <Header />
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
            <Link to="/dashboard" className="view-more button-spacing">
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

            {availability ? (
              <button className="unavailable-button button-spacing">
                Tutor Unavailable
              </button>
            ) : (
              <button
                className="view-more button-spacing"
                onClick={handleBooking}
              >
                Book a Session!
              </button>
            )}
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
    </div>
  );
};

export default TutorDetails;
