import React, { useState } from "react";
import "../css/DoctorDash.css";
import Navbar from "../public/Navbar";
import DocNavbar from "./DocNavbar";
import axios from "axios";
const DoctorAdmin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  // const [bookings, setBookings] = useState([]);
  const [appointments, setAppointments] = useState([]);

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
    availableDays: [],
    availableTime: [],
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

  console.log(profile);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/doctor/viewDoctor/${doctorId}`
      );
      if (res) {
        console.log(res?.data);
        setDoctorDetail(res.data);
        setProfile((prevProfile) => ({
          ...prevProfile,
          doctorName: res?.data?.doctorName,
          doctorEmail: res?.data?.doctorEmail || "",
          speciality: res?.data?.speciality || "",
          phone: res?.data?.phone || "",
          address: res?.data?.address || "",
          dob: res?.data?.dob || "",
          medicalID: res?.data?.medicalID || "",
          experience: res?.data?.experience || "",
          doctorImage: res?.data?.doctorImage || null,
          availableDays: res?.data?.availableDays || [],
          availableTime: res?.data?.availableTime || [],
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAppointmentsById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/booking/viewBookDoc/${doctorId}`
      );
      console.log(response.data);
      setAppointments(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchDoctors();
    fetchAppointmentsById();
  }, []);

  const handleDoctorEdit = async () => {
    console.log("k xa");
    try {
      const res = await axios.put(
        `http://localhost:4000/doctor/updateDoctor/${doctorId}`,
        profile
      );
      if (res) fetchDoctors();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(appointments);

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
                  <h3>Total Appointments</h3>
                  <p>{appointments?.length || 0}</p>
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
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Day</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt) => (
                    <tr key={appt.id}>
                      <td>{appt.User.username}</td>
                      <td>{appt.User.email}</td>
                      <td>{appt.User.phone}</td>
                      <td>{appt.date}</td>
                      <td>{appt.startTime}</td>
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
                    handleDoctorEdit();
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
                      type="text"
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
                      type="text"
                      name="experience"
                      value={profile.experience}
                      onChange={handleProfileEdit}
                    />
                  </label>
                  <label>
                    Available Days:
                    <input
                      type="text"
                      name="availableDays"
                      value={profile.availableDays}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          availableDays: e.target.value
                            .split(",")
                            .map((item) => item.trim())
                            .filter((item) => item !== ""),
                        })
                      }
                    />
                  </label>
                  <label>
                    Available Times:
                    <input
                      type="text"
                      name="availableTime"
                      value={profile.availableTime}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          availableTime: e.target.value
                            .split(",")
                            .map((item) => item.trim())
                            .filter((item) => item !== ""),
                        })
                      }
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
                    <strong>Date of Birth:</strong>{" "}
                    {new Date(doctorDetail.dob).toLocaleDateString("en-US", {
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
                    <strong>Available Days:</strong>{" "}
                    {doctorDetail?.availableDays?.join(", ") || "N/A"}
                  </p>
                  <p>
                    <strong>Available Times:</strong>{" "}
                    {doctorDetail?.availableTime?.join(", ") || "N/A"}
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
