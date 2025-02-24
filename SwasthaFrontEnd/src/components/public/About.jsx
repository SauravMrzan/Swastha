import React from "react";
import { motion } from "framer-motion";
import "../css/About.css";
import "../css/Home.css";

import Navbar from "./Navbar";

const AboutUs = () => {
  return (
    <div className="home-page">
      <Navbar />
      <h1 className="title">About Us</h1>
      <div className="about-section">
        <div className="image-container">
          <img src="" alt="Doctor" className="image" />
        </div>
        <div className="text-container">
          <p className="description">
            Welcome to our doctor appointment booking website. We strive to
            provide efficient and convenient healthcare services to our
            patients.
          </p>
          <h2 className="subtitle">Our Vision</h2>
          <p className="description">
            Our vision is to revolutionize healthcare accessibility by providing
            a seamless and user-friendly platform for booking doctor
            appointments.
          </p>
        </div>
      </div>
      <div className="why-choose-us">
        <h2 className="section-title">Why Choose Us</h2>
        <div className="features-grid">
          {["Efficiency", "Convenience", "Personalization"].map((item) => (
            <motion.div
              key={item}
              className="feature-box"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="feature-title">{item}</h3>
              <p className="feature-description">
                {item === "Efficiency"
                  ? "Quick and easy appointment booking process."
                  : item === "Convenience"
                  ? "Book appointments anytime, anywhere."
                  : "Tailored healthcare experience for each patient."}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
