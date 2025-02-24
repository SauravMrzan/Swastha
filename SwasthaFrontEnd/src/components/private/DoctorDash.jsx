import React, { useState } from "react";
import "../css/DoctorDash.css";
import Navbar from "../public/Navbar";
import DocNavbar from "./DocNavbar";
const DoctorAdmin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      name: "John Doe",
      age: 35,
      date: "2023-08-15",
      time: "10:00 AM",
      status: "pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 28,
      date: "2023-08-16",
      time: "2:30 PM",
      status: "accepted",
    },
    // Add more sample data
  ]);

  const [profile, setProfile] = useState({
    name: "Dr. Sarah Johnson",
    email: "sarah@clinic.com",
    specialty: "Cardiology",
    phone: "+1 234 567 890",
    address: "123 Medical St, Health City",
  });

  const [editMode, setEditMode] = useState(false);

  const handleAppointmentStatus = (id, status) => {
    setAppointments(
      appointments.map((appt) => (appt.id === id ? { ...appt, status } : appt))
    );
  };

  const handleProfileEdit = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="doctor-page">
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
            onClick={() => setActiveTab("profile")}
            className={activeTab === "profile" ? "active" : ""}
          >
            Profile
          </button>
        </nav>

        <div className="tab-content">
          {activeTab === "dashboard" && (
            <div className="dashboard">
              <h2>Dashboard</h2>
              <div className="stats">
                <div className="stat-card">
                  <h3>Total Patients</h3>
                  <p>45</p>
                </div>
                <div className="stat-card">
                  <h3>Upcoming Appointments</h3>
                  <p>12</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "appointments" && (
            <div className="appointments">
              <h2>Appointments</h2>
              <table>
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Age</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt) => (
                    <tr key={appt.id}>
                      <td>{appt.name}</td>
                      <td>{appt.age}</td>
                      <td>{appt.date}</td>
                      <td>{appt.time}</td>
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

          {activeTab === "profile" && (
            <div className="profile">
              <h2>Doctor Profile</h2>
              <div className="profile-actions">
                <button onClick={() => setEditMode(!editMode)}>
                  {editMode ? "Cancel" : "Edit Profile"}
                </button>
              </div>

              {editMode ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setEditMode(false);
                  }}
                >
                  <label>
                    Name:
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleProfileEdit}
                    />
                  </label>
                  <label>
                    Email:
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleProfileEdit}
                    />
                  </label>
                  <label>
                    Specialty:
                    <input
                      type="text"
                      name="specialty"
                      value={profile.specialty}
                      onChange={handleProfileEdit}
                    />
                  </label>
                  <label>
                    Phone:
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleProfileEdit}
                    />
                  </label>
                  <label>
                    Address:
                    <textarea
                      name="address"
                      value={profile.address}
                      onChange={handleProfileEdit}
                    />
                  </label>
                  <button type="submit">Save Changes</button>
                </form>
              ) : (
                <div className="profile-info">
                  <p>
                    <strong>Name:</strong> {profile.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {profile.email}
                  </p>
                  <p>
                    <strong>Specialty:</strong> {profile.specialty}
                  </p>
                  <p>
                    <strong>Phone:</strong> {profile.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {profile.address}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAdmin;
