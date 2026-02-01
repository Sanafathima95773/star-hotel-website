const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  roomName: String,
  price: Number,
  guests: String,
  checkIn: String,
  checkOut: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Booking", BookingSchema);
