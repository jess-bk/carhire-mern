const Booking = require("../model/bookingModel");
const Car = require("../model/carHireModel");
const User = require("../model/userModel");
const moment = require("moment");

const getAllBookingsAPI = async (req, res) => {
  try {
    // retrieve query parameters
    const { userId, carId, page, limit } = req.query;
    let query = Booking.find();
    // filter by user
    if (userId) {
      query = query.where("user").equals(userId);
    }
    // filter by car
    if (carId) {
      query = query.where("car").equals(carId);
    }
    // pagination
    if (page && limit) {
      query = query.skip((page - 1) * limit).limit(parseInt(limit));
    }
    // sort by createdAt in descending order
    query = query.sort({ createdAt: -1 });
    // retrieve bookings
    const bookings = await query
      .populate("car")
      .populate("user", "username email name")
      .lean();
    res
      .status(200)
      .json({ message: "Bookings retrieved successfully", bookings });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error while retrieving bookings" });
  }
};

const bookCarAPI = async (req, res) => {
  try {
    const { carId, startDate, endDate } = req.body;

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(400).json({ error: "Car not found" });
    }

    const existingBooking = await Booking.findOne({
      car: carId,
      isBooked: true,
      startDate: { $lte: endDate },
      endDate: { $gte: startDate },
    });
    if (existingBooking) {
      return res
        .status(400)
        .json({ error: "Car is already booked", existingBooking });
    }

    const totalDays = moment(endDate).diff(moment(startDate), "days") + 1;
    const totalAmount = totalDays * car.pricePerDay;

    const booking = new Booking({
      car: carId,
      user: req.user._id,
      startDate,
      endDate,
      totalDays,
      totalAmount,
      isBooked: true,
    });

    const newBooking = await booking.save();

    const populatedBooking = await Booking.findById(newBooking._id)
      .populate("user", "username email")
      .exec();

    res.status(201).json({
      message: "Booking created successfully",
      booking: populatedBooking,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const cancelBookingAPI = async (req, res) => {
  try {
    // retrieve the booking
    const booking = await Booking.findById(req.params.id).populate("car");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    // check if the user making the request is the one who made the booking
    // if (req.user.id !== booking.user.toString()) {
    //   return res
    //     .status(401)
    //     .json({ message: "You are not authorized to cancel this booking" });
    // }
    // check if the booking is at least 3 days in the future
    const bookingStart = moment(booking.startDate);
    const daysRemaining = moment().diff(bookingStart, "days");
    if (daysRemaining < 3) {
      return res.status(400).json({
        message:
          "Cancelation must be made at least 3 days prior to the car hire date",
      });
    }
    // cancel the booking
    await booking.remove();
    res
      .status(200)
      .json({ message: "Booking canceled successfully", car: booking.car });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error while canceling booking" });
  }
};

const getBookingDetailsAPI = async (req, res) => {
  try {
    // retrieve the booking
    const booking = await Booking.findById(req.params.id)
      .populate("car")
      .populate("user");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    // check if the user making the request is the one who made the booking
    if (req.user.id !== booking.user.toString()) {
      return res
        .status(401)
        .json({ message: "You are not authorized to access this booking" });
    }
    // return the booking details
    res.status(200).json({ booking });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error while retrieving booking details" });
  }
};

module.exports = {
  getAllBookingsAPI,
  bookCarAPI,
  cancelBookingAPI,
  getBookingDetailsAPI,
};
