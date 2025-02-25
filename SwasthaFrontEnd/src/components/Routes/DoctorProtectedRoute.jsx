import { Navigate, Outlet } from "react-router-dom";

const DoctorProtectedRoute = () => {
  const Doctor = JSON.parse(localStorage.getItem("doctor")); // Retrieve token from localStorage
  const type = Doctor?.type; // Retrieve user type from token

  console.log("DoctorProtectedRoute", Doctor, type);
  return type === "doctor" ? <Outlet /> : <Navigate to="/DocSignup" replace />;
};

export default DoctorProtectedRoute;
