import React, { useState } from "react";
import "../css/AllDoctors.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import doc1 from "../../assets/doc1.png";
import doc2 from "../../assets/doc2.png";
import doc3 from "../../assets/doc3.png";
import doc4 from "../../assets/doc4.png";

const Home = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  // Sample data
  const specialties = [
    "All",
    "Cardiology",
    "Dermatology",
    "Pediatrics",
    "Orthopedics",
    "Neurology",
    "General Medicine",
  ];

  const allDoctors = [
    {
      name: "Dr. Sarah Smith",
      specialty: "Cardiology",
      img: doc1,
    },
    {
      name: "Dr. John Doe",
      specialty: "Dermatology",
      img: doc2,
    },
    {
      name: "Dr. Emily Brown",
      specialty: "Pediatrics",
      img: doc3,
    },
    {
      name: "Dr. Michael Johnson",
      specialty: "Orthopedics",
      img: doc4,
    },
    {
      name: "Dr. Rachel Green",
      specialty: "Neurology",
      img: "https://via.placeholder.com/200",
    },
  ];

  const filteredDoctors =
    selectedSpecialty === "All" || !selectedSpecialty
      ? allDoctors
      : allDoctors.filter((doctor) => doctor.specialty === selectedSpecialty);

  return (
    <div className="home-page">
      {/* Header (same as before) */}
      <Navbar />
      {/* All Doctors Page */}
      {/* {activeTab === "doctors" && ( */}
      <div className="doctors-page">
        {/* Specialty Sidebar */}
        <nav className="specialty-sidebar">
          <h3>Specialties</h3>
          {specialties.map((specialty) => (
            <button
              key={specialty}
              className={`specialty-btn ${
                selectedSpecialty === specialty ? "active" : ""
              }`}
              onClick={() =>
                setSelectedSpecialty(specialty === "All" ? null : specialty)
              }
            >
              {specialty}
            </button>
          ))}
        </nav>

        {/* Doctors Grid */}
        <main className="doctors-main">
          <h2>{selectedSpecialty || "All Doctors"}</h2>
          <div className="doctors-grid">
            <Link to="/Doctors">
              {filteredDoctors.map((doctor) => (
                <div key={doctor.name} className="doctor-card">
                  <img src={doctor.img} alt={doctor.name} />
                  <h3>{doctor.name}</h3>
                  <p>{doctor.specialty}</p>
                </div>
              ))}
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
