const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getAppointmentsPerUser,
  updateAppointment,
} = require("../controllers/appointmentController");

const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .post(protect, createAppointment)
  .get(protect, getAppointmentsPerUser);

router.route("/:id").put(protect, updateAppointment);

module.exports = router;
