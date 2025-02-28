import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const Admin = JSON.parse(localStorage.getItem("admin")); // Retrieve token from localStorage
  const type = Admin?.type; // Retrieve user type from token

  console.log("AdminProtectedRoute", Admin, type);
  return type === "admin" ? <Outlet /> : <Navigate to="/AdminSign" replace />;
};

export default AdminProtectedRoute;
