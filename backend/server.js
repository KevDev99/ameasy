const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");
const cron = require("node-cron");

const connectDB = require("./config/db");
const { sendEmail } = require("./email");
const { getReminders } = require("./controllers/appointmentController");

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Connect to database
connectDB();

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("AM Easy Backend");
});

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));

// error handler middleware
app.use(errorHandler);

// cron job which sends email reminders every REMINDER_SCHEDULE_MIN minutes
cron.schedule(
  `* ${process.env.REMINDER_SCHEDULE_MIN} * * *`,
  async function () {
    const reminderList = await getReminders();
    reminderList.map((reminder) => sendEmail(reminder));
  }
);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
