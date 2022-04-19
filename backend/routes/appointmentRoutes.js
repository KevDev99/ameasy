const express = require("express");
const router = express.Router();
const { createAppointment, getAppointmentsPerUser } = require("../controllers/appointmentController");

const { protect } = require('../middleware/authMiddleware');

router.post("/", protect, createAppointment);
router.get('/', protect, getAppointmentsPerUser)

module.exports = router;