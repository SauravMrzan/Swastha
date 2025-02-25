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
    doctorImage: null,
    doctorName: "Dr. Sarah Johnson",
    doctorEmail: "sarah@clinic.com",
    speciality: "Cardiology",
    phone: "+1 234 567 890",
    address: "123 Medical St, Health City",
    dateOfBirth: "1985-03-15",
    licenseNumber: "MD-123456",
    experience: 10,
    description:
      "Experienced cardiologist with specialization in interventional procedures and heart failure management.",
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
                  <div className="profile-img-upload">
                    <label>
                      Profile Image:
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            doctorImage: e.target.files[0],
                          }))
                        }
                      />
                    </label>
                  </div>
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
                      name="speciality"
                      value={profile.speciality}
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
                  <label>
                    Date of Birth:
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={profile.dateOfBirth}
                      onChange={handleProfileEdit}
                    />
                  </label>

                  <label>
                    License Number:
                    <input
                      type="text"
                      name="licenseNumber"
                      value={profile.licenseNumber}
                      onChange={handleProfileEdit}
                    />
                  </label>

                  <label>
                    Experience (years):
                    <input
                      type="number"
                      name="experience"
                      value={profile.experience}
                      onChange={handleProfileEdit}
                    />
                  </label>

                  <label>
                    Description:
                    <textarea
                      name="description"
                      value={profile.description}
                      onChange={handleProfileEdit}
                    />
                  </label>
                  <button type="submit">Save Changes</button>
                </form>
              ) : (
                <div className="profile-info">
                  <div className="profile-header">
                    {profile.doctorImage && (
                      <img
                        src={URL.createObjectURL(profile.doctorImage)}
                        alt="Profile"
                        className="profile-image"
                      />
                    )}
                    <div className="profile-basic-info">
                      <h3>{profile.name}</h3>
                      <p>{profile.specialty}</p>
                    </div>
                  </div>
                  <p>
                    <strong>Name:</strong> {profile.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {profile.email}
                  </p>
                  <p>
                    <strong>Specialty:</strong> {profile.speciality}
                  </p>
                  <p>
                    <strong>Phone:</strong> {profile.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {profile.address}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong> {profile.dateOfBirth}
                  </p>
                  <p>
                    <strong>License Number:</strong> {profile.licenseNumber}
                  </p>
                  <p>
                    <strong>Experience:</strong> {profile.experience} years
                  </p>
                  <p>
                    <strong>Description:</strong> {profile.description}
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
