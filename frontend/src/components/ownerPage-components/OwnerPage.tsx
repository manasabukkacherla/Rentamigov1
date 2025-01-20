import HeroGrid from "./HeroGrid";
import Headerr from "../landingpages/headerr";
import Icons from "../landingpages/icons";
import Services from "../Service-page-components/Services";
import Testimonials from "../landingpages/testimonials";
import OTPVerificationForm from "../user-verification-form";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
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
      url: "/src/assets/owner1.jpg",
      alt: "Property view",
    },
    {
      url: "/src/assets/owner2.jpg",
      alt: "Property interior",
    },
    {
      url: "/src/assets/owner3.jpg",
      alt: "Property bedroom",
    },
    {
      url: "/src/assets/owner4.jpg",
      alt: "Property detail",
    },
    {
      url: "/src/assets/owner5.jpg",
      alt: "Property feature",
    },
    {
      url: "/src/assets/owner6.jpg",
      alt: "Property amenity",
    },
  ];

  return (
    <div>
      <Headerr />
      <HeroGrid images={images} />
      <Icons />
      <Services />
      <Testimonials />
      <div id="verification-form">
        <OTPVerificationForm />
      </div>
    </div>
  );
};

export default OwnerPage;
