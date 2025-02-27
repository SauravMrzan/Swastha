const Doctor = require("../model/Doctor");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerDoctor = async (req, res) => {
  const {
    doctorName,
    medicalID,
    address,
    doctorEmail,
    password,
    speciality,
    dob,
    type,
  } = req.body;
  if (
    !doctorName ||
    !medicalID ||
    !speciality ||
    !address ||
    !doctorEmail ||
    !password ||
    !dob
  ) {
    return res.status(400).json({
      error: "Fill the form properly!",
    });
  }
  try {
    const checkingDoctor = await Doctor.findOne({ where: { doctorEmail } });
    if (checkingDoctor) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const saltRound = 10;
    const hashpassword = await bcrypt.hash(password, saltRound);
    const newDoctor = await Doctor.create({
      doctorName,
      medicalID,
      speciality,
      address,
      doctorEmail,
      dob,
      password: hashpassword,
      type,
    });
    res.status(200).json({ message: "Doctor Successfully Created" });
    console.log(newDoctor);
  } catch (error) {
    res.status(400).json({ error: "Something Went Wrong" });
    console.log(error);
  }
};
const loginDoctor = async (req, res) => {
  const { email, password } = req.body;
  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }
  try {
    const checkingDoctor = await Doctor.findOne({
      where: { doctorEmail: email },
    });
    if (!checkingDoctor) {
      return res.status(400).json({ error: "Email does not exists" });
    }
    // Verify the password
    const isMatch = await bcrypt.compare(password, checkingDoctor.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: checkingDoctor.id, username: checkingDoctor.doctorName },
      process.env.JWT_SECRET || "HJVVVJHAVJFUIGIJKABKFKBAF34984787831",
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      Doctor: {
        id: checkingDoctor.id,
        username: checkingDoctor.doctorName,
        type: checkingDoctor.type,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login user" });
  }
};

// Create a new doctor
const createDoctor = async (req, res) => {
  try {
    const {
      doctorName,
      speciality,
      doctorEmail,
      password,
      phone,
      address,
      experience,
      medicalID,
      availableDays,
      availableTime,
      dob,
      type,
    } = req.body;
    const doctorImage = req.file ? req.file.filename : null;

    const doctor = await Doctor.create({
      doctorName,
      speciality,
      doctorEmail,
      password,
      phone,
      address,
      medicalID,
      doctorImage,
      dob,
      experience,
      availableDays,
      availableTime,
      type,
    });

    res.status(201).json(doctor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Get all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByPk(id);

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a doctor
const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      doctorName,
      doctorEmail,
      phone,
      speciality,
      medicalID,
      experience,

      availableDays,
      availableTime,
    } = req.body;
    const doctor = await Doctor.findByPk(id);

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Handle the new image file if uploaded
    const doctorImage = req.file ? req.file.filename : doctor.doctorImage;

    // Delete old image if a new one is uploaded
    if (req.file && doctor.doctorImage) {
      const oldImagePath = path.join(
        __dirname,
        "../uploads/",
        doctor.doctorImage
      );
      fs.unlinkSync(oldImagePath);
    }

    await doctor.update({
      doctorName,
      doctorEmail,
      speciality,
      phone,
      medicalID,
      doctorImage,
      experience,
      availableDays,
      availableTime,
    });

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a doctor
const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByPk(id);

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Delete the image file
    if (doctor.doctorImage) {
      const imagePath = path.join(__dirname, "../uploads/", doctor.doctorImage);
      fs.unlinkSync(imagePath);
    }

    await doctor.destroy();
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerDoctor,
  loginDoctor,
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
