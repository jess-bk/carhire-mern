const Car = require("../model/CarHire");
const moment = require("moment");

const carsAPI = async (req, res) => {
  try {
    const cars = await Car.find({});
    res.send(cars);
  } catch (err) {
    res.status(500).send({ message: "Error fetching cars" });
  }
};

const carAPI = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);
    res.send(car);
  } catch (err) {
    res.status(500).send({ message: "Error fetching car" });
  }
};

const getBookingsAPI = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookings = await CarHire.find({ userId });
    res.send(bookings);
  } catch (err) {
    res.status(500).send({ message: "Error fetching bookings" });
  }
};

const bookCarAPI = async (req, res) => {
  try {
    const { carId, startDate, endDate } = req.body;
    const userId = req.user._id;
    if (!carId || !startDate || !endDate) {
      throw new Error("Please enter a valid car, start date, and end date");
    }
    const start = moment(startDate);
    const end = moment(endDate);
    if (!start.isValid() || !end.isValid()) {
      throw new Error("Invalid start or end date");
    }
    if (start.isAfter(end)) {
      throw new Error("Start date must be before end date");
    }
    const totalDays = end.diff(start, "days") + 1;
    const car = await Car.findById(carId);
    if (!car) {
      throw new Error("Invalid car");
    }
    const price = totalDays * car.pricePerDay;
    const carHire = new CarHire({
      userId,
      carId,
      startDate,
      endDate,
      totalDays,
      price,
    });
    await carHire.save();
    res.send({ message: "Car booked successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const cancelBookingAPI = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const carHire = await Car.findOne({ _id: id, userId });
    if (!carHire) {
      throw new Error("Invalid booking");
    }
    await carHire.remove();
    res.send({ message: "Booking cancelled successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const bookingsAPI = async (req, res) => {
  try {
    // Get the authenticated user's ID and the car ID
    const userId = req.user._id;
    const { id: carId } = req.params;

    // Find all bookings made by the authenticated user for the specified car
    const bookings = await CarHire.find({ userId, carId });

    // Send the bookings back to the client
    res.send(bookings);
  } catch (err) {
    res.status(500).send({ message: "Error fetching bookings" });
  }
};

const addCarAPI = async (req, res) => {
  try {
    // Validate the request body and extract the car data
    const { name, pricePerDay, imageUrls, model, year } = req.body;
    if (!name || !pricePerDay || !imageUrls || !Array.isArray(imageUrls)) {
      throw new Error("Invalid request");
    }

    // Create a new car object with the received data
    const car = new Car({ name, pricePerDay, imageUrls, model, year });

    // Save the car to the database
    await car.save();

    // Send the response
    res.send({ message: "Car added successfully" });
  } catch (err) {
    res.status(500).send({ message: "Error adding car" });
  }
};

const deleteCarAPI = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);
    if (!car) {
      throw new Error("Invalid car");
    }
    await car.deleteOne();
    res.send({ message: "Car deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateCarAPI = async (req, res) => {
  try {
    // Validate the request body and extract the updated car data
    const { name, pricePerDay, imageUrls, model, year } = req.body;
    if (!name || !pricePerDay || !imageUrls || !Array.isArray(imageUrls)) {
      throw new Error("Invalid request");
    }

    // Get the ID of the car to update
    const { id } = req.params;

    // Find the car and update it with the new data
    const car = await Car.findByIdAndUpdate(
      id,
      { name, pricePerDay, imageUrls, model, year },
      { new: true }
    );
    if (!car) {
      throw new Error("Car not found");
    }

    // Send the updated car back to the client
    res.send(car);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// const updateCarAPI = async (req, res) => {
//   try {
//     // Find the car by ID
//     const car = await Car.findById(req.params.id);
//     if (!car) {
//       throw new Error("Car not found");
//     }

//     // Only allow admin users to update the car
//     if (!req.user.isAdmin) {
//       throw new Error("You are not authorized to update this car");
//     }

//     // Update the car with the new data from the request body
//     car.name = req.body.name;
//     car.model = req.body.model;
//     car.year = req.body.year;
//     car.pricePerDay = req.body.pricePerDay;
//     car.imageUrls = req.body.imageUrls;

//     // Save the updated car to the database
//     await car.save();

//     res.status(200).json({ message: "Car updated successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

module.exports = {
  carsAPI,
  carAPI,
  bookCarAPI,
  cancelBookingAPI,
  bookingsAPI,
  addCarAPI,
  deleteCarAPI,
  getBookingsAPI,
  updateCarAPI,
};
