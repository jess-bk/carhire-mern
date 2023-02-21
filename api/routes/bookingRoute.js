const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { verifyAdmin, verifyToken } = require("../middleware/authMiddleware");

// POST a booking car
router.route("/add-booking").post(verifyToken, bookingController.bookCarAPI);

// GET all bookings in data base
router.route("/all-bookings").get(bookingController.getAllBookingsAPI);

// PUT a car by ID (only for admins)
router
  .route("/cancel-booking/:id")
  .delete(verifyAdmin, bookingController.cancelBookingAPI);

// GET a car booking details
router
  .route("/booking-details/:id")
  .get(verifyAdmin, verifyToken, bookingController.getBookingDetailsAPI);

module.exports = router;
