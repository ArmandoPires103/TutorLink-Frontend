import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const TutorDetails = () => {
  const API = import.meta.env.VITE_BASE_URL;

  const [selectedTutor, setSelectedTutor] = useState([]);

  const { tutorId } = useParams();

  useEffect(() => {
    fetch(`${API}/api/users/tutors/${tutorId}`)
      .then((res) => res.json())
      .then((data) => setSelectedTutor(data.tutor));
  });

  return (
    <div>
      <h1>Tutor details</h1>
      <p>{selectedTutor.name}</p>
    </div>
  );
};

export default TutorDetails;
