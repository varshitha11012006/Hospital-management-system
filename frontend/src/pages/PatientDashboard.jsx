import React, { useEffect, useState } from "react";
import axios from "axios";

function PatientDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const loadAppointments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/appointments/patient/${user._id}`
      );

      setAppointments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadDoctors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/auth/doctors"
      );

      setDoctors(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadAppointments();
    loadDoctors();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const bookAppointment = async (e) => {
    e.preventDefault();

    if (!doctorId || !date || !reason) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/appointments/book",
        {
          patientId: user._id,
          doctorId,
          date,
          reason,
        }
      );

      alert("Appointment Booked Successfully");

      setDoctorId("");
      setDate("");
      setReason("");

      loadAppointments();
    } catch (error) {
      console.log(error);
      alert("Booking Failed");
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id) => {
    const ok = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!ok) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/appointments/${id}`
      );

      loadAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredAppointments = appointments.filter((a) =>
    statusFilter === "all"
      ? true
      : a.status === statusFilter
  );

  const total = appointments.length;

  const pending = appointments.filter(
    (a) => a.status === "pending"
  ).length;

  const approved = appointments.filter(
    (a) => a.status === "approved"
  ).length;

  const rejected = appointments.filter(
    (a) => a.status === "rejected"
  ).length;

  return (
    <div className="bg-light min-vh-100">

      {/* HEADER */}
      <div className="bg-success text-white shadow-sm">
        <div className="container py-3 d-flex justify-content-between align-items-center">
          <div>
            <h3 className="mb-0">Patient Dashboard</h3>
            <small>Welcome, {user?.name}</small>
          </div>

          <button
            className="btn btn-light"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="container py-4">

        {/* ANALYTICS */}
        <div className="row g-3 mb-4">

          <div className="col-md-3">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h6>Total</h6>
                <h3>{total}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h6>Pending</h6>
                <h3 className="text-warning">
                  {pending}
                </h3>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h6>Approved</h6>
                <h3 className="text-success">
                  {approved}
                </h3>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h6>Rejected</h6>
                <h3 className="text-danger">
                  {rejected}
                </h3>
              </div>
            </div>
          </div>

        </div>

        {/* BOOK APPOINTMENT */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-header bg-white">
            <h5 className="mb-0">
              Book Appointment
            </h5>
          </div>

          <div className="card-body">

            <form onSubmit={bookAppointment}>
              <div className="row g-3">

                <div className="col-md-4">
                  <label className="form-label">
                    Select Doctor
                  </label>

                  <select
                    className="form-select"
                    value={doctorId}
                    onChange={(e) =>
                      setDoctorId(e.target.value)
                    }
                  >
                    <option value="">
                      Choose Doctor
                    </option>

                    {doctors.map((doctor) => (
                      <option
                        key={doctor._id}
                        value={doctor._id}
                      >
                        {doctor.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label">
                    Appointment Date
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={(e) =>
                      setDate(e.target.value)
                    }
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">
                    Reason
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Reason"
                    value={reason}
                    onChange={(e) =>
                      setReason(e.target.value)
                    }
                  />
                </div>

              </div>

              <button
                className="btn btn-success mt-3"
                disabled={loading}
              >
                {loading
                  ? "Booking..."
                  : "Book Appointment"}
              </button>
            </form>

          </div>
        </div>

        {/* FILTER */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body">

            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="all">All</option>
              <option value="pending">
                Pending
              </option>
              <option value="approved">
                Approved
              </option>
              <option value="rejected">
                Rejected
              </option>
            </select>

          </div>
        </div>

        {/* HISTORY */}
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white">
            <h5 className="mb-0">
              Appointment History
            </h5>
          </div>

          <div className="card-body">

            {filteredAppointments.length === 0 ? (
              <div className="alert alert-info">
                No Appointments Found
              </div>
            ) : (
              filteredAppointments.map((a) => (
                <div
                  key={a._id}
                  className="card mb-3 border"
                >
                  <div className="card-body">

                    <div className="row">

                      <div className="col-md-3">
                        <strong>Doctor</strong>
                        <p className="mb-0">
                          {a.doctorId?.name}
                        </p>
                      </div>

                      <div className="col-md-3">
                        <strong>Date</strong>
                        <p className="mb-0">
                          {a.date}
                        </p>
                      </div>

                      <div className="col-md-3">
                        <strong>Status</strong>
                        <p className="mb-0">

                          {a.status === "pending" && (
                            <span className="badge bg-warning text-dark">
                              Pending
                            </span>
                          )}

                          {a.status === "approved" && (
                            <span className="badge bg-success">
                              Approved
                            </span>
                          )}

                          {a.status === "rejected" && (
                            <span className="badge bg-danger">
                              Rejected
                            </span>
                          )}

                        </p>
                      </div>

                      <div className="col-md-3">
                        <strong>Reason</strong>
                        <p className="mb-0">
                          {a.reason}
                        </p>
                      </div>

                    </div>

                    {a.note && (
                      <div className="alert alert-secondary mt-3 mb-0">
                        <strong>
                          Doctor Note:
                        </strong>{" "}
                        {a.note}
                      </div>
                    )}

                    {a.status === "pending" && (
                      <button
                        className="btn btn-danger btn-sm mt-3"
                        onClick={() =>
                          cancelAppointment(a._id)
                        }
                      >
                        Cancel Appointment
                      </button>
                    )}

                  </div>
                </div>
              ))
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default PatientDashboard;