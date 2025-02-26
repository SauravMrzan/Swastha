import React, { useState } from "react";
import "../css/DoctorDash.css";
import Navbar from "../public/Navbar";
import DocNavbar from "./DocNavbar";
import axios from "axios";
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

  const [doctorDetail, setDoctorDetail] = useState({});

  const [profile, setProfile] = useState({
    doctorImage: null,
    doctorName: "",
    doctorEmail: "",
    speciality: "",
    phone: "",
    address: "",
    dob: "",
    medicalID: "",
    experience: "",
    description: "",
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

  const doctorId = JSON.parse(localStorage.getItem("doctor")).id;

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/doctor/viewDoctor/${doctorId}`
      );
      if (res) {
        console.log(res?.data?.doctorName);
        setDoctorDetail(res.data);
        setProfile((prevProfile) => ({
          ...prevProfile,
          doctorName: res?.data?.doctorName,
          doctorEmail: res.data.doctorEmail || "",
          speciality: res.data.speciality || "",
          phone: res.data.phone || "",
          address: res.data.address || "",
          dob: res.data.dob || "",
          medicalID: res.data.medicalID || "",
          experience: res.data.experience || "",
          description: res.data.description || "",
          doctorImage: res.data.doctorImage || null,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDoctorEdit = async () => {
    try {
      const res = await axios.put(
        `http://localhost:4000/doctor/updateDoctor/${doctorId}`,
        { ...profile, file: doctorImage }
      );
      if (res) fetchDoctors();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
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
                    handleDoctorEdit();
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
                      name="doctorName"
                      value={profile.doctorName}
                      onChange={handleProfileEdit}
                    />
                  </label>
                  <label>
                    Email:
                    <input
                      type="email"
                      name="doctorEmail"
                      value={profile.doctorEmail}
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
                      name="dob"
                      value={profile.dob}
                      onChange={handleProfileEdit}
                    />
                  </label>

                  <label>
                    License Number:
                    <input
                      type="text"
                      name="medicalID"
                      value={profile.medicalID}
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
                      <h3>{doctorDetail.name}</h3>
                      <p>{doctorDetail.speciality}</p>
                    </div>
                  </div>
                  <p>
                    <strong>Name:</strong> {doctorDetail?.doctorName || "N/A"}
                  </p>
                  <p>
                    <strong>Email:</strong> {doctorDetail?.doctorEmail || "N/A"}
                  </p>
                  <p>
                    <strong>Specialty:</strong>{" "}
                    {doctorDetail?.speciality || "N/A"}
                  </p>
                  <p>
                    <strong>Phone:</strong> {doctorDetail?.phone || "N/A"}
                  </p>
                  <p>
                    <strong>Address:</strong> {doctorDetail?.address || "N/A"}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong> {new Date(doctorDetail.dob).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }) || "N/A"}
                  </p>
                  <p>
                    <strong>License Number:</strong>{" "}
                    {doctorDetail?.medicalID || "N/A"}
                  </p>
                  <p>
                    <strong>Experience:</strong>{" "}
                    {doctorDetail?.experience || "N/A"} years
                  </p>
                  <p>
                    <strong>Description:</strong>{" "}
                    {doctorDetail?.description || "N/A"}
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
