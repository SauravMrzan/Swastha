const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize, testConnection } = require('./database/db');
const userRoute = require('./routes/userRoute');
const clinicRoute = require('./routes/clinicRoute');
const User = require('./model/User'); // Import the User model
const Doctor = require('./model/Doctor');
const Clinics= require('./model/Clinic');
const { authenticateToken } = require('./middleware/token-middleware');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.log('Initializing Server.................................');
app.use(authenticateToken)
app.use('/users', userRoute);
app.use('/clinic', clinicRoute); // Corrected the route path

async function startServer() {
    try {
        await testConnection(); // Ensure the database connection is successful
        await sequelize.sync(); // Synchronize the model with the database
        console.log('User  table created successfully or already exists.');
        
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}...........................`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
}

startServer();