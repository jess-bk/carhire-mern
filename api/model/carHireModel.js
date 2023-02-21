const mongoose = require("mongoose");

const carHireSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
    imageUrls: { type: [String], required: true, default: [] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Car", carHireSchema);
