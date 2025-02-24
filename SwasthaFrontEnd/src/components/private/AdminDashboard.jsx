import React, { useState } from "react";
import "../css/AdminDashboard.css";
import Navbar from "../public/Navbar";
import DocNavbar from "./DocNavbar";
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [viewMode, setViewMode] = useState("table"); // For doctor list view
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      email: "sarah@clinic.com",
      experience: "10 years",
      fee: "$150",
      description: "Senior Cardiologist",
      profileImg: "",
    },
  ]);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "John Doe",
      age: 35,
      date: "2023-08-15",
      time: "10:00 AM",
      doctor: "Dr. Sarah Johnson",
      status: "pending",
    },
  ]);

  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialty: "",
    email: "",
    address: "",
    experience: "",
    fee: "",
    description: "",
    profileImg: null,
  });

  const handleAppointmentStatus = (id, status) => {
    setAppointments(
      appointments.map((appt) => (appt.id === id ? { ...appt, status } : appt))
    );
  };

  const handleAddDoctor = (e) => {
    e.preventDefault();
    const doctorWithId = { ...newDoctor, id: doctors.length + 1 };
    setDoctors([...doctors, doctorWithId]);
    setNewDoctor({
      name: "",
      specialty: "",
      email: "",
      address: "",
      experience: "",
      fee: "",
      description: "",
      profileImg: null,
    });
  };

  const handleFileChange = (e) => {
    setNewDoctor({
      ...newDoctor,
      profileImg: URL.createObjectURL(e.target.files[0]),
    });
  };

  return (
    <div className="admin page">
      <DocNavbar />
      <div className="admin-container">
        <nav className="admin-nav">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={activeTab === "dashboard" ? "active" : ""}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("appointments")}
            className={activeTab === "appointments" ? "active" : ""}
          >
            Appointments
          </button>
          <button
            onClick={() => setActiveTab("addDoctor")}
            className={activeTab === "addDoctor" ? "active" : ""}
          >
            Add Doctor
          </button>
          <button
            onClick={() => setActiveTab("doctorList")}
            className={activeTab === "doctorList" ? "active" : ""}
          >
            Doctors List
          </button>
        </nav>

        <div className="tab-content">
          {activeTab === "dashboard" && (
            <div className="dashboard">
              <h2>Dashboard Overview</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Doctors</h3>
                  <p>{doctors.length}</p>
                </div>
                <div className="stat-card">
                  <h3>Total Appointments</h3>
                  <p>{appointments.length}</p>
                </div>
                <div className="stat-card">
                  <h3>Total Patients</h3>
                  <p>45</p>
                </div>
              </div>

              <div className="latest-bookings">
                <h3>Latest Bookings</h3>
                <ul>
                  {appointments.slice(-5).map((appt) => (
                    <li key={appt.id}>
                      <span>{appt.patientName}</span>
                      <span>{appt.doctor}</span>
                      <span>
                        {appt.date} {appt.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "appointments" && (
            <div className="appointments">
              <h2>Appointments Management</h2>
              <table>
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Age</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Doctor</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt) => (
                    <tr key={appt.id}>
                      <td>{appt.patientName}</td>
                      <td>{appt.age}</td>
                      <td>{appt.date}</td>
                      <td>{appt.time}</td>
                      <td>{appt.doctor}</td>
                      <td className={`status ${appt.status}`}>{appt.status}</td>
                      <td>
                        {appt.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleAppointmentStatus(appt.id, "accepted")
                              }
                              className="accept"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                handleAppointmentStatus(appt.id, "rejected")
                              }
                              className="reject"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "addDoctor" && (
            <div className="add-doctor">
              <h2>Add New Doctor</h2>
              <form onSubmit={handleAddDoctor}>
                <div className="form-group">
                  <label>Profile Picture</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  {newDoctor.profileImg && (
                    <img
                      src={newDoctor.profileImg}
                      alt="Preview"
                      className="profile-preview"
                    />
                  )}
                </div>

                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={newDoctor.name}
                    onChange={(e) =>
                      setNewDoctor({ ...newDoctor, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Specialty</label>
                  <input
                    type="text"
                    value={newDoctor.specialty}
                    onChange={(e) =>
                      setNewDoctor({ ...newDoctor, specialty: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={newDoctor.email}
                    onChange={(e) =>
                      setNewDoctor({ ...newDoctor, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    value={newDoctor.address}
                    onChange={(e) =>
                      setNewDoctor({ ...newDoctor, address: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Experience</label>
                  <input
                    type="text"
                    value={newDoctor.experience}
                    onChange={(e) =>
                      setNewDoctor({ ...newDoctor, experience: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Consultation Fee</label>
                  <input
                    type="text"
                    value={newDoctor.fee}
                    onChange={(e) =>
                      setNewDoctor({ ...newDoctor, fee: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={newDoctor.description}
                    onChange={(e) =>
                      setNewDoctor({
                        ...newDoctor,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <button type="submit" className="submit-btn">
                  Add Doctor
                </button>
              </form>
            </div>
          )}

          {activeTab === "doctorList" && (
            <div className="doctor-list">
              <div className="view-toggle">
                <button
                  onClick={() => setViewMode("table")}
                  className={viewMode === "table" ? "active" : ""}
                >
                  Table View
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "active" : ""}
                >
                  Card View
                </button>
              </div>

              {viewMode === "table" ? (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Specialty</th>
                      <th>Email</th>
                      <th>Experience</th>
                      <th>Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map((doctor) => (
                      <tr key={doctor.id}>
                        <td>{doctor.name}</td>
                        <td>{doctor.specialty}</td>
                        <td>{doctor.email}</td>
                        <td>{doctor.experience}</td>
                        <td>{doctor.fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="doctor-grid">
                  {doctors.map((doctor) => (
                    <div className="doctor-card" key={doctor.id}>
                      {doctor.profileImg && (
                        <img
                          src={doctor.profileImg}
                          alt={doctor.name}
                          className="doctor-image"
                        />
                      )}
                      <h3>{doctor.name}</h3>
                      <p>
                        <strong>Specialty:</strong> {doctor.specialty}
                      </p>
                      <p>
                        <strong>Experience:</strong> {doctor.experience}
                      </p>
                      <p>
                        <strong>Fee:</strong> {doctor.fee}
                      </p>
                      <p>
                        <strong>Email:</strong> {doctor.email}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
