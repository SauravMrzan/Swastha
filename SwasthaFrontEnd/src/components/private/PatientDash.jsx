import React, { useState } from "react";
import "../css/PatientDash.css";
import Navbar from "../public/Navbar";
import Patient1 from "../../assets/doc1.png";

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    age: "35",
    address: "123 Main Street, Cityville",
    bloodType: "O+",
    allergies: "None",
  });
  const [appointments] = useState([
    {
      id: 1,
      doctor: "Dr. Smith",
      specialty: "Cardiology",
      date: "2024-08-20",
      time: "10:00 AM",
      status: "Upcoming",
    },
    {
      id: 2,
      doctor: "Dr. Jane Doe",
      specialty: "Dermatology",
      date: "2024-07-15",
      time: "2:30 PM",
      status: "Completed",
    },
    // Add more sample data as needed...
  ]);

  const handleEditClick = () => setIsEditing(true);
  const handleSaveClick = () => setIsEditing(false);
  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedData({
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 890",
      age: "35",
      address: "123 Main Street, Cityville",
      bloodType: "O+",
      allergies: "None",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <Navbar />
      <div className="patient-dashboard">
        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-picture">
            <img src={Patient1} alt={"pat"} />
            {isEditing && (
              <button className="edit-photo-btn">Change Photo</button>
            )}
          </div>

          <div className="profile-info">
            <div className="profile-header">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editedData.name}
                  onChange={handleInputChange}
                  className="editing-input"
                />
              ) : (
                <h1>{editedData.name}</h1>
              )}
              <div className="profile-actions">
                {!isEditing ? (
                  <button className="edit-btn" onClick={handleEditClick}>
                    Edit Profile
                  </button>
                ) : (
                  <div className="edit-buttons">
                    <button className="save-btn" onClick={handleSaveClick}>
                      Save Changes
                    </button>
                    <button className="cancel-btn" onClick={handleCancelClick}>
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Info */}
            {isEditing ? (
      <>
        <div className="editing-field">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={editedData.email}
            onChange={handleInputChange}
            className="editing-input"
          />
        </div>
        <div className="editing-field">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={editedData.phone}
            onChange={handleInputChange}
            className="editing-input"
          />
        </div>
        <div className="editing-field">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={editedData.age}
            onChange={handleInputChange}
            className="editing-input"
            min="0"
          />
        </div>
        <div className="editing-field">
          <label>Address:</label>
          <textarea
            name="address"
            value={editedData.address}
            onChange={handleInputChange}
            className="editing-input"
            rows="3"
          />
        </div>
      </>
    ) : (
      <>
        <p className="email">{editedData.email}</p>
        <p className="phone">{editedData.phone}</p>
        <p className="age">Age: {editedData.age}</p>
        <p className="address"> {editedData.address}</p>
      </>
    )}

            {/* Medical Details */}
            <div className="medical-info">
              <h3>Medical Details</h3>
              {isEditing ? (
                <>
                  <div className="editing-field">
                    <label>Blood Type:</label>
                    <select
                      name="bloodType"
                      value={editedData.bloodType}
                      onChange={handleInputChange}
                      className="editing-input"
                    >
                      {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map(
                        (type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  <div className="editing-field">
                    <label>Allergies:</label>
                    <input
                      type="text"
                      name="allergies"
                      value={editedData.allergies}
                      onChange={handleInputChange}
                      className="editing-input"
                    />
                  </div>
                </>
              ) : (
                <>
                  <p>Blood Type: {editedData.bloodType}</p>
                  <p>Allergies: {editedData.allergies}</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="appointments-section">
          <div className="appointments-header">
            <button
              className={`tab-btn ${activeTab === "upcoming" ? "active" : ""}`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming Appointments
            </button>
            <button
              className={`tab-btn ${activeTab === "history" ? "active" : ""}`}
              onClick={() => setActiveTab("history")}
            >
              History
            </button>
          </div>

          {activeTab === "upcoming" && (
            <div className="appointments-list">
              {appointments
                .filter((app) => app.status === "Upcoming")
                .map((appointment) => (
                  <div
                    key={appointment.id}
                    className="appointment-card"
                    onClick={() => setSelectedAppointment(appointment)}
                  >
                    <div className="appointment-info">
                      <h3>{appointment.doctor}</h3>
                      <p>{appointment.specialty}</p>
                      <p>
                        {appointment.date} | {appointment.time}
                      </p>
                    </div>
                    <span
                      className={`status ${appointment.status.toLowerCase()}`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                ))}
            </div>
          )}

          {activeTab === "history" && (
            <div className="appointments-list">
              {appointments
                .filter((app) => app.status === "Completed")
                .map((appointment) => (
                  <div key={appointment.id} className="appointment-card">
                    <div className="appointment-info">
                      <h3>{appointment.doctor}</h3>
                      <p>{appointment.specialty}</p>
                      <p>
                        {appointment.date} | {appointment.time}
                      </p>
                    </div>
                    <span
                      className={`status ${appointment.status.toLowerCase()}`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                ))}
            </div>
          )}

          {selectedAppointment && (
            <div className="appointment-detail">
              <h3>Appointment Details</h3>
              <p>Doctor: {selectedAppointment.doctor}</p>
              <p>Date: {selectedAppointment.date}</p>
              <p>Time: {selectedAppointment.time}</p>
              <button
                className="cancel-btn"
                onClick={() => setSelectedAppointment(null)}
              >
                Cancel Appointment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
