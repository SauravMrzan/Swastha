const Admin = require("../model/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerAdmin = async (req, res) => {
  const {
    adminName,
    adminEmail,
    password,
    contact,
    type,
  } = req.body;
  if (
    !adminName ||
    !adminEmail ||
    !contact ||
    !password 
  ) {
    return res.status(400).json({
      error: "Fill the form properly!",
    });
  }
  try {
    const checkingAdmin = await Admin.findOne({ where: { adminEmail } });
    if (checkingAdmin) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const saltRound = 10;
    const hashpassword = await bcrypt.hash(password, saltRound);
    const newAdmin = await Admin.create({
      adminEmail,
      adminName,
      contact,
      password: hashpassword,
      type,
    });
    res.status(200).json({ message: "Admin Successfully Created" });
    console.log(newAdmin);
  } catch (error) {
    res.status(400).json({ error: "Something Went Wrong" });
    console.log(error);
  }
};
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }
  try {
    const checkingAdmin = await Admin.findOne({ where: { email } });
    if (!checkingAdmin) {
      return res.status(400).json({ error: "Email does not exists" });
    }
    // Verify the password
    const isMatch = await bcrypt.compare(password, checkingAdmin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: checkingAdmin.id, username: checkingAdmin.name },
      process.env.JWT_SECRET || "HJVVVJHAVJFUIGIJKABKFKBAF34984787831",
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      Clinic: { id: user.id, username: Admin.name },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login user" });
  }
};
module.exports = { loginAdmin, registerAdmin };
