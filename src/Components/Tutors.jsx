import React, { useEffect, useState } from "react";
import "../tutor.css";

const Tutors = () => {
  const API = import.meta.env.VITE_BASE_URL;

  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/users`)
      .then((res) => res.json())
      .then((data) => setTutors(data.tutors));
  }, [tutors]);

  return (
    <div className="tutor-listing">
      {tutors &&
        tutors.map(({ profile_pic, name, subject, is_remote, id }) => (
          <div key={id} className="tutor-card">
            <img src={profile_pic} alt={profile_pic} />
            <p>{name}</p>
            <p>{subject}</p>
            <p>{is_remote}</p>
            <button className="view-more">View More...</button>
          </div>
        ))}
    </div>
  );
};

export default Tutors;
