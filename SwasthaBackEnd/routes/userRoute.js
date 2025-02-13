const express = require('express');
const router = express.Router();

const userController = require('../controller/userController')

router.get("/getUsers", userController.getAll);
router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);
// router.put("/:id", userController.update);
// router.get("/:id", userController.getById);
// router.delete("/:id", userController.delelteById);

module.exports = router
