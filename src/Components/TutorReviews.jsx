import React from "react";

const TutorReviews = ({ selectedTutor }) => {
  return (
    <div>
      <h1>Reviews</h1>
      <p>{selectedTutor.name}</p>
    </div>
  );
};

export default TutorReviews;
