import React, { useEffect, useState } from "react";

const Tutors = () => {
  const API = import.meta.env.VITE_BASE_URL;

  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/users`)
      .then((res) => res.json())
      .then((data) => setTutors(data));
  }, [tutors]);

  return <div>Tutors</div>;
};

export default Tutors;
