import React, { useState } from "react";
import "../css/AdminDashboard.css";
import Navbar from "../public/Navbar";
import DocNavbar from "./DocNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [viewMode, setViewMode] = useState("table"); // For doctor list view
  const [doctors, setDoctors] = useState([]);

  const [appointments, setAppointments] = useState([]);
  const [allDoctorDetail, setAllDoctorDetail] = useState([]);

  const [newDoctor, setNewDoctor] = useState({
    doctorName: "",
    speciality: "",
    doctorEmail: "",
    password: "",
    phone: "",
    experience: "",
    doctorImage: null,
    dob: "",
    medicalID: "",
    address: "",
    availableDays: [],
    availableTime: [],
  });

  const handleAppointmentStatus = (id, status) => {
    setAppointments(
      appointments.map((appt) => (appt.id === id ? { ...appt, status } : appt))
    );
  };
  const navigate = useNavigate();
  const handleAddDoctor = async (e) => {
    e.preventDefault();
    console.log(newDoctor);
    try {
      const requestData = {
        doctorName: newDoctor.doctorName,
        speciality: newDoctor.speciality,
        doctorEmail: newDoctor.doctorEmail,
        password: newDoctor.password,
        phone: newDoctor.phone,
        experience: newDoctor.experience,
        dob: newDoctor.dob,
        medicalID: newDoctor.medicalID,
        address: newDoctor.address,
        availableDays: newDoctor.availableDays,
        availableTime: newDoctor.availableTime,
        type: "doctor",
      };
      console.log("Request Data:", requestData);
      const response = await axios.post(
        "http://localhost:4000/doctor/addDoctor",
        requestData
      );
      if (response.status === 200) {
        console.log("Doctor Added Successful:", response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.user);
        toast.success("Doctor Successful");
      } else {
        console.error("Add Doctor failed:", response.data.error);
        // setErrors({ general: response.data.error });
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Doctor Failed");
    }

    const doctorWithId = { ...newDoctor, id: doctors.length + 1 };
    setDoctors([...doctors, doctorWithId]);
    setNewDoctor({
      doctorName: "",
      speciality: "",
      doctorEmail: "",
      password: "",
      phone: "",
      medicalID: "",
      address: "",
      experience: "",
      availableDays: [],
      availableTime: [],
      doctorImage: null,
    });
  };

  const doctorId = JSON.parse(localStorage.getItem("doctor")).id;

  const handleFileChange = (e) => {
    setNewDoctor({
      ...newDoctor,
      doctorImage: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleDeleteDoctor = (doctorId) => {
    setDoctors(doctors.filter((doctor) => doctor.id !== doctorId));
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/booking/viewBook"
      );
      if (response.status === 200) {
        console.log("Appointments:", response.data);
        setAppointments(response.data); // Update state with fetched appointments
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchAllDoctors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/doctor/allDoctors"
      );
      console.log(response.data);
      setAllDoctorDetail(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDoctor = async (doctorId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/doctor/deleteDoctor/${doctorId}`
      );
      if (response.status === 200) {
        console.log("Doctor Deleted:", response.data);
        toast.success("Doctor Deleted Successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Doctor Deletion Failed");
    }
  };

  React.useEffect(() => {
    fetchAppointments();
    fetchAllDoctors();
    deleteDoctor();
  }, []);

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
                  <p>{doctors?.length || 0}</p>
                </div>
                <div className="stat-card">
                  <h3>Total Appointments</h3>
                  <p>{appointments?.length || 0}</p>
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
                      <span>{appt.username}</span>
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
                    <th>Patient Email</th>
                    <th>Day</th>
                    <th>Time</th>
                    <th>Doctor</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt) => (
                    <tr key={appt.id}>
                      <td>{appt.User?.username || "N/A"}</td>
                      <td>{appt.User?.email || "N/A"}</td>
                      <td>{appt.date || "N/A"}</td>
                      <td>{appt.Bookings?.starttime || "N/A"}</td>
                      <td>{appt.Doctor?.doctorName || "N/A"}</td>
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
                    name="doctorName"
                    value={newDoctor.doctorName}
                    onChange={(e) =>
                      setNewDoctor({ ...newDoctor, doctorName: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="doctorEmail"
                    value={newDoctor.doctorEmail}
                    onChange={(e) =>
                      setNewDoctor({
                        ...newDoctor,
                        doctorEmail: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={newDoctor.password}
                    onChange={(e) =>
                      setNewDoctor({ ...newDoctor, password: e.target.value })
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
                  <label>Available Days</label>
                  <input
                    type="text"
                    name="availableDays"
                    value={newDoctor.availableDays}
                    onChange={(e) =>
                      setNewDoctor({
                        ...newDoctor,
                        availableDays: e.target.value
                          .split(",")
                          .map((item) => item.trim())
                          .filter((item) => item !== ""),
                      })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Available Time</label>
                  <input
                    type="text"
                    name="availableTime"
                    value={newDoctor.availableTime}
                    onChange={(e) =>
                      setNewDoctor({
                        ...newDoctor,
                        availableTime: e.target.value
                          .split(",")
                          .map((item) => item.trim())
                          .filter((item) => item !== ""),
                      })
                    }
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddDoctor();
                  }}
                >
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
                      <th>Doctor Name</th>
                      <th>Specialty</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Experience</th>
                      <th>Address</th>
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
                          alt={doctor.doctorName}
                          className="doctor-image"
                        />
                      )}
                      <h3>{allDoctorDetail?.doctorName}</h3>
                      <p>
                        <strong>Specialty:</strong>{" "}
                        {allDoctorDetail?.speciality}
                      </p>
                      <p>
                        <strong>Experience:</strong>{" "}
                        {allDoctorDetail?.experience}
                      </p>
                      <p>
                        <strong>Address:</strong> {allDoctorDetail?.address}
                      </p>
                      <p>
                        <strong>Email:</strong> {allDoctorDetail?.doctorEmail}
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
