import React from "react";
import "../css/Contact.css";
import Navbar from "./Navbar";
import { div } from "framer-motion/m";
import contact from "../../assets/contact.png"

const ContactPage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <div className="contact-page">
        <div className="contact-container">
          {/* Left Side - Image */}
          <div className="contact-image">
            <img src={contact} alt="Contact Us" />
          </div>

          {/* Right Side - Contact Info */}
          <div className="contact-info">
            <h2>Contact Us</h2>

            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h3>Address</h3>
                <p>
                  123 Medical Street
                  <br />
                  Health City, HC 45678
                  <br />
                  Nepal
                </p>
              </div>
            </div>

            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <div>
                <h3>Phone</h3>
                <p>+977 980-0008900</p>
                <p>Emergency: +977 980-8000901</p>
              </div>
            </div>

            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h3>Email</h3>
                <p>contact@medbook.com</p>
                <p>support@medbook.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
