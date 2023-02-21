const Car = require("../model/carHireModel");
const mongoose = require("mongoose");
const validateCarInput = require("../carValidation/validateCarInput");

const getAllcarsAPI = async (req, res) => {
  try {
    const cars = await Car.find({});
    res.status(200).json({ cars, message: "all cars" });
    console.log(cars);
  } catch (err) {
    res.status(500).send({ message: "Error fetching cars" });
  }
};

const addCarAPI = async (req, res) => {
  try {
    const newcar = new Car({
      name: req.body.name,
      model: req.body.model,
      year: req.body.year,
      pricePerDay: req.body.pricePerDay,
      imageUrls: req.body.imageUrls,
    });
    await newcar.save();
    res.status(200).json({ newcar, message: "Car added successfully" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const getCarByIdAPI = async (req, res) => {
  try {
    // Get the car _id from the request parameters
    const id = req.params.id;
    console.log("id", id);

    // Make sure the _id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid car _id" });
    }

    // Find the car document by its _id
    const car = await Car.findById(id);
    // console.log("car fibdByiD", car);

    // If the car document was not found, return a 404 response
    if (!car) {
      return res.status(404).send({ message: "Car not found" });
    }

    // If the car document was found, return it in the response
    res.status(200).json(car);
    console.log(car);
  } catch (err) {
    // console.log(err);
    res.status(500).json({ err, message: "Error fetching car" });
  }
};

const updateCarAPI = async (req, res) => {
  try {
    // validate input
    const { error } = validateCarInput(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }
    // create an update object with only the allowed fields
    const update = {
      name: req.body.name,
      model: req.body.model,
      year: req.body.year,
      pricePerDay: req.body.pricePerDay,
      imageUrls: req.body.imageUrls,
    };

    // update the car
    const car = await Car.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({ update, message: "Car updated successfully" });
  } catch (error) {
    res.status(500).json({ error, message: "Error updating car" });
    console.log(error);
  }
};

const deleteCarAPI = async (req, res) => {
  try {
    const { error } = validateCarInput(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json({ car, message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllcarsAPI,
  addCarAPI,
  getCarByIdAPI,
  updateCarAPI,
  deleteCarAPI,
};
