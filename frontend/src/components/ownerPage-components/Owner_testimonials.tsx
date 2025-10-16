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
                 
                  <h5>Dheeraj Singh</h5>
                  <p>Bangalore</p>
                  <p>I had to move to USA in 2023 because of my work with my family. A friend of mine referred me the services of Propamigo as he was already using the same since last two years. I would definitely say they have been very helpful in managing my duplex house. I visited my house last year and are really impressed by the condition in which it has been maintained.</p>
                </div>
              </div>
              <div className="col-12 col-md-4 d-none d-md-block">
                <div style={styles.testimonialCard}>
                  
                  <h5>Swati Ahuja</h5>
                  <p>Marathalle</p>
                  <p>I appreciate their timely payment of rent and transparency in the maintaining of the accounts. I get the rent credited to my account and account statement in my mailbox every month unfailingly by 5th of the month.</p>
                </div>
              </div>
              <div className="col-12 col-md-4 d-none d-md-block">
                <div style={styles.testimonialCard}>
                  
                  <h5>Deepak Sanyal</h5>
                  <p>Electronic City</p>
                  <p>Propamigo manages my 3BHK located at Electronics City. Although my tenants couldn’t pay their rent for 2 consecutive months because of loss of job, which I empathize with, Propamigo ensured that the rent is credited to my account. I came to know of this when they finally decided to vacate and I noticed the settlement statement that Propamigo was shared with them.</p>
                </div>
              </div>
            </div>
          </div>
          {/* Slide 2 */}
          <div className="carousel-item">
            <div className="row">
              <div className="col-12 col-md-4">
                <div style={styles.testimonialCard}>
                  
                  <h5>Aditya Prakash</h5>
                  <p>Bellandur</p>
                  <p>I had rented a flat in Bellandur from Propamigo. I never faced any issues from them and also they were very prompt in the refund of Security deposit when I vacated the flat.</p>
                </div>
              </div>
              <div className="col-12 col-md-4 d-none d-md-block">
                <div style={styles.testimonialCard}>
                  
                  <h5>Divya Menon</h5>
                  <p>Yelahanka</p>
                  <p>I had rented a flat from Propamigo along with my friends. When we moved in there were quite a few issues like pigeon mess and a seepage that occurred within 40 days of us moving in. however, Propamigo attended to all the problems highlighted by us and they ensured that they were taken care of.</p>
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
