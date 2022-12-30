// const express = require("express");
// const router = express.Router();
// const carsController = require("../controllers/carsController");
// const {
//   verifyToken,
//   verifyAdmin,
//   verifyUser,
// } = require("../middleware/authMiddleware");

// router.route("/").get(carsController.carsAPI);
// router.route("/").get(verifyToken, verifyUser, carsController.carAPI);
// router.route("/").post(verifyToken, verifyUser, carsController.bookCarAPI);
// router
//   .route("/:id")
//   .delete(verifyToken, verifyUser, carsController.cancelBookingAPI);
// router.route("/:id").get(verifyToken, verifyUser, carsController.bookingsAPI);
// router
//   .route("/add-car")
//   .post(verifyToken, verifyUser, verifyAdmin, carsController.addCarAPI);
// router
//   .route("/:id")
//   .delete(verifyToken, verifyAdmin, carsController.deleteCarAPI);

// module.exports = router;

const express = require("express");
const router = express.Router();
const carsController = require("../controllers/carsController");
const {
  verifyToken,
  verifyAdmin,
  verifyUser,
} = require("../middleware/authMiddleware");

// GET all cars
router.route("/").get(carsController.carsAPI);

// GET a single car by ID
router.route("/:id").get(verifyToken, verifyUser, carsController.carAPI);

// POST a new car booking
router.route("/").post(verifyToken, verifyUser, carsController.bookCarAPI);

// DELETE a car booking by ID
router
  .route("/:id")
  .delete(verifyToken, verifyUser, carsController.cancelBookingAPI);

// GET all bookings for a specific car
router.route("/:id").get(verifyToken, verifyUser, carsController.bookingsAPI);

// POST a new car (only for admins)
router
  .route("/add-car")
  .post(verifyToken, verifyUser, verifyAdmin, carsController.addCarAPI);

// DELETE a car by ID (only for admins)
router
  .route("/:id")
  .delete(verifyToken, verifyAdmin, carsController.deleteCarAPI);

// GET users bookings
router.route("/").get(verifyToken, verifyUser, carsController.getBookingsAPI);

// PUT a car by ID (only for admins)
router.route("/:id").put(verifyToken, verifyAdmin, carsController.updateCarAPI);

module.exports = router;
