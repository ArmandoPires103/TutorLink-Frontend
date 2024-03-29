import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../Components/StudentRequest.css"
import Header from "./Header";
import { Link } from "react-router-dom";

function StudentRequest() {
  const API = import.meta.env.VITE_BASE_URL;
  const [studentRequest, setStudentRequest] = useState([]); 
  const { user } = useOutletContext();
  console.log(useOutletContext())
  
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        if (user.id) {
          const response = await fetch(`${API}/api/requests/${user.id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          console.log(data)
          setStudentRequest(data); 
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, [user.id]);

  const csrfToken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("XSRF-TOKEN="))
  .split("=")[1]; // Extract CSRF token from cookies

  const handleAccept = async () => {
    try {
      const response = await fetch(`${API}/api/requests/${user.id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "CSRF-Token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({ tutorId: user.id })
      });
      if (!response.ok) {
        throw new Error('Failed to accept student request');
      }
      // Update the student request list after accepting
      const updatedStudentRequest = studentRequest.filter(user => user.student_id !== userId);
      setStudentRequest(updatedStudentRequest);
    } catch (error) {
      console.error('Error accepting student request:', error);
    }
  };

  const handleReject = async () => {
    try {
      const response = await fetch(`${API}/api/requests/${user.id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "CSRF-Token": csrfToken,
        },
        body: JSON.stringify({ tutorId: user.id })
      });
      if (!response.ok) {
        throw new Error('Failed to reject student request');
      }
      // Update the student request list after rejecting
      const updatedStudentRequest = studentRequest.filter(student => student.student_id !== studentId);
      setStudentRequest(updatedStudentRequest);
    } catch (error) {
      console.error('Error rejecting student request:', error);
    }
  };

  return (
    <div>
      <Header/>
      <div className="student-request-container">
        <h2>Welcome, {user && user.username.toUpperCase()}</h2>
        <h2 className="requests-title">Student Requests</h2> 
        {studentRequest.map(({ student_name, student_id, student_email, student_profile_pic, is_enrolled }) => (
          <div className="card" key={student_id}>
            <div className="imgBx">
              <img src={student_profile_pic} alt="Student Profile Pic" />
            </div>
            <div className="student-request-info"> 
              <div className="student-name">
                Student Name: <span className="bold"> {student_name} </span>
              </div>
              <div className="student-email">
                Student Email: <span className="bold"> {student_email} </span>
              </div>
            </div>
            { !is_enrolled && 
              <div className="accept-reject-buttons">
                <button onClick={() => handleAccept(student_id)}>Accept</button>
                <button onClick={() => handleReject(student_id)}>Reject</button>
              </div>
            }
          </div>
        ))}
        <div className="button-logout">
          <Link to="/login" className="btn-logout">Logout</Link>
        </div>
      </div>
    </div>
  );
}

export default StudentRequest;



