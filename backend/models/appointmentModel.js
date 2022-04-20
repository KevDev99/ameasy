const mongoose = require("mongoose");
const appointmentSchema = mongoose.Schema(
  {
    start: {
      type: String,
      required: [true, "Please select a valid startdate"],
    },
    end: {
      type: String,
      required: [true, "Please select a valid enddate"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a valid title"],
    },
    status: {
      type: String,
      required: false,
      enum: ["open", "closed"],
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
