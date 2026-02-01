const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Booking = require("./models/Booking");
const Contact = require("./models/Contact");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.post("/api/book", async (req, res) => {
  const booking = await Booking.create(req.body);
  res.json({ success: true, booking });
});

app.post("/api/contact", async (req, res) => {
  const message = await Contact.create(req.body);
  res.json({ success: true, message });
});

app.get("/", (req, res) => {
  res.send("Star Hotel Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
