const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sequelize, testConnection } = require("./database/db");
const userRoute = require("./routes/userRoute");
const doctorRoute = require("./routes/doctorRoute"); // Corrected the route path
const adminRoute = require("./routes/adminRoute");
const User = require("./model/User"); // Import the User model
const Doctor = require("./model/Doctor");
const Admin = require("./model/Admin");
const Booking = require("./model/Booking");
// const { authenticateToken } = require("./middleware/token-middleware");
const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.log("Initializing Server.................................");
// app.use(authenticateToken);
app.use("/users", userRoute);
app.use("/doctor", doctorRoute); // Corrected the route path
app.use("/admin", adminRoute);

async function startServer() {
  try {
    await testConnection(); // Ensure the database connection is successful
    await sequelize.sync(); // Synchronize the model with the database
    console.log("User  table created successfully or already exists.");

    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}...........................`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
}

startServer();
