import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
          role: role.trim().toLowerCase(),
        }
      );

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      setMessage(error.response?.data?.message || "Register Failed");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        padding: "20px",
      }}
    >
      <div
        className="row shadow-lg"
        style={{
          width: "100%",
          maxWidth: "1000px",
          borderRadius: "18px",
          overflow: "hidden",
          background: "#fff",
        }}
      >

        {/* LEFT IMAGE SIDE */}
        <div className="col-md-6 d-none d-md-block p-0">
          <img
            src="register.jpg"
            alt="register"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.95)",
            }}
          />
        </div>

        {/* RIGHT FORM SIDE */}
        <div className="col-md-6 p-5">

          <h2
            className="text-center fw-bold mb-1"
            style={{
              color: "#0f172a",
              letterSpacing: "0.5px",
            }}
          >
            Create Account
          </h2>

          <p className="text-center text-muted mb-4">
            Join HSPL Hospital System
          </p>

          {message && (
            <div
              className="alert alert-info"
              style={{
                borderRadius: "10px",
                fontSize: "14px",
              }}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleRegister}>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />

            <select
              className="form-select mb-3"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={inputStyle}
            >
              <option>Admin</option>
              <option>Doctor</option>
              <option>Patient</option>
            </select>

            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />

            <input
              type="password"
              className="form-control mb-4"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />

            <button
              className="btn btn-success w-100 fw-bold"
              style={buttonStyle}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "translateY(0px)")
              }
            >
              Create Account
            </button>

          </form>

          <div className="text-center mt-3">
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#0d6efd" }}
            >
              Already have an account?
            </Link>
          </div>

          <div className="text-center mt-2">
            <Link
              to="/"
              style={{ textDecoration: "none", color: "#64748b" }}
            >
              Back to Home
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  borderRadius: "10px",
  padding: "10px",
  border: "1px solid #e2e8f0",
  outline: "none",
  transition: "0.3s",
};

const buttonStyle = {
  borderRadius: "10px",
  padding: "10px",
  transition: "0.3s",
};

export default Register;