import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <div
        className="d-flex align-items-center justify-content-center text-center"
        style={{
          minHeight: "90vh",
          background:
            "linear-gradient(180deg, #f8fbff 0%, #eef5ff 100%)",
          padding: "40px",
        }}
      >
        <div style={{ maxWidth: "900px" }}>

          <h1
            className="fw-bold"
            style={{
              fontSize: "60px",
              color: "#0f172a",
              letterSpacing: "1px",
            }}
          >
            HSPL Management
          </h1>

          <p
            className="lead mt-3"
            style={{ fontSize: "24px", color: "#475569" }}
          >
            Smart Employee & Project Management System
          </p>

          <p className="text-muted fs-5 mt-2">
            Built with MERN Stack for modern enterprise workflows
          </p>

          <div className="mt-5 d-flex justify-content-center gap-3 flex-wrap">

            <Link
              to="/login"
              className="btn btn-primary btn-lg px-5"
              style={{
                borderRadius: "12px",
                boxShadow: "0 8px 20px rgba(13,110,253,0.25)",
                transition: "0.3s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "translateY(-3px)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "translateY(0px)")
              }
            >
              Explore
            </Link>

            <Link
              to="/login"
              className="btn btn-outline-primary btn-lg px-5"
              style={{
                borderRadius: "12px",
                transition: "0.3s",
              }}
            >
              Learn More
            </Link>

          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="container py-5">

        <h2 className="text-center fw-bold mb-5" style={{ color: "#0f172a" }}>
          Why Choose HSPL?
        </h2>

        <div className="row g-4">

          {[
            {
              title: "Employee Management",
              desc: "Manage employee records efficiently with structured workflows.",
            },
            {
              title: "Project Tracking",
              desc: "Track project progress in real-time with dashboards.",
            },
            {
              title: "Secure Access",
              desc: "Role-based authentication with strong security.",
            },
          ].map((item, i) => (
            <div className="col-md-4" key={i}>
              <div
                className="card border-0 h-100 text-center p-4"
                style={{
                  borderRadius: "16px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
                  transition: "0.3s",
                  cursor: "pointer",
                  background: "#ffffff",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 18px 40px rgba(13,110,253,0.15)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.06)";
                }}
              >
                <h4 className="fw-bold text-dark">{item.title}</h4>
                <p className="text-muted mt-2">{item.desc}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}

export default Home;