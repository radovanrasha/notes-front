import { Navigate, useLocation } from "react-router-dom";

function GuestRoutes({ isLoggedIn, children }) {
  const location = useLocation();

  if (isLoggedIn) {
    // Redirect to projects page (or any other page) if logged in
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}

export default GuestRoutes;
