const express = require("express");
const router = express.Router();

const adminController = require("../controller/adminController");

router.post("/adminLogin", adminController.loginAdmin);
router.post("/adminRegister", adminController.registerAdmin);

module.exports = router;
