const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    car: { type: mongoose.Schema.Types.ObjectID, ref: "Car" },
    user: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalDays: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    isPayNow: { type: Boolean, default: false },
    cancelled: { type: Boolean, default: false },
    isBooked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("bookings", bookingSchema);

module.exports = bookingModel;
