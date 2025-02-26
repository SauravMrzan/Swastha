import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
// import { authApi } from "../api/api";
import "../css/AdminSignup.css";
import axios from "axios";

const AdminSignup = ({ setAdminToken }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [contact, setContact] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const toggleAuthMode = () => setIsLogin(!isLogin);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const requestData = {
        adminName,
        adminEmail,
        password,
        contact,
        type: "admin",
      };
      console.log("Request Data:", requestData);

      const response = await axios.post(
        "http://localhost:4000/admin/adminRegister",
        requestData
      );

      if (response.status === 200) {
        console.log("Signup Successful:", response.data.token);
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("admin", response.data.admin);
        toast.success("Admin Register Successful");
        navigate("/AdminDash");
      } else {
        console.error("Signup failed:", response.data.error);
        setErrors({ general: response.data.error });
        // Admin Signup (should be protected in backend)
        // const { data } = await authApi.adminRegister({
        //   adminName,
        //   adminEmail,
        //   password,
        //   phone,
        //   type: "admin",
        // });
        // toast.success("Admin Registration Successful");
        // toggleAuthMode(); // Switch to login after successful registration
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Admin Registration Failed");
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/admin/adminLogin",
        {
          email: adminEmail,
          password: password,
        }
      );
      console.log("Response:", response);
      if (response.status === 200) {
        // setToken(response.data.token);
        console.log("Logging in, token recieved:", response.data.token);
        toast.success("Admin Login Sucessful");
        localStorage.setItem("adminToken", response?.data?.token);
        localStorage.setItem("admin", JSON.stringify(response?.data?.admin));

        navigate("/AdminDash");
      } else {
        console.error("Login failed:", response.data.error);
        setErrors({ general: response.data.error });
      }
    } catch (err) {
      console.error("Error:", err);
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-auth-container">
      <div className={`admin-auth-form ${isLogin ? "login" : "signup"}`}>
        <h2 className="admin-auth-header">
          {isLogin ? "Admin Login" : "Admin Registration"}
        </h2>

        <form onSubmit={handleSignupSubmit}>
          {!isLogin && (
            <div className="admin-input-group">
              <input
                type="text"
                placeholder="Full Name"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                required
                className="admin-input"
              />
            </div>
          )}

          <div className="admin-input-group">
            <input
              type="email"
              placeholder="Admin Email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              required
              className="admin-input"
            />
          </div>

          <div className="admin-input-group password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="admin-input"
              minLength="8"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>

          {!isLogin && (
            <div className="admin-input-group">
              <input
                type="tel"
                placeholder="Contact Number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                className="admin-input"
                pattern="[0-9]{10}"
              />
            </div>
          )}

          {errors.general && (
            <div className="admin-error-message">{errors.general}</div>
          )}

          <button
            type="submit"
            className="admin-auth-button"
            disabled={isLoading}
          >
            {isLoading
              ? "Processing..."
              : isLogin
              ? "Login as Admin"
              : "Register Admin"}
          </button>
        </form>

        <div className="admin-auth-toggle">
          <span>
            {isLogin ? "Need admin access? " : "Already have admin account? "}
          </span>
          <button
            type="button"
            onClick={toggleAuthMode}
            className="toggle-button"
          >
            {isLogin ? "Register Here" : "Login Here"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
