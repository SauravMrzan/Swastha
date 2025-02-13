const express = require('express');
const router = express.Router();

const clinicController = require('../controller/clinicController');

router.post("/login", clinicController.loginClinic);
router.post("/register",clinicController.registerClinic);

module.exports = router;
