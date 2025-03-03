import { Navigate, Outlet } from "react-router-dom";

const UserProtectedRoute = () => {
  const User = JSON.parse(localStorage.getItem("user"));
  // Retrieve token from localStorage
  const type = User?.type;
  // Retrieve user type from token

  console.log("UserProtectedRoute", User, type);
  return type === "user" ? <Outlet /> : <Navigate to="/login" replace />;
};

export default UserProtectedRoute;
