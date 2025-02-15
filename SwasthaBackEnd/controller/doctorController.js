const Doctor = require('../model/Doctor');
const fs = require('fs');
const path = require('path');

// Create a new doctor
const createDoctor = async (req, res) => {
  try {
    const { name, speciality, medicalID } = req.body;
    const doctorImage = req.file ? req.file.filename : null;

    const doctor = await Doctor.create({
      name,
      speciality,
      medicalID,
      doctorImage,
    });

    res.status(201).json(doctor);
  } catch (error) {
    console.log(error)
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
      return res.status(404).json({ error: 'Doctor not found' });
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
    const { name, speciality, medicalID } = req.body;
    const doctor = await Doctor.findByPk(id);

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Handle the new image file if uploaded
    const doctorImage = req.file ? req.file.filename : doctor.doctorImage;

    // Delete old image if a new one is uploaded
    if (req.file && doctor.doctorImage) {
      const oldImagePath = path.join(__dirname, '../uploads/', doctor.doctorImage);
      fs.unlinkSync(oldImagePath);
    }

    await doctor.update({
      name,
      speciality,
      medicalID,
      doctorImage,
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
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Delete the image file
    if (doctor.doctorImage) {
      const imagePath = path.join(__dirname, '../uploads/', doctor.doctorImage);
      fs.unlinkSync(imagePath);
    }

    await doctor.destroy();
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports ={createDoctor, getAllDoctors, getDoctorById,updateDoctor, deleteDoctor}