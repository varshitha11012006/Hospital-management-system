function Contact() {
  const cardStyle = {
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
    transition: "all 0.3s ease",
    height: "100%",
    border: "1px solid #eef2f7",
    backgroundColor: "#ffffff",
  };

  const hoverEffect = {
    transform: "translateY(-8px)",
    boxShadow: "0 14px 28px rgba(13,110,253,0.15)",
  };

  const inputStyle = {
    borderRadius: "10px",
    border: "1px solid #e3e8f0",
    padding: "12px",
    transition: "0.3s",
    outline: "none",
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        background: "linear-gradient(135deg, #f6f9fc, #eef4ff)",
        minHeight: "100vh",
      }}
    >
      <div className="container">

        <h1
          className="text-center mb-5 fw-bold"
          style={{ color: "#0d6efd", letterSpacing: "0.5px" }}
        >
          Contact Us
        </h1>

        <div className="row g-4">

          {/* Branch Cards */}
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
              title: "Hitec City Branch",
              lines: [
                "Kothaguda",
                "Hitec City",
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
          ].map((branch, index) => (
            <div className="col-md-6" key={index}>
              <div
                className="card p-4"
                style={cardStyle}
                onMouseEnter={(e) =>
                  Object.assign(e.currentTarget.style, hoverEffect)
                }
                onMouseLeave={(e) =>
                  Object.assign(e.currentTarget.style, cardStyle)
                }
              >
                <h4 className="fw-semibold text-primary mb-3">
                  {branch.title}
                </h4>
                <hr />
                {branch.lines.map((line, i) => (
                  <p key={i} className="mb-2 text-secondary">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div
          className="card mt-5 p-4 border-0"
          style={{
            borderRadius: "16px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
            backgroundColor: "#ffffff",
          }}
        >
          <h3
            className="text-center mb-4 fw-bold"
            style={{ color: "#0d6efd" }}
          >
            Send Us a Message
          </h3>

          <form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                  style={inputStyle}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your Email"
                  style={inputStyle}
                />
              </div>
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Subject"
                style={inputStyle}
              />
            </div>

            <div className="mb-3">
              <textarea
                className="form-control"
                rows="5"
                placeholder="Your Message"
                style={inputStyle}
              ></textarea>
            </div>

            <div className="text-center">
              <button
                className="btn btn-primary px-5 py-2"
                style={{
                  borderRadius: "10px",
                  transition: "0.3s",
                  fontWeight: "500",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "translateY(-2px)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "translateY(0px)")
                }
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Contact;