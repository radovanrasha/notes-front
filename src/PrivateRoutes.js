import { Navigate, useLocation } from "react-router-dom";

function PrivateRoutes({ isLoggedIn, children }) {
  const location = useLocation();

  if (isLoggedIn === undefined) {
    // Redirect to homepage if not logged in
    return undefined;
  }

  if (!isLoggedIn) {
    // Redirect to homepage if not logged in
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}
export default PrivateRoutes;
