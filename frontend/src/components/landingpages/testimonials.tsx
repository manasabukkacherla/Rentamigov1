import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Testimonials: React.FC = () => {
  const styles = {
    testimonialCard: {
      textAlign: "center" as const,
      padding: "20px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
      height: "300px",
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "center",
    },
    testimonialImage: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      margin: "0 auto 10px",
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
      <h2 className="text-center mb-4">Why People Love Us</h2>
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
                  
                  <h5>LOHIT </h5>
                  <p>bangalore</p>
                  <p>"	The property is clean, safe, and well-maintained. I’ve been living here for two years, and I couldn’t be happier. The management team genuinely cares about the tenants.									"</p>
                </div>
              </div>
              <div className="col-12 col-md-4 d-none d-md-block">
                <div style={styles.testimonialCard}>
                  
                  <h5>VINUTHNA</h5>
                  <p>Sivajinagar</p>
                  <p>"	Moving in was a breeze! The team provided clear instructions, had everything ready on time, and even followed up to ensure I was comfortable in my new home. Exceptional service!										"</p>
                </div>
              </div>
              <div className="col-12 col-md-4 d-none d-md-block">
                <div style={styles.testimonialCard}>
                 
                  <h5>Arjun</h5>
                  <p>Yelhanka</p>
                  <p>"As a pet owner, I was so happy to find a property management company that welcomes pets and even has amenities like a dog park. My furry friend and I love living here!									"</p>
                </div>
              </div>
            </div>
          </div>
          {/* Slide 2 */}
          <div className="carousel-item">
            <div className="row">
              <div className="col-12 col-md-4">
                <div style={styles.testimonialCard}>
                  
                  <h5>Divya</h5>
                  <p>Marathalle</p>
                  <p>"Living here has been such a smooth experience! The property management team is always prompt in addressing any issues,and it shows in their dedication to maintaining the property										"</p>
                </div>
              </div>
              <div className="col-12 col-md-4 d-none d-md-block">
                <div style={styles.testimonialCard}>
                  
                  <h5>Pradeep Kumar</h5>
                  <p>Electronic City</p>
                  <p>"The property managers genuinely care about their tenants. They listen to concerns, address them promptly, and always prioritize tenant satisfaction. It feels great to be valued as a tenant.										"</p>
                </div>
              </div>
              <div className="col-12 col-md-4 d-none d-md-block">
                <div style={styles.testimonialCard}>
                  
                  <h5>Rohith Naik</h5>
                  <p>WhiteField</p>
                  <p>"Exceptional value for money."</p>
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
