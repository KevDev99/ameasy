const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Appointment = require('../models/appointmentModel');

// @desc Create new appointment
// @route POST /api/appointments
// @access Private
const createAppointment = asyncHandler(async (req, res) => {
  const { title, start, end } = req.body;

  if (!title || !start || !end) {
    res.status(400);
    throw new Error("Please make sure you added a valid date and description");
  }

  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  const appointment = await Appointment.create({
    title,
    start,
    end,
    user: req.user.id,
    status: "open",
  });

  res.status(201).json(appointment);
});

// @desc get all appointments for a user
// @route GET /api/appointments
// @access Private
const getAppointmentsPerUser = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  const appointments = await Appointment.find({ user: req.user.id })

  res.status(200).json(appointments);
});



module.exports = {
  createAppointment,
  getAppointmentsPerUser
};