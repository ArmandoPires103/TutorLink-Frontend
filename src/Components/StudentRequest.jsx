import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

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

  return (
    <div>
      <h2>Student Requests</h2> 
      {studentRequest.map(({ student_name, student_id, student_email, student_profile_pic }) => (
        <div key={student_id}> {/* Use student_id as the key */}
          <div>
            Student Name: {student_name}
          </div>
          <div>
            Student Email: {student_email}
          </div>
          <div>
            Student Profile Pic: <img src={student_profile_pic} alt="Student Profile Pic" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default StudentRequest;



