import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
// import { authApi } from "../api/api";
import "../css/AdminSignup.css";

const AdminSignup = ({ setAdminToken }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const toggleAuthMode = () => setIsLogin(!isLogin);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setErrors({});

      try {
        if (isLogin) {
          // Admin Login
          const { data } = await authApi.adminLogin(email, password);
          localStorage.setItem("adminToken", data.token);
          setAdminToken(data.token);
          toast.success("Admin Login Successful");
          navigate("/admin/dashboard");
        } else {
          // Admin Signup (should be protected in backend)
          const { data } = await authApi.adminRegister({
            name,
            email,
            password,
            phone,
            role: "admin"
          });
          toast.success("Admin Registration Successful");
          toggleAuthMode(); // Switch to login after successful registration
        }
      } catch (error) {
        const errorMessage = error.response?.data?.error ||
          (isLogin ? "Login failed" : "Registration failed");
        toast.error(errorMessage);
        setErrors({ general: errorMessage });
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

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="admin-input-group">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="admin-input"
              />
            </div>
          )}

          <div className="admin-input-group">
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
