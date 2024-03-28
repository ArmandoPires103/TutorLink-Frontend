// src/components/ProtectedRoute.jsx
import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
const URL = import.meta.env.VITE_BASE_URL;

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${URL}/api/auth/check-auth`, {
          credentials: "include", // Important: Include cookies in the request
        });
        if (response.ok) {
          const data = await response.json();

          setIsAuthenticated(data.isAuthenticated);
          setUser(data.user);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated, isLoading, user };
};

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" replace />;
  }

  return <Outlet context={{ user }} />; // If authenticated, continue rendering the component the route is pointing to
};

export default ProtectedRoute;
