import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Signup.css";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import axios from "axios";

const Signup = ({ setToken }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [signEmail, setSignEmail] = useState("");
  const [signPasswordVisible, setSignPasswordVisible] = useState(false);
  const [signPassword, setSignPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const navigate = useNavigate();

  const [logEmail, setLogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");

  const toggleForm = () => {
    setIsLogin((prevState) => !prevState);
  };

  const togglePasswordVisibility = () => {
    setSignPasswordVisible((prevState) => !prevState);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    const passwordLengthValid = signPassword.length >= 8;
    const containsUpperCase = /[A-Z]/.test(signPassword);
    const containsNumber = /\d/.test(signPassword);
    const containsSpecialChar = /[@$!%*?&#]/.test(signPassword);

    if (!passwordLengthValid) {
      setPasswordError("Passwords must have atleast 8 characters.");
      hasError = true;
    } else if (!containsNumber || !containsSpecialChar || !containsUpperCase) {
      setPasswordError(
        "Password must contain at least one uppercase, number, and special character."
      );
      hasError = true;
    } else if (signPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (phoneNumber.length !== 10) {
      setPhoneNumberError("Contact number must be exactly 10 digits");
      hasError = true;
    } else {
      setPhoneNumberError("");
    }
    if (hasError) return;
    setIsLoading(true);

    try {
      const requestData = {
        username: username,
        email: signEmail,
        password: signPassword,
        phone: phoneNumber,
        address: address,
        type: "user",
      };
      console.log("Request Data:", requestData);

      const response = await axios.post(
        "http://localhost:4000/users/register",
        requestData
      );

      if (response.status === 200) {
        console.log("Signup Successful:", response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.user);
        toast.success("Register Successful");
        navigate("/Home");
      } else {
        console.error("Signup failed:", response.data.error);
        setErrors({ general: response.data.error });
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Register Failed");

      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/users/login", {
        email: logEmail,
        password: logPassword,
      });
      console.log("Response:", response);
      if (response.status === 200) {
        // setToken(response.data.token);
        console.log("Logging in, token recieved:", response.data.token);
        toast.success("Login Sucessful");
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("user", JSON.stringify(response?.data?.user));

        navigate("/Home");
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
    <div className="main">
      <input type="checkbox" id="chk" aria-hidden="true" />
      <div className="signup">
        <form onSubmit={handleSignupSubmit}>
          <label htmlFor="chk" aria-hidden="true" className="heading">
            Signup
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="User Name"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            name="signEmail"
            placeholder="Email"
            required
            value={signEmail}
            onChange={(e) => setSignEmail(e.target.value)}
          />
          <div className="pwcontainer">
            <input
              type={signPasswordVisible ? "text" : "password"}
              name="signPassword"
              placeholder="Password"
              required
              value={signPassword}
              onChange={(e) => setSignPassword(e.target.value)}
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

          <div className="pwcontainer">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="address"
            name="address"
            placeholder="Address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {passwordError && <p className="error">{passwordError}</p>}
          {phoneNumberError && <p className="error">{phoneNumberError}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
          <label htmlFor="chk" aria-hidden="true">
            Already have an account? Click Here
          </label>
        </form>
      </div>

      <div className="login">
        <form onSubmit={handleLoginSubmit}>
          <label htmlFor="chk" aria-hidden="true" className="heading">
            Login
          </label>
          <input
            type="email"
            name="LogEmail"
            placeholder="Email"
            required
            value={logEmail}
            onChange={(e) => setLogEmail(e.target.value)}
          />
          <input
            type="password"
            name="LogPassword"
            placeholder="Password"
            required
            value={logPassword}
            onChange={(e) => setLogPassword(e.target.value)}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
