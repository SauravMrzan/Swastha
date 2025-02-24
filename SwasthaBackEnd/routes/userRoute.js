const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");

router.get("/getUsers", userController.getAll);
router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);
router.put("/:id", userController.updateUserById);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUserById);

module.exports = router;
