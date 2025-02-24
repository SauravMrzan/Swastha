import React, { useState } from "react";
import "../css/Doctors.css";
import Navbar from "../public/Navbar";
import doc1 from "../../assets/doc1.png";

const DoctorPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Sample available dates (next 7 days)
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  // Sample time slots
  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  // Sample doctor data
  const doctor = {
    name: "Dr. Sarah Smith",
    specialty: "Cardiologist",
    degree: "MD, Cardiology",
    experience: "15 years experience",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: doc1,
  };

  return (
    <div>
      <Navbar />
      <div className="doctor-page">
        {/* Doctor Information Section */}
        <div className="doctor-info-section">
          <div className="doctor-image">
            <img src={doctor.image} alt={doctor.name} />
          </div>
          <div className="doctor-details">
            <h1>{doctor.name}</h1>
            <p className="specialty">{doctor.specialty}</p>
            <p className="degree">{doctor.degree}</p>
            <p className="experience">{doctor.experience}</p>
            <div className="about-section">
              <h3>About</h3>
              <p>{doctor.about}</p>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="booking-section">
          <h2>Available Slots</h2>
          <div className="date-selector">
            {availableDates.map((date, index) => (
              <div
                key={index}
                className={`date-card ${
                  selectedDate === date ? "selected" : ""
                }`}
                onClick={() => setSelectedDate(date)}
              >
                <div className="day">
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </div>
                <div className="date">{date.getDate()}</div>
              </div>
            ))}
          </div>

          {selectedDate && (
            <div className="time-slots">
              <h3>Available Times for {selectedDate.toLocaleDateString()}</h3>
              <div className="time-grid">
                {timeSlots.map((time, index) => (
                  <button
                    key={index}
                    className={`time-slot ${
                      selectedTime === time ? "selected" : ""
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedTime && (
            <button className="confirm-booking">
              Confirm Appointment at {selectedTime}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorPage;
