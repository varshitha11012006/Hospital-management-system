import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
          role: role.trim().toLowerCase(),
        }
      );

      setMessage(res.data.message);

      const user = res.data.user;

      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") navigate("/admin-dashboard");
      else if (user.role === "doctor") navigate("/doctor-dashboard");
      else navigate("/patient-dashboard");

    } catch (error) {
      setMessage(error.response?.data?.message || "Login Failed");
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
            src="login.jpg"
            alt="login"
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

          <h3
            className="text-center fw-bold mb-4"
            style={{
              color: "#0f172a",
              letterSpacing: "0.5px",
            }}
          >
            HSPL Login
          </h3>

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

          <form onSubmit={handleLogin}>

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
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />

            <button
              className="btn btn-primary w-100 mb-3"
              style={buttonStyle}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "translateY(0px)")
              }
            >
              Login
            </button>

          </form>

          <div className="text-center">
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "#0d6efd" }}
            >
              Create Account
            </Link>
          </div>

          <div className="text-center mt-2">
            <Link
              to="/"
              style={{ textDecoration: "none", color: "#64748b" }}
            >
              Home
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
  fontWeight: "500",
  transition: "0.3s",
};

export default Login;