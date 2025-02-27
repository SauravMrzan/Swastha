import React, { useState } from "react";
import "../css/DoctorSignup.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const DoctorSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    doctorName: "",
    doctorEmail: "",
    password: "",
    confirmPassword: "",
    speciality: "",
    dob: "",
    medicalID: "",
    address: "",
  });

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
    const [signPasswordVisible, setSignPasswordVisible] = useState(false);
const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const specialties = [
    "Cardiology",
    "Dermatology",
    "Pediatrics",
    "Orthopedics",
    "Neurology",
    "General Practice",
  ];

  const navigate = useNavigate();
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    try {
      const requestData = { ...formData, type: "doctor" };
      const response = await axios.post(
        "http://localhost:4000/doctor/docRegister",
        requestData
      );

      if (response.status === 200) {
        console.log("Signup Successful:", response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.user);
        toast.success("Register Successful");
        navigate("/DoctorDash");
      } else {
        console.error("Signup failed:", response.data.error);
        // setErrors({ general: response.data.error });
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Register Failed");

      // setErrors({ general: "Something went wrong. Please try again." });
    }
    // finally {
    //   setIsLoading(false);
    // }
  };

  // console.log(loginData)
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/doctor/docLogin", {
        email: loginEmail,
        password: loginPassword,
      });
      localStorage.setItem("token", res?.data?.token);
      localStorage.setItem("doctor", JSON.stringify(res?.data?.Doctor));
      console.log(res);
      navigate("/DoctorDash");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-container">
      <div className={`form-container ${isLogin ? "login" : "signup"}`}>
        <div className="form-header">
          <button
            className={`toggle-btn ${isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`toggle-btn ${!isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit}>
          {!isLogin && (
            <>
              <div className="input-group">
                <input
                  type="text"
                  name="doctorName"
                  placeholder="Doctor Name"
                  value={formData.doctorName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row">
                <div className="input-group">
                  <select
                    name="speciality"
                    value={formData.speciality}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Specialty</option>
                    {specialties.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <input
                  type="text"
                  name="medicalID"
                  placeholder="License Number"
                  value={formData.medicalID}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="doctorEmail"
                  placeholder="Email"
                  value={formData.doctorEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          {isLogin && (
            <>
              <div className="input-group">
                <input
                  type="email"
                  // name="email"
                  placeholder="Email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  // name="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                {signPasswordVisible ? (
                              <FaRegEye
                                className="hide"
                                onClick={() => setSignPasswordVisible(!signPasswordVisible)}
                              />
                            ) : (
                              <FaRegEyeSlash
                                className="hide"
                                onClick={() => setSignPasswordVisible(!signPasswordVisible)}
                              />
                            )}
                
              </div>
            </>
          )}

          {!isLogin && (
            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {confirmPasswordVisible ? (
                            <FaRegEye
                              className="hide"
                              onClick={() =>
                                setConfirmPasswordVisible(!confirmPasswordVisible)
                              }
                            />
                          ) : (
                            <FaRegEyeSlash
                              className="hide"
                              onClick={() =>
                                setConfirmPasswordVisible(!confirmPasswordVisible)
                              }
                            />
                          )}
            </div>
          )}

          <button
            type="submit"
            className="submit-btn"
            // onClick={handleLoginSubmit}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorSignup;
