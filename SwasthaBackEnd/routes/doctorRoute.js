const express = require('express');
const router = express.Router();

const doctorController = require('../controller/doctorController');

router.post("/addDoctor",doctorController.createDoctor);
router.get("/viewDoctors", doctorController.getAllDoctors);
router.put("/updateDoctor/:id",doctorController.updateDoctor);
router.delete("/deleteDoctor/:id",doctorController.deleteDoctor);
router.get("viewDoctor/:id",doctorController.getDoctorById);

module.exports = router;