import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

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
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
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
      }, 1200);

    } catch (error) {
      setMessage(error.response?.data?.message || "Register Failed");
    }
  };

  return (
    <div className="register-page">

      <div className="bg-orbs"></div>

      <div className="register-card">

        <div className="left-panel d-none d-md-flex flex-column justify-content-between">

          <div>
            <Link to="/" className="home-btn">← Back to Home</Link>
          </div>

          <div>
            <div className="badge-glass">Enterprise Identity Hub</div>

            <h1 className="hero-title">
              Build Your <br />
              <span className="highlight">Smart Healthcare Identity</span>
            </h1>

            <p className="hero-text">
              Create a secure account to access enterprise-grade hospital management systems with role-based authentication.
            </p>
          </div>

          <div className="footer-text">
            © {new Date().getFullYear()} HSPL Enterprise Systems
          </div>

        </div>


        <div className="right-panel">

          <div className="form-box">

            <h2 className="title">Create Account</h2>
            <p className="sub-title">Join HSPL System</p>

            {message && (
              <div className="alert alert-info py-2 small">
                {message}
              </div>
            )}

            <form onSubmit={handleRegister}>

              <label className="form-label small fw-bold">
                FULL NAME
              </label>

              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>


              <label className="form-label small fw-bold">
                ROLE
              </label>

              <div className="input-group mb-3">
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


              <label className="form-label small fw-bold">
                EMAIL
              </label>

              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>


              <label className="form-label small fw-bold">
                PASSWORD
              </label>

              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>


              <button type="submit" className="btn register-btn w-100 mt-2">
                Create Account
              </button>

            </form>


            <div className="links mt-4 d-flex justify-content-between">
              <Link to="/login">Already have account?</Link>
              <Link to="/">Home</Link>
            </div>


          </div>

        </div>

      </div>


      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #020617;
          font-family: "Segoe UI", sans-serif;
        }

        .register-page{
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .bg-orbs::before,
        .bg-orbs::after{
          content:"";
          position:absolute;
          width:600px;
          height:600px;
          border-radius:50%;
          filter:blur(140px);
          opacity:0.35;
          animation:float 12s infinite ease-in-out;
        }

        .bg-orbs::before{
          background:#6d54fd;
          top:-150px;
          left:-150px;
        }

        .bg-orbs::after{
          background:#34d399;
          bottom:-150px;
          right:-150px;
          animation-delay:3s;
        }

        .register-card{
          width:100vw;
          height:100vh;
          display:flex;
          z-index:2;
        }

        .left-panel{
          flex:1;
          padding:70px;
          background:linear-gradient(135deg,#4f46e5,#6d54fd,#8b5cf6);
          color:white;
        }

        .home-btn{
          color:white;
          text-decoration:none;
          padding:8px 12px;
          border-radius:10px;
          background:rgba(255,255,255,0.15);
          border:1px solid rgba(255,255,255,0.2);
        }

        .badge-glass{
          display:inline-block;
          padding:6px 12px;
          border-radius:999px;
          background:rgba(255,255,255,0.15);
          border:1px solid rgba(255,255,255,0.2);
          font-size:12px;
          margin-bottom:20px;
        }

        .hero-title{
          font-size:52px;
          font-weight:800;
          line-height:1.1;
        }

        .highlight{
          background:linear-gradient(to right,#34d399,#2dd4bf);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
        }

        .hero-text{
          margin-top:15px;
          opacity:0.9;
          max-width:420px;
        }

        .footer-text{
          font-size:12px;
          opacity:0.6;
        }

        .right-panel{
          flex:1;
          display:flex;
          align-items:center;
          justify-content:center;
          background:rgba(248,249,250,0.92);
          backdrop-filter:blur(30px);
        }

        .form-box{
          width:100%;
          max-width:420px;
          background:rgba(255,255,255,0.75);
          border:1px solid rgba(255,255,255,0.5);
          padding:40px;
          border-radius:22px;
          box-shadow:0 25px 60px rgba(0,0,0,0.08);
          backdrop-filter:blur(25px);
          animation:fadeIn .8s ease;
        }

        .title{
          font-weight:700;
          color:#111827;
        }

        .sub-title{
          font-size:13px;
          color:#6b7280;
          margin-bottom:20px;
        }

        .register-btn{
          background:linear-gradient(135deg,#10b981,#34d399);
          color:white;
          font-weight:600;
          padding:12px;
          border-radius:12px;
          border:none;
          transition:.3s;
          box-shadow:0 10px 30px rgba(16,185,129,.3);
        }

        .register-btn:hover{
          transform:translateY(-2px) scale(1.01);
          box-shadow:0 15px 40px rgba(16,185,129,.4);
        }

        .form-control,.form-select{
          border-radius:12px!important;
          background:rgba(255,255,255,.7)!important;
        }

        @keyframes float{
          0%,100%{transform:translateY(0);}
          50%{transform:translateY(30px);}
        }

        @keyframes fadeIn{
          from{opacity:0;transform:translateY(10px);}
          to{opacity:1;transform:translateY(0);}
        }

        @media(max-width:768px){
          .left-panel{display:none;}
        }

      `}</style>

    </div>
  );
}

export default Register;