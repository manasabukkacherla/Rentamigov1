import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Testimonials: React.FC = () => {
  const styles = {
    testimonialCard: {
      textAlign: "center" as const,
      padding: "20px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
      height: "200px",
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "center",
    },
    carouselControlIcon: {
      backgroundColor: "#000",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
    },
    carouselControl: {
      width: "5%",
    },
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Why People Love RentAmigo</h2>
      <div
        id="testimonialCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {/* Slide 1 */}
          <div className="carousel-item active">
            <div className="row">
              <div className="col-12 col-md-4">
                <div style={styles.testimonialCard}>
                  <h5>Ashwin</h5>
                  <p>Koramangala</p>
                  <p>"RentAmigo made finding a rental property so easy and stress-free!"</p>
                </div>
              </div>
              <div className="col-12 col-md-4 d-none d-md-block">
                <div style={styles.testimonialCard}>
                  <h5>Vijay</h5>
                  <p>Indiranagar</p>
                  <p>"Great service! The team was super helpful and responsive."</p>
                </div>
              </div>
              <div className="col-12 col-md-4 d-none d-md-block">
                <div style={styles.testimonialCard}>
                  <h5>Venkat</h5>
                  <p>Whitefield</p>
                  <p>"Amazing experience! Found the perfect home within days."</p>
                </div>
              </div>
            </div>
          </div>
          {/* Slide 2 */}
          <div className="carousel-item">
            <div className="row">
              <div className="col-12 col-md-4">
                <div style={styles.testimonialCard}>
                  <h5>Manasa</h5>
                  <p>HSR Layout</p>
                  <p>"Highly recommend RentAmigo for their professionalism and dedication!"</p>
                </div>
              </div>
              <div className="col-12 col-md-4 d-none d-md-block">
                <div style={styles.testimonialCard}>
                  <h5>Ramya</h5>
                  <p>Jayanagar</p>
                  <p>"The best platform for tenants and landlords alike. Simple and reliable!"</p>
                </div>
              </div>
              <div className="col-12 col-md-4 d-none d-md-block">
                <div style={styles.testimonialCard}>
                  <h5>Rohit</h5>
                  <p>BTM Layout</p>
                  <p>"RentAmigo’s support team went above and beyond to help me."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="prev"
          style={styles.carouselControl}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
            style={styles.carouselControlIcon}
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="next"
          style={styles.carouselControl}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
            style={styles.carouselControlIcon}
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
