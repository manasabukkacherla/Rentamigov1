import HeroGrid from "./HeroGrid";
import Headerr from "../landingpages/headerr";
import Icons from "./Owner_icons";
import Services from "../Service-page-components/Services";
import OTPVerificationForm from "../user-verification-form";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Owner_testimonials from "./Owner_testimonials";
import Footer from "../landingpages/Footer";


const OwnerPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToServices) {
      const servicesSection = document.getElementById("services");
      if (servicesSection) {
        servicesSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [location]);
  const images = [
    {
      url: "/assets/owner1.jpg",
      alt: "Property view",
    },
    {
      url: "/assets/owner2.jpg",
      alt: "Property interior",
    },
    {
      url: "/assets/owner3.jpg",
      alt: "Property bedroom",
    },
    {
      url: "/assets/owner4.jpg",
      alt: "Property detail",
    },
    {
      url: "/assets/owner5.jpg",
      alt: "Property feature",
    },
    {
      url: "/assets/owner6.jpg",
      alt: "Property amenity",
    },
  ];

  return (
    <div>
      <Headerr />
      <HeroGrid images={images} />
      <Icons />
      <Services />
      <Owner_testimonials />
      <div id="verification-form">
        <OTPVerificationForm />
      </div>
      <Footer />
    </div>
  );
};

export default OwnerPage;
