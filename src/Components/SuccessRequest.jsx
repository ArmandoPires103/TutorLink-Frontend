import React from "react";

const SuccessRequest = ({ selectedTutor }) => {
  const { name } = selectedTutor;

  return (
    <div className="success-request">
      <strong>
        You have successfully requested an appointment with {name}! Please give{" "}
        {name} some time to view your request.
      </strong>
    </div>
  );
};

export default SuccessRequest;
