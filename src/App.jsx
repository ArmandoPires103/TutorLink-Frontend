import { Routes, Route, Link } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import TutorDetails from "./Components/TutorDetails";
import LandingPage from "./Components/LandingPage";
import About from "./Components/About";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} >
        <Route
          index 
          element={
            <div>
              <h1>Welcome to the Auth Starter</h1>
              <Link to="/login">Login</Link>
              <h2>If you are not logged in you cannot reach this route. Try!</h2>
              <Link to="/dashboard">Dashboard</Link>
            </div>
          }
        />
    </Route>
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        {/* Place protected routes here */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/tutor/:tutorId" element={<TutorDetails />} />
      </Route>

    </Routes>
  );
}

export default App;
