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
      speciality: "Cardiology",
      email: "sarah@clinic.com",
      experience: "10 years",
      
      description: "Senior Cardiologist",
      doctorImage: "",
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
    doctorName: "",
    speciality: "",
    doctorEmail: "",
    phone: "",
    experience: "",
    description: "",
    doctorImage: null,
    dob: "",
    medicalID: "",
    address: "",
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
      doctorName: "",
      speciality: "",
      doctorEmail: "",
      phone: "",
      address: "",
      experience: "",
      description: "",
      doctorImage: null,
    });
  };

  const handleFileChange = (e) => {
    setNewDoctor({
      ...newDoctor,
      doctorImage: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleDeleteDoctor = (doctorId) => {
    setDoctors(doctors.filter((doctor) => doctor.id !== doctorId));
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
                  {newDoctor.doctorImage && (
                    <img
                      src={newDoctor.doctorImage}
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
                    value={newDoctor.speciality}
                    onChange={(e) =>
                      setNewDoctor({ ...newDoctor, speciality: e.target.value })
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
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    value={newDoctor.dob}
                    onChange={(e) =>
                      setNewDoctor({ ...newDoctor, dob: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>License Number</label>
                  <input
                    type="text"
                    value={newDoctor.medicalID}
                    onChange={(e) =>
                      setNewDoctor({
                        ...newDoctor,
                        medicalID: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={newDoctor.phone}
                    onChange={(e) =>
                      setNewDoctor({
                        ...newDoctor,
                        phone: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Specialty</label>
                  <select
                    value={newDoctor.speciality}
                    onChange={(e) =>
                      setNewDoctor({ ...newDoctor, speciality: e.target.value })
                    }
                    required
                  >
                    <option value="">Select Specialty</option>
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Pediatrician">Pediatrician</option>
                    <option value="Orthopedist">Orthopedist</option>
                    <option value="General Medicine">General Medicine</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Address of Work</label>
                  <input
                    type="text"
                    value={newDoctor.address}
                    onChange={(e) =>
                      setNewDoctor({
                        ...newDoctor,
                        address: e.target.value,
                      })
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
                      <th>Profile</th>
                      <th>Name</th>
                      <th>Specialty</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Experience</th>
                      <th>Address</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map((doctor) => (
                      <tr key={doctor.id}>
                        <td>
                          {doctor.doctorImage && (
                            <img
                              src={doctor.doctorImage}
                              alt="Profile"
                              className="table-profile-img"
                            />
                          )}
                        </td>
                        <td>{doctor.name}</td>
                        <td>{doctor.speciality}</td>
                        <td>{doctor.email}</td>
                        <td>{doctor.phone}</td>
                        <td>{doctor.experience}</td>
                        <td>{doctor.address}</td>
                        <td>
                          <button
                            onClick={() => handleDeleteDoctor(doctor.id)}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="doctor-grid">
                  {doctors.map((doctor) => (
                    <div className="doctor-card" key={doctor.id}>
                      <button
                        onClick={() => handleDeleteDoctor(doctor.id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                      {doctor.doctorImage && (
                        <img
                          src={doctor.doctorImage}
                          alt={doctor.name}
                          className="doctor-image"
                        />
                      )}
                      <h3>{doctor.name}</h3>
                      <p>
                        <strong>Specialty:</strong> {doctor.speciality}
                      </p>
                      <p>
                        <strong>Experience:</strong> {doctor.experience}
                      </p>
                      <p>
                        <strong>Address:</strong> {doctor.address}
                      </p>
                      <p>
                        <strong>Email:</strong> {doctor.email}
                      </p>
                      <button
                        onClick={() => handleDeleteDoctor(doctor.id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
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
