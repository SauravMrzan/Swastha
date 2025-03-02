import React, { useState } from "react";
import "./AllDoctors";
import "../css/Home.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import cardiology from "../../assets/cardiology.png";
import dermatology from "../../assets/dermatology.png";
import pediatrics from "../../assets/pediatrician.png";
import orthopedics from "../../assets/orthopedic.png";
import neurology from "../../assets/neurology.png";
import generalmedicine from "../../assets/generalmed.png";
import medicalteam from "../../assets/medicalteam.png";
import doc1 from "../../assets/doc1.png";
import doc2 from "../../assets/doc2.png";
import doc3 from "../../assets/doc3.png";

import doctorgroup from "../../assets/doctorgroup.png";
const Home = () => {
  debugger;
  const [activeTab, setActiveTab] = useState("home");

  const specialties = [
    { name: "Cardiologist", img: cardiology },
    { name: "Dermatologist", img: dermatology },
    { name: "Pediatrician", img: pediatrics },
    { name: "Orthopedist", img: orthopedics },
    { name: "General Medicine", img: generalmedicine },
  ];

  const topDoctors = [
    {
      name: "Dr. Sarah Smith",
      specialty: "Cardiologist",
      img: doc1,
    },
    {
      name: "Dr. John Doe",
      specialty: "Dermatologist",
      img: doc2,
    },
    {
      name: "Dr. Emily Brown",
      specialty: "Pediatrician",
      img: doc3,
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Header */}

      <Navbar />

      {/* Main Content */}
      {activeTab === "home" && (
        <main>
          {/* Section 1 */}
          <section className="hero-section">
            <div className="hero-content">
              <h1>Book Appointment with Doctors</h1>
              <Link to="/AllDoctors">
                <button className="book-btn">Book Appointment</button>
              </Link>
            </div>
            <img src={doctorgroup} alt="Doctor" className="hero-img" />
          </section>

          {/* Section 2 */}
          <section className="specialties-section">
            <h2>Find by Specialization</h2>
            <div className="specialties-grid">
              {specialties.map((spec) => (
                <div key={spec.name} className="specialty-card">
                  <img src={spec.img} alt={spec.name} />
                  <p>{spec.name}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3 */}
          <section className="top-doctors-section">
            <h2>Our Top Doctors</h2>
            <div className="doctors-grid">
              {topDoctors.map((doctor) => (
                <div key={doctor.name} className="doctor-card">
                  <img src={doctor.img} alt={doctor.name} />
                  <h3>{doctor.name}</h3>
                  <p>{doctor.specialty}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4 */}
          <section className="banner-section">
            <img src={medicalteam} alt="Medical Team" className="banner-img" />
            <div className="banner-content">
              <p>Book appointment with our trusted doctors</p>
              <Link to="/AllDoctors">
                <button className="book-btn">Book Appointment</button>
              </Link>
            </div>
          </section>
        </main>
      )}
    </div>
  );
};

export default Home;
