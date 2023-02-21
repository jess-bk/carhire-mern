const express = require("express");
const router = express.Router();
const carsController = require("../controllers/carsController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// GET all cars
router.route("/all-cars").get(carsController.getAllcarsAPI);

// POST a new car (only for admins)
router.route("/add-car").post(verifyAdmin, carsController.addCarAPI);

// GET a single car by ID
router.route("/get-car/:id").get(carsController.getCarByIdAPI);

// PATCH update a single car
router
  .route("/:id")
  .patch(verifyToken, verifyAdmin, carsController.updateCarAPI);

// DELETE a car booking by ID
router
  .route("/:id")
  .delete(verifyToken, verifyAdmin, carsController.deleteCarAPI);

// // POST a new car booking
// router.route("/").post(verifyUser, carsController.bookCarAPI);

// // GET all bookings for a specific car
// router.route("/:id").get(verifyUser, carsController.bookingsAPI);

// // GET users bookings
// router.route("/").get(verifyUser, carsController.getBookingsAPI);

module.exports = router;
