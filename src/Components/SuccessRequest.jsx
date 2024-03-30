import React from "react";

const SuccessRequest = ({ selectedTutor }) => {
  const { name } = selectedTutor;

  const [firstName] = name.split(" ");

  return (
    <div className="success-request">
      <strong>
        You have successfully requested an appointment with {name}! Please give{" "}
        {firstName} some time to view your request.
      </strong>
    </div>
  );
};

export default SuccessRequest;
