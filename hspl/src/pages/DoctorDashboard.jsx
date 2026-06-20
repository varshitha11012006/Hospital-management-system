import React, { useEffect, useState } from "react";
import axios from "axios";

function DoctorDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [appointments, setAppointments] = useState([]);
  const [notes, setNotes] = useState({});
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const loadAppointments = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `https://hospital-management-mern-q5r4.onrender.com/api/appointments/doctor/${user._id}`
      );

      setAppointments(res.data);

      const noteData = {};

      res.data.forEach((item) => {
        noteData[item._id] = item.note || "";
      });

      setNotes(noteData);
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
    window.location.href = "/";
  };

  const saveNote = async (id) => {
    try {
      await axios.put(
        `https://hospital-management-mern-q5r4.onrender.com/api/appointments/note/${id}`,
        {
          note: notes[id] || "",
        }
      );

      alert("Note saved successfully");
      loadAppointments();
    } catch (error) {
      console.log(error);
      alert("Failed to save note");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `https://hospital-management-mern-q5r4.onrender.com/api/appointments/status/${id}`,
        {
          status,
        }
      );

      loadAppointments();
    } catch (error) {
      console.log(error);
      alert("Failed to update status");
    }
  };

  const filteredAppointments = appointments.filter((a) => {
    const patientName =
      a.patientId?.name?.toLowerCase() || "";

    const matchSearch = patientName.includes(
      search.toLowerCase()
    );

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
      <div className="bg-primary text-white shadow-sm">
        <div className="container py-3 d-flex justify-content-between align-items-center">
          <div>
            <h3 className="mb-0">Doctor Dashboard</h3>
            <small>Welcome, Dr. {user?.name}</small>
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

        {/* FILTERS */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Patient Name..."
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
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
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
                    <strong>Date</strong>
                    <p className="mb-0">{a.date}</p>
                  </div>

                  <div className="col-md-3">
                    <strong>Reason</strong>
                    <p className="mb-0">
                      {a.reason}
                    </p>
                  </div>

                  <div className="col-md-3">
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
                </div>

                <hr />

                <label className="form-label fw-bold">
                  Doctor Note
                </label>

                <textarea
                  className="form-control mb-3"
                  rows="3"
                  value={notes[a._id] || ""}
                  onChange={(e) =>
                    setNotes({
                      ...notes,
                      [a._id]: e.target.value,
                    })
                  }
                />

                <div className="d-flex flex-wrap gap-2">
                  <button
                    className="btn btn-success"
                    onClick={() => saveNote(a._id)}
                  >
                    Save Note
                  </button>

                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      updateStatus(
                        a._id,
                        "approved"
                      )
                    }
                  >
                    Approve
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      updateStatus(
                        a._id,
                        "rejected"
                      )
                    }
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DoctorDashboard;