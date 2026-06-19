import React from "react";

function Contact() {

  const cardStyle = {
    borderRadius: "18px",
    background: "rgba(255,255,255,0.75)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.4)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  };

  const inputStyle = {
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,0.08)",
    background: "rgba(255,255,255,0.7)",
    padding: "12px",
    outline: "none",
    transition: "0.3s",
  };

  return (
    <div className="contact-page">

      {/* AI BACKGROUND ORBS */}
      <div className="bg-orbs"></div>

      <div className="container py-5 position-relative" style={{ zIndex: 2 }}>

        {/* TITLE */}
        <h1 className="text-center fw-bold mb-5 title-glow">
          Contact <span className="highlight">Enterprise Hub</span>
        </h1>

        {/* BRANCH CARDS */}
        <div className="row g-4">

          {[
            {
              title: "Kurnool Branch",
              lines: [
                "Gayatri Estates",
                "Alexander Road",
                "Email: query@yashodamail.com",
                "Phone: 08065906165",
                "Landline: 040 6723 2348",
                "Kurnool - 518007",
              ],
            },
            {
              title: "Hyderabad Branch",
              lines: [
                "Kothapet",
                "Alampur Road",
                "Email: query@yashodamail.com",
                "Phone: 08065906165",
                "Landline: 040 6723 2348",
                "Hyderabad - 500035",
              ],
            },
            {
              title: "Hitech City Branch",
              lines: [
                "Kothaguda",
                "Hitech City",
                "Email: query@yashodamail.com",
                "Phone: 08065906165",
                "Landline: 040 6723 2348",
                "Telangana - 500084",
              ],
            },
            {
              title: "Kothaguda Branch",
              lines: [
                "Kothaguda",
                "Hyderabad",
                "Email: query@yashodamail.com",
                "Phone: 08065906165",
                "Landline: 040 6723 2348",
                "Telangana - 500085",
              ],
            },
          ].map((b, i) => (
            <div className="col-md-6" key={i}>
              <div className="p-4 branch-card" style={cardStyle}>

                <h5 className="fw-bold text-primary mb-3">
                  {b.title}
                </h5>

                <hr />

                {b.lines.map((l, idx) => (
                  <p key={idx} className="text-muted mb-2 small">
                    {l}
                  </p>
                ))}

              </div>
            </div>
          ))}

        </div>

        {/* CONTACT FORM */}
        <div className="mt-5 p-4 form-card" style={cardStyle}>

          <h3 className="text-center fw-bold mb-4">
            Send Us a Message
          </h3>

          <form>

            <div className="row">

              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  placeholder="Your Name"
                  style={inputStyle}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  placeholder="Your Email"
                  style={inputStyle}
                />
              </div>

            </div>

            <input
              className="form-control mb-3"
              placeholder="Subject"
              style={inputStyle}
            />

            <textarea
              className="form-control mb-3"
              rows="5"
              placeholder="Your Message"
              style={inputStyle}
            />

            <button className="btn btn-primary w-100 contact-btn">
              Send Message
            </button>

          </form>

        </div>

      </div>

      {/* STYLE */}
      <style>{`

        html, body {
          margin:0;
          padding:0;
          height:100%;
          background:#020617;
          overflow-x:hidden;
          font-family: "Segoe UI", sans-serif;
        }

        .contact-page{
          min-height:100vh;
          width:100%;
          position:relative;
          background: radial-gradient(circle at top, #0f172a, #020617);
        }

        /* FLOATING AI ORBS */
        .bg-orbs::before,
        .bg-orbs::after{
          content:"";
          position:absolute;
          width:600px;
          height:600px;
          border-radius:50%;
          filter:blur(140px);
          opacity:0.35;
          animation: float 12s infinite ease-in-out;
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

        /* TITLE */
        .title-glow{
          color:white;
          font-size:42px;
          letter-spacing:-1px;
        }

        .highlight{
          background: linear-gradient(to right,#34d399,#2dd4bf);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
        }

        /* CARDS HOVER AI EFFECT */
        .branch-card:hover{
          transform: translateY(-6px);
          box-shadow:0 25px 60px rgba(0,0,0,0.15);
          transition:0.3s;
        }

        /* BUTTON */
        .contact-btn{
          background: linear-gradient(135deg,#6d54fd,#8b5cf6);
          border:none;
          padding:12px;
          font-weight:600;
          border-radius:12px;
          transition:0.3s;
          box-shadow:0 10px 30px rgba(109,84,253,0.3);
        }

        .contact-btn:hover{
          transform: translateY(-2px) scale(1.01);
          box-shadow:0 15px 40px rgba(109,84,253,0.4);
        }

        @keyframes float{
          0%,100%{ transform:translateY(0); }
          50%{ transform:translateY(30px); }
        }

      `}</style>

    </div>
  );
}

export default Contact;