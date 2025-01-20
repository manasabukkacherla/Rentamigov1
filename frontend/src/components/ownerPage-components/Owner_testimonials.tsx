import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Owner_testimonials: React.FC = () => {
  const styles = {
    testimonialCard: {
      textAlign: "center" as const,
      padding: "20px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
      height: "400px",
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
                 
                  <h5>Mohan Krishna</h5>
                  <p>Bangalore</p>
                  <p>Partnering with this property management company has been the best decision I’ve made. They handle everything – tenant screening, rent collection, and maintenance – so I can enjoy the benefits of owning property without the stress.													</p>
                </div>
              </div>
              <div className="col-12 col-md-4 d-none d-md-block">
                <div style={styles.testimonialCard}>
                  
                  <h5>Madhusudhana Chowdary</h5>
                  <p>Marathalle</p>
                  <p>The onboarding process was smooth and professional. They took the time to understand my property and goals and provided a customized management plan that has worked perfectly.I appreciate how transparent and communicative they are. They keep me updated on everything, from tenant issues to maintenance costs, and ensure I’m never caught off guard.																					</p>
                </div>
              </div>
              <div className="col-12 col-md-4 d-none d-md-block">
                <div style={styles.testimonialCard}>
                  
                  <h5>Priyanka Reddy</h5>
                  <p>Electronic City</p>
                  <p>"	Living overseas, I was worried about managing my property back home, but this company has taken care of everything. I have complete peace of mind knowing my investment is in good hands.They’ve done an excellent job retaining tenants. By addressing tenant needs promptly and maintaining the property well, I’ve had no vacancies for over two years!																				"</p>
                </div>
              </div>
            </div>
          </div>
          {/* Slide 2 */}
          <div className="carousel-item">
            <div className="row">
              <div className="col-12 col-md-4">
                <div style={styles.testimonialCard}>
                  
                  <h5>Sujith</h5>
                  <p>Jigini</p>
                  <p>"Amazing experience, would visit again."</p>
                </div>
              </div>
              <div className="col-12 col-md-4 d-none d-md-block">
                <div style={styles.testimonialCard}>
                  
                  <h5>Yamini</h5>
                  <p>Yelahanka</p>
                  <p>"Top-notch facilities and services."</p>
                </div>
              </div>
              <div className="col-12 col-md-4 d-none d-md-block">
                <div style={styles.testimonialCard}>
                  
                  <h5>Sujan Yadhav</h5>
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

export default Owner_testimonials;
