import { useOutletContext, useNavigate, Link } from "react-router-dom";
import Tutors from "./Tutors";

//   const { user } = useOutletContext(); // Bring this in to any protected route where you wanna know the users details

const Dashboard = () => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context
  const navigate = useNavigate();

  async function handleLogout() {
    const response = await fetch("http://localhost:3003/api/auth/logout", {
      method: "GET", // or 'POST', depending on your backend
      credentials: "include",
    });
    if (response.ok) {
      // Here, you should also clear any authentication state in your application
      // For example, if you're using a global state or context to track authentication
      // setIsAuthenticated(false);
      // setUser(null);
      navigate("/login");
    }
  }
  return (
    <div className="dashboard-top">
      <h2>Welcome, {user && user.username.toUpperCase()}</h2>
      <h2 className="welcome-line">Meet our Tutors</h2>
      {/* Use user data as needed, for example: */}
      <div className="logout-button">
      <Link to="/dashboard/edit">Edit Profile</Link>
      <button onClick={handleLogout}>Logout</button>
      </div>
      <Tutors />
    </div>
  );
};

export default Dashboard;
