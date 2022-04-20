const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();

const { errorHandler } = require("./middleware/errorMiddleware");
const cron = require("node-cron");

const connectDB = require("./config/db");
const { sendEmail } = require("./email");
const { getReminders } = require("./controllers/appointmentController");

const PORT = process.env.PORT || 5000;


// Connect to database
connectDB();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

if (process.env.NODE_ENV === "production") {
  // set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(__dirname, "../", "frontend", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.status(200).json({message: "AM Easy Backend API"});
  });
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
