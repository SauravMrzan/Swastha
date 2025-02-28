import React, { useState, useEffect } from "react";
import "../css/Doctors.css";
import Navbar from "../public/Navbar";
import doc1 from "../../assets/doc1.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formattedTimes, setFormattedTimes] = useState([]);
  const { id } = useParams();
  const [doctorInfo, setDoctorInfo] = useState({});
  const [userId, setUserId] = useState(null);

  // Fetch userId from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserId(JSON.parse(storedUser)?.id);
    }
  }, []);

  // Fetch doctor details by ID
  useEffect(() => {
    const fetchDoctorById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/doctor/viewDoctor/${id}`
        );
        setDoctorInfo(response?.data);

        // Format available time
        const times = response?.data?.availableTime?.map(
          (time) => `${time}:00 ${time >= 12 ? "PM" : "AM"}`
        );
        setFormattedTimes(times);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        toast.error("Failed to load doctor details.");
      }
    };

    fetchDoctorById();
  }, [id]);

  // Handle booking
  const booking = async () => {
    if (!userId) {
      toast.error("User not found. Please log in first.");
      return;
    }

    if (!selectedDate || !selectedTime) {
      toast.error("Please select a date and time.");
      return;
    }

    try {
      await axios.post("http://localhost:4000/booking/addBook", {
        doctorId: id,
        date: selectedDate,
        startTime: selectedTime,
        userId,
      });

      toast.success("Booking Successful!");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Booking Failed. Try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="doctor-page">
        {/* Doctor Information Section */}
        <div className="doctor-info-section">
          <div className="doctor-image">
            <img src={doctorInfo?.doctorImage || doc1} alt={doctorInfo?.doctorName || "Doctor"} />
          </div>
          <div className="doctor-details">
            <h1>{doctorInfo?.doctorName || "Doctor Name"}</h1>
            <p className="specialty">{doctorInfo?.speciality || "Speciality"}</p>
            <p className="experience">
              Experience: {doctorInfo?.experience ? `${doctorInfo?.experience} years` : "N/A"}
            </p>
          </div>
        </div>

        {/* Booking Section */}
        <div className="booking-section">
          <h2>Available Slots</h2>
          <div className="date-selector">
            {doctorInfo?.availableDays?.length ? (
              doctorInfo.availableDays.map((day, index) => (
                <div
                  key={index}
                  className={`date-card ${selectedDate === day ? "selected" : ""}`}
                  onClick={() => setSelectedDate(day)}
                >
                  {day}
                </div>
              ))
            ) : (
              <p>No available days</p>
            )}
          </div>

          {selectedDate && formattedTimes.length > 0 && (
            <div className="time-slots">
              <h3>Available Times for {selectedDate}</h3>
              <div className="time-grid">
                {formattedTimes.map((time, index) => (
                  <button
                    key={index}
                    className={`time-slot ${selectedTime === time ? "selected" : ""}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedTime && (
            <button className="confirm-booking" onClick={booking}>
              Confirm Appointment at {selectedTime}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorPage;
