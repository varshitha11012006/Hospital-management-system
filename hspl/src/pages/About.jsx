import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

const About = () => {
  useEffect(() => {
    // 1. Counter Animation Logic
    const counters = document.querySelectorAll('.counter');
    
    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const duration = 2000; // 2 seconds
      const startTime = performance.now();

      const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Calculate current value
        const current = Math.round(progress * target);
        el.textContent = current.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target.toLocaleString();
        }
      };
      requestAnimationFrame(step);
    };

    // 2. Intersection Observer to trigger counters on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    // Start observing all counters
    counters.forEach((counter) => observer.observe(counter));

    // Cleanup observer on unmount
    return () => {
      counters.forEach((counter) => observer.unobserve(counter));
    };
  }, []);

  return (
    <div className="bg-light">
      {/* External CDNs */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

      {/* HERO SECTION */}
      <header className="bg-primary bg-gradient text-white text-center py-5">
        <div className="container py-5">
          <h1 className="display-4 fw-bold mb-3">About Our Hospital</h1>
          <p className="lead mb-0">Delivering quality healthcare with compassion, innovation, and excellence.</p>
        </div>
      </header>

      {/* INTRODUCTION */}
      <section className="py-5 bg-white" id="about-intro">
        <div className="container py-4">
          <div className="row text-center mb-5">
            <div className="col-lg-8 mx-auto">
              <h2 className="fw-bold text-primary mb-3">Who We Are</h2>
              <p className="text-secondary">Founded in 2005, MediCare Hospital has been at the forefront of providing world-class healthcare services. With over 150 highly qualified specialists and cutting-edge medical technology, we are committed to delivering personalized, compassionate care that transforms lives.</p>
            </div>
          </div>
          
          {/* Statistics */}
          <div className="row g-4 text-center">
            <div className="col-6 col-md-3">
              <div className="p-4 border rounded shadow-sm bg-light h-100">
                <h3 className="text-primary fw-bold mb-0"><span className="counter" data-target="5000">0</span>+</h3>
                <p className="text-secondary mb-0">Patients Served</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-4 border rounded shadow-sm bg-light h-100">
                <h3 className="text-primary fw-bold mb-0"><span className="counter" data-target="150">0</span>+</h3>
                <p className="text-secondary mb-0">Expert Doctors</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-4 border rounded shadow-sm bg-light h-100">
                <h3 className="text-primary fw-bold mb-0"><span className="counter" data-target="25">0</span>+</h3>
                <p className="text-secondary mb-0">Departments</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-4 border rounded shadow-sm bg-light h-100">
                <h3 className="text-primary fw-bold mb-0"><span className="counter" data-target="20">0</span>+</h3>
                <p className="text-secondary mb-0">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="p-5 bg-white border border-0 border-top border-primary border-4 rounded shadow-sm h-100">
                <h3 className="text-primary"><i className="fas fa-bullseye me-2"></i>Our Mission</h3>
                <p className="text-secondary">To provide accessible, affordable, and high-quality healthcare services to every patient with compassion, respect, and clinical excellence.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-5 bg-white border border-0 border-top border-success border-4 rounded shadow-sm h-100">
                <h3 className="text-success"><i className="fas fa-eye me-2"></i>Our Vision</h3>
                <p className="text-secondary">To be the most trusted healthcare institution in the region, recognized for pioneering medical breakthroughs and delivering exceptional patient outcomes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FACILITIES */}
      <section className="py-5 bg-white" id="facilities">
        <div className="container text-center py-4">
          <h2 className="fw-bold text-primary mb-5">World-Class Facilities</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 border rounded bg-light shadow-sm h-100">
                <i className="fas fa-ambulance fa-3x text-danger mb-3"></i>
                <h5>Emergency Care</h5>
                <p className="text-secondary small">24/7 trauma center with rapid-response teams.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded bg-light shadow-sm h-100">
                <i className="fas fa-procedures fa-3x text-primary mb-3"></i>
                <h5>Operation Theatres</h5>
                <p className="text-secondary small">Fully equipped modular OTs with advanced technology.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded bg-light shadow-sm h-100">
                <i className="fas fa-flask fa-3x text-success mb-3"></i>
                <h5>Diagnostic Labs</h5>
                <p className="text-secondary small">NABL-accredited labs for accurate and quick results.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP TEAM */}
      <section className="py-5 bg-light" id="team">
        <div className="container text-center py-4">
          <h2 className="fw-bold text-primary mb-5">Our Leadership Team</h2>
          <div className="row g-4">
            <div className="col-md-3">
              <div className="p-4 border rounded bg-white shadow-sm h-100">
                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3 fs-4 fw-bold" style={{width: '60px', height: '60px'}}>RK</div>
                <h5 className="mb-1">P1</h5>
                <p className="text-secondary small mb-0">Chairman</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 border rounded bg-white shadow-sm h-100">
                <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center mx-auto mb-3 fs-4 fw-bold" style={{width: '60px', height: '60px'}}>PS</div>
                <h5 className="mb-1">P2</h5>
                <p className="text-secondary small mb-0">Medical Director</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 border rounded bg-white shadow-sm h-100">
                <div className="rounded-circle bg-info text-white d-flex align-items-center justify-content-center mx-auto mb-3 fs-4 fw-bold" style={{width: '60px', height: '60px'}}>AM</div>
                <h5 className="mb-1">P3</h5>
                <p className="text-secondary small mb-0">Chief Surgeon</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 border rounded bg-white shadow-sm h-100">
                <div className="rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center mx-auto mb-3 fs-4 fw-bold" style={{width: '60px', height: '60px'}}>DN</div>
                <h5 className="mb-1">P4</h5>
                <p className="text-secondary small mb-0">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-5 bg-white">
        <div className="container text-center py-4">
          <h2 className="fw-bold text-primary mb-5">Patient Stories</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm p-5 bg-light">
                <i className="fas fa-quote-left fa-2x text-primary mb-3"></i>
                <p className="lead fst-italic text-secondary">"MediCare Hospital truly saved my life. The cardiac surgery team was exceptional. I felt like family, not just a patient. Eternally grateful!"</p>
                <h6 className="fw-bold mt-3 mb-0">- Anitha Krishnan</h6>
                <small className="text-secondary">Cardiac Surgery Patient</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-5 bg-primary bg-gradient text-white text-center">
        <div className="container py-4">
          <h2 className="fw-bold mb-3">Your Health Is Our Priority</h2>
          <p className="mb-4">Schedule a consultation today and take the first step toward a healthier life.</p>

          <Link
            to="/register"
            className="btn btn-light btn-lg fw-bold px-5 text-primary rounded-pill shadow"
          >
            Book Appointment
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark text-white py-5 text-center" id="contact">
        <div className="container">
          <p className="mb-3">&copy; 2025 MediCare Hospital. All Rights Reserved.</p>
          <div className="d-flex justify-content-center gap-3">
            <a href="#fb" className="text-white fs-4"><i className="fab fa-facebook"></i></a>
            <a href="#tw" className="text-white fs-4"><i className="fab fa-twitter"></i></a>
            <a href="#ig" className="text-white fs-4"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
