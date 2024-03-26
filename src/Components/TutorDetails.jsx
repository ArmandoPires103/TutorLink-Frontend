import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

const TutorDetails = () => {
  const API = import.meta.env.VITE_BASE_URL;

  const [selectedTutor, setSelectedTutor] = useState([]);

  const { tutorId } = useParams();

  useEffect(() => {
    fetch(`${API}/api/users/tutors/${tutorId}`)
      .then((res) => res.json())
      .then((data) => setSelectedTutor(data.tutor));
  });

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
        <Link to="/dashboard" className="tutor-card-spacing">
          <button className="view-more">Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default TutorDetails;
