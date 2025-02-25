//importing the necessary libraries and path

const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { username, email, phone, address, password,type } = req.body;
  if (!username || !email || !phone || !address || !password) {
    return res.status(400).json({
      error: "Fill the form properly!",
    });
  }
  try {
    const checkingUser = await User.findOne({ where: { email } });
    if (checkingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const saltRound = 10;
    const hashpassword = await bcrypt.hash(password, saltRound);
    const newUser = await User.create({
      username,
      email,
      phone,
      address,
      password: hashpassword,
      type,
    });
    newUser.save();
    res.status(200).json({ message: "User Successfully Created" });
    // console.log(newUser);
    
    console.log("User Created Successfully");
  } catch (error) {
    res.status(400).json({ error: "Something Went Wrong" });
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }
  try {
    const checkingUser = await User.findOne({ where: { email } });
    if (!checkingUser) {
      return res.status(400).json({ error: "Email does not exists" });
    }
    // Verify the password
    const isMatch = await bcrypt.compare(password, checkingUser.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: checkingUser.id, username: checkingUser.username },
      process.env.JWT_SECRET || "HJVVVJHAVJFUIGIJKABKFKBAF34984787831",
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: checkingUser.id, username: checkingUser.username, type: checkingUser.type },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login user" });
  }
};
const getAll = async (req, res) => {
  try {
    //fetching all the data from users table
    const users = await User.findAll();
    res.status(200).send({ data: users, message: "successfully fetched data" });
  } catch (e) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Add these functions to your existing controller

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete the user
    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, phone, address, password } = req.body;

    // Find the user
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check for duplicate email if email is being updated
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }
    }

    // Update fields
    if (username) user.username = username;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    // Handle password update with hashing
    if (password) {
      const saltRounds = 10;
      user.password = await bcrypt.hash(password, saltRounds);
    }

    // Save changes
    await user.save();

    // Return updated user data without password
    const userData = user.get({ plain: true });
    delete userData.password;

    res.status(200).json({
      data: userData,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] }, // Exclude sensitive data
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      data: user,
      message: "User fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// Update your exports
module.exports = {
  loginUser,
  registerUser,
  getAll,
  deleteUserById,
  updateUserById,
  getUserById,
};
