const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

/* BOOK */
router.post("/book", async (req, res) => {
  const data = await Appointment.create(req.body);
  res.json(data);
});

/* PATIENT */
router.get("/patient/:id", async (req, res) => {
  const data = await Appointment.find({ patientId: req.params.id })
    .populate("doctorId", "name");
  res.json(data);
});

/* DOCTOR */
router.get("/doctor/:id", async (req, res) => {
  const data = await Appointment.find({ doctorId: req.params.id })
    .populate("patientId", "name");
  res.json(data);
});

/* ALL (ADMIN) */
router.get("/all", async (req, res) => {
  const data = await Appointment.find()
    .populate("doctorId", "name")
    .populate("patientId", "name");
  res.json(data);
});

/* STATUS UPDATE */
router.put("/status/:id", async (req, res) => {
  const data = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(data);
});

/* NOTE FIX (DOCTOR) */
router.put("/note/:id", async (req, res) => {
  const data = await Appointment.findByIdAndUpdate(
    req.params.id,
    { note: req.body.note },
    { new: true }
  );
  res.json(data);
});

/* DELETE (PATIENT + ADMIN CANCEL FIX) */
router.delete("/:id", async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

module.exports = router;