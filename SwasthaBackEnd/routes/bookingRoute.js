const express = require("express");
const router = express.Router();

const bookingController = require("../controller/bookingController");

router.post("/addBook", bookingController.createBook);
router.get("/viewBook", bookingController.getAllBook);
router.put("/updateBook/:id", bookingController.updateBook);
router.delete("/deleteBook/:id", bookingController.deleteBook);
router.get("viewBook/:id", bookingController.getAllBook);
router.get("/viewBookDoc/:id", bookingController.getBookingsByDoctor);

module.exports = router;
