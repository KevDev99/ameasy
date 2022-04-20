const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Appointment = require("../models/appointmentModel");

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

  const appointments = await Appointment.find({ user: req.user.id });

  res.status(200).json(appointments);
});

// @desc  update ticket
// @route UPDATE /api/appointment/:id
// @access Private
const updateAppointment = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    res.status(404);
    throw new Error("Appointment not found");
  }

  if (appointment.user.toString() !== req.user.id && !user.isAdmin) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const updatedAppointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    req.body
  );

  res.status(200).json(updatedAppointment);
});

const getReminders = asyncHandler(async () => {
  const appointments = await Appointment.find({ status: "open" });

  const reminderDate = new Date();
  reminderDate.setMinutes(reminderDate.getMinutes() + 15);

  const filteredAppointments = appointments.filter(
    (a) => new Date(a.start) > new Date() && reminderDate >= new Date(a.start)
  );


  const reminderList = filteredAppointments.map(async (fa) => {
    const user = await User.findOne(fa.user);
    const email = user.email;

    const reminder = {
      from: process.env.EMAIL_SERVICE_USER,
      to: email,
      subject: fa.title,
      text: `Start: ${fa.start} End: ${fa.end}`,
    };

    return reminder;
  });

  return await Promise.all(reminderList);
});

module.exports = {
  createAppointment,
  getAppointmentsPerUser,
  updateAppointment,
  getReminders,
};
