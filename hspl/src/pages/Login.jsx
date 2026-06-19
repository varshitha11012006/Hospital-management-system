import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
        role: role.trim().toLowerCase(),
      });

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
    <div className="login-page">

      <div className="login-card">

        {/* LEFT */}
        <div className="left-panel d-none d-md-flex flex-column justify-content-between">

          <div>
            <Link to="/" className="home-btn">← Back to Home</Link>
          </div>

          <div>
            <div className="badge-glass">Enterprise Hub</div>

            <h1 className="hero-title">
              Secure Access to <br />
              <span className="highlight">Smart Systems</span>
            </h1>

            <p className="hero-text">
              High-performance authentication system built for enterprise workflows.
            </p>
          </div>

          <div className="footer-text">
            © {new Date().getFullYear()} HSPL Systems
          </div>

        </div>

        {/* RIGHT */}
        <div className="right-panel">

          <div className="login-box">

            <h2>Welcome Back</h2>
            <p className="text-muted small">Login to continue</p>

            {message && (
              <div className="alert alert-info py-2 small">
                {message}
              </div>
            )}

            <form onSubmit={handleLogin}>

              <label className="form-label small fw-bold">Role</label>
              <div className="input-group mb-3">
                <span className="input-group-text">👤</span>
                <select
                  className="form-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option>Admin</option>
                  <option>Doctor</option>
                  <option>Patient</option>
                </select>
              </div>

              <label className="form-label small fw-bold">Email</label>
              <div className="input-group mb-3">
                <span className="input-group-text">📧</span>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <label className="form-label small fw-bold">Password</label>
              <div className="input-group mb-3">
                <span className="input-group-text">🔒</span>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn w-100 login-btn">
                Login
              </button>

            </form>

            <div className="links mt-3 d-flex justify-content-between">
              <Link to="/register">Create Account</Link>
              <Link to="/">Home</Link>
            </div>

          </div>

        </div>

      </div>

      {/* STYLE */}
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .login-page{
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: radial-gradient(circle at top, #0f172a, #020617);
        }

        .login-card{
          width: 100vw;
          height: 100vh;
          display: flex;
          overflow: hidden;
        }

        /* LEFT */
        .left-panel{
          flex: 1;
          padding: 60px;
          background: linear-gradient(135deg, #5138ee, #6d54fd, #8970ff);
          color: white;
        }

        .home-btn{
          color: white;
          text-decoration: none;
          padding: 8px 12px;
          border-radius: 10px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.2);
        }

        .badge-glass{
          display: inline-block;
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.2);
          font-size: 12px;
          margin-bottom: 20px;
        }

        .hero-title{
          font-size: 48px;
          font-weight: 800;
          line-height: 1.2;
        }

        .highlight{
          background: linear-gradient(to right, #34d399, #2dd4bf);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-text{
          margin-top: 15px;
          opacity: 0.9;
          max-width: 400px;
        }

        .footer-text{
          font-size: 12px;
          opacity: 0.6;
        }

        /* RIGHT */
        .right-panel{
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f8f9fa;
        }

        .login-box{
          width: 100%;
          max-width: 400px;
          background: white;
          padding: 35px;
          border-radius: 18px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.05);
        }

        .login-btn{
          background: linear-gradient(135deg, #6d54fd, #8970ff);
          color: white;
          font-weight: 600;
          padding: 10px;
          border-radius: 10px;
        }

        .login-btn:hover{
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(109,84,253,0.4);
        }

        .links a{
          font-size: 13px;
          color: #6d54fd;
          text-decoration: none;
        }

        .links a:hover{
          text-decoration: underline;
        }

        @media (max-width: 768px){
          .left-panel{
            display: none;
          }

          .right-panel{
            flex: 1;
          }
        }
      `}</style>

    </div>
  );
}

export default Login;