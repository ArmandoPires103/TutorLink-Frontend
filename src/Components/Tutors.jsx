import React, { useEffect, useState } from "react";
import "../tutor.css";
import { Link } from "react-router-dom";
import Header from "./Header";

const Tutors = () => {
  const API = import.meta.env.VITE_BASE_URL;

  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/users/tutors`)
      .then((res) => res.json())
      .then((data) => setTutors(data.tutors));
  }, [tutors]);

  return (
    <div>
      <Header/>
    <div className="tutor-listing">
      {tutors &&
        tutors.map(({ profile_pic, name, subject, is_remote, id }) => (
          <div key={id} className="tutor-card">
            <img
              src={profile_pic}
              alt={profile_pic}
              className="tutor-img tutor-card-spacing"
            />
            <p className="tutor-card-spacing">
              <strong>{name}</strong>
            </p>
            <p className="tutor-card-spacing">
              {" "}
              <strong>Expertise: </strong> {subject}
            </p>
            <p className="tutor-card-spacing">
              {" "}
              <strong>Remote: </strong> {is_remote ? "Yes" : "No"}
            </p>
            <Link to={`/dashboard/tutor/${id}`} className="tutor-card-spacing">
              <button className="view-more view-more:hover ">
                View More...
              </button>
            </Link>
          </div>
        ))}
    </div>
    </div>
  );
};

export default Tutors;
