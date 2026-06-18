import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const loadAppointments = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/appointments/all"
      );

      setAppointments(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const deleteAppointment = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/appointments/${id}`
      );

      loadAppointments();
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  const filteredAppointments = appointments.filter((a) => {
    const patient =
      a.patientId?.name?.toLowerCase() || "";

    const doctor =
      a.doctorId?.name?.toLowerCase() || "";

    const matchSearch =
      patient.includes(search.toLowerCase()) ||
      doctor.includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "all" ||
      a.status === statusFilter;

    return matchSearch && matchStatus;
  });

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
      <div className="bg-dark text-white shadow-sm">
        <div className="container py-3 d-flex justify-content-between align-items-center">
          <div>
            <h3 className="mb-0">Admin Dashboard</h3>
            <small>Hospital Management System</small>
          </div>

          <button
            className="btn btn-danger"
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
                <h6>Total Appointments</h6>
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

        {/* SEARCH + FILTER */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Patient or Doctor..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />
              </div>

              <div className="col-md-4">
                <select
                  className="form-select"
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value)
                  }
                >
                  <option value="all">All Status</option>
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
          </div>
        </div>

        {/* APPOINTMENTS */}
        {loading ? (
          <div className="alert alert-info">
            Loading appointments...
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="alert alert-warning">
            No appointments found.
          </div>
        ) : (
          filteredAppointments.map((a) => (
            <div
              key={a._id}
              className="card shadow-sm border-0 mb-3"
            >
              <div className="card-body">
                <div className="row">

                  <div className="col-md-3">
                    <strong>Patient</strong>
                    <p className="mb-0">
                      {a.patientId?.name || "N/A"}
                    </p>
                  </div>

                  <div className="col-md-3">
                    <strong>Doctor</strong>
                    <p className="mb-0">
                      {a.doctorId?.name || "N/A"}
                    </p>
                  </div>

                  <div className="col-md-2">
                    <strong>Date</strong>
                    <p className="mb-0">
                      {a.date}
                    </p>
                  </div>

                  <div className="col-md-2">
                    <strong>Status</strong>

                    <div>
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
                    </div>
                  </div>

                  <div className="col-md-2">
                    <button
                      className="btn btn-danger w-100"
                      onClick={() =>
                        deleteAppointment(a._id)
                      }
                    >
                      Delete
                    </button>
                  </div>

                </div>

                <hr />

                <div className="row">
                  <div className="col-md-6">
                    <strong>Reason</strong>
                    <p className="mb-0">
                      {a.reason || "No Reason"}
                    </p>
                  </div>

                  <div className="col-md-6">
                    <strong>Doctor Note</strong>
                    <p className="mb-0">
                      {a.note || "No Note"}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;