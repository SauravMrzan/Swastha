import React, { useState } from "react";
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

  React.useEffect(() => {
    const fetchDoctorsById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/doctor/viewDoctor/${id}`
        );
        // console.log(response.data);
        setDoctorInfo(response?.data);

        const times = response?.data?.availableTime?.map(
          (time) => `${time}:00 ${time >= 12 ? "PM" : "AM"}`
        );

        setFormattedTimes(times);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDoctorsById();
  }, []);
  // console.log(doctorsList, "doctorsList");

  const userId = JSON.parse(localStorage.getItem("user")).id || "";
  const booking = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/booking/addBook",
        {
          doctorId: id,
          date: selectedDate,
          startTime: selectedTime,
          userId,
        }
      );
      toast.success("Booking Successful");
    } catch (error) {
      console.error(error);
      toast.error("Booking Failed");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="doctor-page">
        {/* Doctor Information Section */}
        <div className="doctor-info-section">
          <div className="doctor-image">
            <img src={doctorInfo?.doctorImage} alt={doctorInfo?.doctorName} />
          </div>
          <div className="doctor-details">
            <h1>{doctorInfo?.doctorName}</h1>
            <p className="specialty">{doctorInfo?.speciality}</p>

            <p className="experience">
              Experience:{doctorInfo?.experience} years
            </p>
            {/*  */}
          </div>
        </div>

        {/* Booking Section */}
        <div className="booking-section">
          <h2>Available Slots</h2>
          <div className="date-selector">
            {doctorInfo?.availableDays?.map((day, index) => (
              // <div
              //   key={index}
              //   className={`date-card ${
              //     selectedDate === date ? "selected" : ""
              //   }`}
              //   onClick={() => setSelectedDate(date)}
              // >
              //   <div className="day">
              //     {date.toLocaleDateString("en-US", { weekday: "short" })}
              //   </div>
              //   <div className="date">{date.getDate()}</div>
              // </div>
              <div
                className={`date-card ${
                  selectedDate === day ? "selected" : ""
                }`}
                onClick={() => setSelectedDate(day)}
              >
                {day}
              </div>
            ))}
          </div>

          {selectedDate && (
            <div className="time-slots">
              <h3>Available Times for {selectedDate}</h3>
              <div className="time-grid">
                {formattedTimes.map((time, index) => (
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
