import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../Components/StudentRequest.css";
import Header from "./Header";
import { Link } from "react-router-dom";

function StudentRequest() {
  const API = import.meta.env.VITE_BASE_URL;
  const [studentRequest, setStudentRequest] = useState([]);
  const { user } = useOutletContext();
  console.log(useOutletContext());

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        if (user.id) {
          const response = await fetch(`${API}/api/requests/${user.id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          const data = await response.json();
          console.log(data);
          setStudentRequest(data);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, [user.id]);

  const csrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="))
    .split("=")[1]; // Extract CSRF token from cookies

  const toggleAcceptance = async (requestId) => {
    try {
      // Send a PUT request to update the acceptance status of the request
      const response = await fetch(
        `${API}/api/requests/${user.id}/request/${requestId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "CSRF-TOKEN": csrfToken,
          },
          credentials: "include",
          body: JSON.stringify({ accepted: true }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update acceptance status");
      }
      // Update the local state to reflect the accepted status
      const updatedStudentRequest = studentRequest.map((request) => {
        if (request.request_id === requestId) {
          return { ...request, accepted: true };
        }
        return request;
      });
      setStudentRequest(updatedStudentRequest);

      console.log("Acceptance status updated successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error updating acceptance status:", error);
    }
  };
  
  const rejectRequest = async (requestId) => {
    try {
      const response = await fetch(
        `${API}/api/requests/${user.id}/request/${requestId}`,
        {
          method: "DELETE", // Assuming your backend uses DELETE method to remove requests
          headers: {
            "Content-Type": "application/json",
            "CSRF-TOKEN": csrfToken,
          },
          credentials: "include",
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to reject request");
      }
  
      // Remove the rejected request from the studentRequest state
      const updatedStudentRequest = studentRequest.filter(
        (request) => request.request_id !== requestId
      );
      setStudentRequest(updatedStudentRequest);
  
      console.log("Request rejected successfully");
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };
  

  return (
    <div>
      <Header />
      <div className="student-request-container">
        <h2>Welcome, {user && user.username.toUpperCase()}</h2>
        <h2 className="requests-title">Student Requests</h2>
        {/* <div className="button-logout">
          <button className="dashboard-btns"><Link to="/login">
            Logout
          </Link></button>
        </div> */}
        {studentRequest.map(
          ({
            request_id,
            student_name,
            student_email,
            student_profile_pic,
            accepted,
          }) => (
            <div className="card" key={request_id}>
              <div className="image-info-container">
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
            </div>
              {!accepted && (
             <div className="accept-reject-buttons">
             <button className="dashboard-btns view-more:hover" onClick={() => toggleAcceptance(request_id)}>
               Accept
             </button>
             <button className="dashboard-btns view-more:hover" onClick={() => rejectRequest(request_id)}>
               Reject
             </button>
           </div>
           
              )}
              {accepted && <p>Request Accepted</p>}
            </div>
          )
        )}

        {/* <div className="button-logout">
          <button><Link to="/login" className="btn-logout">
            Logout
          </Link></button>
        </div> */}
      </div>
    </div>
  );
}

export default StudentRequest;
