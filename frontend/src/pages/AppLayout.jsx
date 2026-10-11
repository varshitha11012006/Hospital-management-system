import { Link, Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg shadow-sm"
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e8eef5",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div className="container">

          <Link
            className="navbar-brand fw-bold fs-3"
            to="/"
            style={{ color: "#0d6efd", letterSpacing: "0.5px" }}
          >
            HSPL Management
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">

            <ul className="navbar-nav ms-auto align-items-center gap-2">

              {["Home", "About", "Contact"].map((item, i) => (
                <li className="nav-item" key={i}>
                  <Link
                    className="nav-link fw-semibold"
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    style={{
                      color: "#334155",
                      padding: "8px 14px",
                      borderRadius: "8px",
                      transition: "0.3s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.background = "#f1f5ff")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    {item}
                  </Link>
                </li>
              ))}

              <li className="nav-item">
                <Link
                  className="btn btn-primary px-4 rounded-pill fw-semibold"
                  to="/register"
                  style={{
                    boxShadow: "0 6px 16px rgba(13,110,253,0.25)",
                    transition: "0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "translateY(-2px)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "translateY(0px)")
                  }
                >
                  Sign Up
                </Link>
              </li>

            </ul>

          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default AppLayout;