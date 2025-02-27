const Booking = require("../model/Booking");
const Doctor = require("../model/Doctor");
const User = require("../model/User");
const { get } = require("../routes/bookingRoute");

const createBook = async (req, res) => {
  try {
    const { userId, doctorId, date, startTime } = req.body;

    const book = await Booking.create({
      userId,
      doctorId,
      startTime,
      date,
    });

    res.status(201).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Get all booking
const getAllBook = async (req, res) => {
  try {
    const book = await Booking.findAll({
      include: [
        {
          model: User, // Join with User table
          attributes: ["id", "username", "email", "phone"], // Select specific fields
        },
        {
          model: Doctor, // Join with Doctor table
          attributes: ["id", "doctorName", "speciality", "experience"], // Select specific fields
        },
      ],
    });

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookingsByDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const bookings = await Booking.findAll({
      where: { doctorId: id }, // Filter by doctorId
      include: [
        {
          model: User, // Include user details
          attributes: ["id", "username", "email", "phone"],
        },
      ],
    });

    if (!bookings.length) {
      return res
        .status(404)
        .json({ message: "No bookings found for this doctor" });
    }

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single booking by ID
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Booking.findByPk(id);

    if (!book) {
      return res.status(404).json({ error: "Booking table not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a booking table
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, doctorId, startTime, date } = req.body;
    const book = await Booking.findByPk(id);

    if (!book) {
      return res.status(404).json({ error: "Booking Table not found" });
    }

    await book.update({
      userId,
      doctorId,
      startTime,
      date,
    });

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a booking
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Booking.findByPk(id);

    if (!book) {
      return res.status(404).json({ error: "Booking table not found" });
    }

    await book.destroy();
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBook,
  getAllBook,
  getBookById,
  updateBook,
  deleteBook,
  getBookingsByDoctor,
};
