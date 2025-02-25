const Clinic = require("../model/Clinic");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
    const checkingDoctor = await Clinic.findOne({ where: { doctorEmail } });
    if (checkingDoctor) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const saltRound = 10;
    const hashpassword = await bcrypt.hash(password, saltRound);
    const newDoctor = await Clinic.create({
      doctorName,
      medicalID,
      speciality,
      address,
      doctorEmail,
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
    const checkingDoctor = await Clinic.findOne({ where: { email } });
    if (!checkingDoctor) {
      return res.status(400).json({ error: "Email does not exists" });
    }
    // Verify the password
    const isMatch = await bcrypt.compare(password, checkingClinic.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: checkingDoctor.id, username: checkingDoctor.name },
      process.env.JWT_SECRET || "HJVVVJHAVJFUIGIJKABKFKBAF34984787831",
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      Clinic: { id: user.id, username: Clinic.name },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login user" });
  }
};
module.exports = { loginDoctor, registerDoctor };
