const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// LOGS
app.use((req, res, next) => {
  console.log("👉", req.method, req.url);
  next();
});

// ROUTES
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);

// HOME
app.get("/", (req, res) => {
  res.send("Hospital Management Backend Running");
});

// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});