import React, { useEffect } from "react";

const StudentsEditReviewForm = ({ tutorId }) => {
  useEffect(() => {
    fetch(``);
  });

  return (
    <div>
      <h2>Edit Review</h2>
      <form>
        <div>
          <label htmlFor="username">Student:</label>
          <input id="username" type="text" name="username" required />
        </div>
        <div>
          <label htmlFor="name">Tutor Name:</label>
          <input id="name" type="text" name="name" required />
        </div>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input id="subject" type="text" name="subject" required />
        </div>
        <div>
          <label htmlFor="description">Review:</label>
          <textarea id="description" name="description" required />
        </div>
        <div>
          <label htmlFor="ratings">Rating:</label>
          <select id="ratings" name="ratings" required>
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StudentsEditReviewForm;
