import React, { useState } from "react";
import "../css/AllDoctors.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import doc1 from "../../assets/doc1.png";
import doc2 from "../../assets/doc2.png";
import doc3 from "../../assets/doc3.png";
import doc4 from "../../assets/doc4.png";
import doc5 from "../../assets/doc5.png";
import axios from "axios";

const Home = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedSpeciality, setSelectedSpeciality] = useState("");

  const [doctorsList, setDoctorsList] = useState([]);

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
      speciality: "Cardiology",
      img: doc1,
    },
    {
      name: "Dr. John Doe",
      speciality: "Dermatology",
      img: doc2,
    },
    {
      name: "Dr. Emily Brown",
      speciality: "Pediatrics",
      img: doc3,
    },
    {
      name: "Dr. Michael Johnson",
      speciality: "Orthopedics",
      img: doc4,
    },
    {
      name: "Dr. Rachel Green",
      speciality: "Neurology",
      img: doc5,
    },
  ];

  const filteredDoctors =
    selectedSpeciality === "All" || !selectedSpeciality
      ? allDoctors
      : allDoctors.filter((doctor) => doctor.speciality === selectedSpeciality);

  React.useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/doctor/allDoctors?speciality=${selectedSpeciality}`
        );
        console.log(res, "res");
        setDoctorsList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDoctors();
  }, [selectedSpeciality]);

  console.log(selectedSpeciality, "sp");

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
          {specialties.map((speciality) => (
            <button
              key={speciality}
              className={`specialty-btn ${
                selectedSpeciality === speciality ? "active" : ""
              }`}
              onClick={() =>
                setSelectedSpeciality(speciality === "All" ? "" : speciality)
              }
            >
              {speciality}
            </button>
          ))}
        </nav>

        {/* Doctors Grid */}
        <main className="doctors-main">
          <h2>{selectedSpeciality || "All Doctors"}</h2>
          <div className="doctors-grid">
            {doctorsList?.map((doctor) => (
              <Link to={`/Doctors/${doctor.id}`}>
                <div key={doctor.id} className="doctor-card">
                  <img
                    src={
                      doctor?.doctorImage
                        ? doctor.doctorImage
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    }
                    alt={doctor.name}
                  />
                  <h3>{doctor.doctorName}</h3>
                  <p>{doctor.speciality}</p>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
