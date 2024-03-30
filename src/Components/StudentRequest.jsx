import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../Components/StudentRequest.css"
import Header from "./Header";
import { Link } from "react-router-dom";

function StudentRequest() {
  const API = import.meta.env.VITE_BASE_URL;
  const [studentRequest, setStudentRequest] = useState([]); 
  const [studentAccepted, setStudentAccepted] = useState(false)
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

  const toggleAcceptance = async () => {
    try {
      const response = await fetch(`${API}/api/requests/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "CSRF-TOKEN": csrfToken, 
        },
        body: JSON.stringify({ accepted: !studentAccepted }), 
      });
  
      if (!response.ok) {
        throw new Error("Failed to update acceptance status");
      }
  
      setStudentAccepted((booked) => !booked);
  
      console.log("Acceptance status updated successfully");
    } catch (error) {
      console.error("Error updating acceptance status:", error);
    }
  };
  

  //  const handleAccept = async (studentId) => {
  //   try {
  //     const response = await fetch(`${API}/api/users/students/${studentId}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         "CSRF-Token": csrfToken, // Assuming you have CSRF protection
  //       },
  //       credentials: "include",
  //       body: JSON.stringify({ is_enrolled: true }) // Assuming you want to set is_enrolled to true
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to accept student request');
  //     }
  //     // Update the student request list after accepting
  //     const updatedStudentRequest = studentRequest.map(student => {
  //       if (student.id === studentId) {
  //         return { ...student, is_enrolled: true };
  //       }
  //       return student;
  //     });
  //     setStudentRequest(updatedStudentRequest);
  //   } catch (error) {
  //     console.error('Error accepting student request:', error);
  //   }
  // };

  // useEffect(() => {
  //   const fetchStudentRequests = async () => {
  //     try {
  //       const response = await fetch(`${API}/api/users/students`);
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch student requests');
  //       }
  //       const data = await response.json();
  //       setStudentRequest(data.student);
  //     } catch (error) {
  //       console.error('Error fetching student requests:', error);
  //     }
  //   };
    
  //   fetchStudentRequests();
  // }, []);
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
                {studentAccepted ? <p>Request Accepted</p> : <button onClick={toggleAcceptance}>Accept</button>}

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



