import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const ImageGallery: React.FC = ({ propertyId }) => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);

  // New: Property details
  const [propertyDetails, setPropertyDetails] = useState<{
    propertyName: string;
    locality: string;
    city: string;
    monthlyRent: number | null;
    maintenanceAmount: number | null; // Handle null
    securityDeposit: number | null;
  }>({
    propertyName: "",
    locality: "",
    city: "",
    monthlyRent: null,
    maintenanceAmount: null,
    securityDeposit: null,
  });

  // Fetch property details
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(
          `https://c5zaskxsitwlc33abxxgi3smli0lydfl.lambda-url.us-east-1.on.aws/api/properties/${propertyId}/com`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch rent details");
        }
        const data = await response.json();
        setPropertyDetails((prevDetails) => ({
          ...prevDetails,
          monthlyRent: data.monthlyRent || 0,
          maintenanceAmount: data.maintenanceAmount || null, // Set to null if not provided
          securityDeposit: data.securityDeposit || 0,
        }));
      } catch (error) {
        console.error("Error fetching rent details:", error);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);


  //fetching details of the property
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(

          `https://c5zaskxsitwlc33abxxgi3smli0lydfl.lambda-url.us-east-1.on.aws/api/properties/${propertyId}`

         
        );
        if (!response.ok) {
          throw new Error("Failed to fetch property details");
        }
        const data = await response.json();
  
        // Ensure all properties are set in the state update
        setPropertyDetails((prevDetails) => ({
          ...prevDetails, // Retain the previous state
          propertyName: data.propertyName || "Unknown Property",
          locality: data.locality || "Unknown Locality",
          city: data.area || "Unknown City",
          monthlyRent: data.monthlyRent || 0,
          maintenanceAmount: data.maintenanceAmount || 0,
          securityDeposit: data.securityDeposit || 0,
        }));
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };
  
    fetchPropertyDetails();
  }, [propertyId]);
  
  //fetching photos
  useEffect(() => {
    const fetchImages = async () => {
      const dummyImages = Array.from(
        { length: 20 },
        (_, i) => `https://via.placeholder.com/800x400?text=Image+${i + 1}`
      );
      setImages(dummyImages);

      try {
        const response = await fetch(
          `https://c5zaskxsitwlc33abxxgi3smli0lydfl.lambda-url.us-east-1.on.aws/api/properties/${propertyId}/photos`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await response.json();
        setImages(data.exteriorView || []);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div style={styles.mainContainer}>
      {/* Property Info Section */}
      <div style={styles.propertyInfo}>
        <h2 style={styles.propertyName}>{propertyDetails.propertyName}</h2>
        <p style={styles.propertyDetails}>
          {propertyDetails.locality}, {propertyDetails.city}
        </p>
      </div>

      <div style={isMobileView ? styles.mobileContainer : styles.container}>
        {/* Carousel Section */}
        <div style={styles.carouselContainer}>
          {images.length > 0 && (
            <>
              <img
                src={images[currentIndex]}
                alt={`Carousel Image ${currentIndex + 1}`}
                style={styles.carouselImage}
              />
            </>
          )}
          <button
            style={{ ...styles.navButton, ...styles.prevButton }}
            onClick={handlePrev}
          >
            &lt;
          </button>
          <button
            style={{ ...styles.navButton, ...styles.nextButton }}
            onClick={handleNext}
          >
            &gt;
          </button>
        </div>

        {/* Thumbnails Section */}
        {!isMobileView && (
          <div style={styles.rightContainer}>
            <div style={styles.thumbnailGrid}>
              {images.slice(0, 10).map((image, index) => (
                <div style={styles.thumbnailWrapper} key={index}>
                  <img
                    src={image}
                    alt={`Thumbnail ${index}`}
                    style={styles.thumbnail}
                    onClick={() => setCurrentIndex(index)}
                  />
                  {index === 8 && (
                    <button
                      style={styles.overlayButton}
                      onClick={() => openModal(0)}
                    >
                      View All
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Rent Price and Security Deposit */}
      <div style={styles.infoContainerSideBySide}>
        <div style={styles.infoItemWithStyle}>
          Monthly Rent: ₹{propertyDetails.monthlyRent}
        </div>
        <div style={styles.infoItemWithStyle}>
          Maintenance:{" "}
          {propertyDetails.maintenanceAmount !== null
            ? `₹${propertyDetails.maintenanceAmount}`
            : "No Maintenance"}
        </div>
        <div style={styles.infoItemWithStyle}>
          Security Deposit: ₹{propertyDetails.securityDeposit}
        </div>
      </div>
      {/* View All Button for Mobile */}
      {isMobileView && (
        <button style={styles.viewAllButtonMobile} onClick={() => openModal(0)}>
          View All
        </button>
      )}

      {/* Modal for Fullscreen Carousel */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="View All Images"
        style={{
          content: styles.modal,
          overlay: styles.overlay,
        }}
      >
        <button style={styles.closeModalButton} onClick={closeModal}>
          &times;
        </button>
        <div style={styles.modalCarouselContainer}>
          {images.length > 0 && (
            <img
              src={images[currentIndex]}
              alt={`Modal Carousel Image ${currentIndex}`}
              style={styles.modalCarouselImage}
            />
          )}
          <button
            style={{ ...styles.navButton, ...styles.prevButton }}
            onClick={handlePrev}
          >
            &lt;
          </button>
          <button
            style={{ ...styles.navButton, ...styles.nextButton }}
            onClick={handleNext}
          >
            &gt;
          </button>
        </div>
      </Modal>
    </div>
  );
};

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
  },
  propertyInfo: {
    textAlign: "left" as const,
    margin: "0 20px",
  },
  propertyName: {
    fontSize: "30px",
    fontWeight: "bold" as const,
  },
  propertyDetails: {
    fontSize: "20px",
    color: "#666",
  },

  container: {
    display: "flex",
    gap: "20px",
    padding: "20px",
  },
  mobileContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
    padding: "10px",
    alignItems: "center",
  },
  carouselContainer: {
    position: "relative" as const,
    flex: 3,
    borderRadius: "10px",
    overflow: "hidden",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },
  navButton: {
    position: "absolute" as const,
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(255, 255, 255, 0.5)",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    borderRadius: "50%",
    fontSize: "20px",
  },
  prevButton: {
    left: "10px",
  },
  nextButton: {
    right: "10px",
  },
  infoContainerSideBySide: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#f1f1f1",
    borderRadius: "8px",
    padding: "10px 20px",
    marginTop: "20px",
    gap: "10px",
    border: "1px solid #ccc",
    width: "40%",
    marginLeft: "20px",
  },
  infoItemWithStyle: {
    flex: 1,
    textAlign: "center" as const,
    padding: "10px",
    backgroundColor: "white",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "14px",
    fontWeight: "bold" as const,
  },
  expandButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    marginLeft: "5px",
  },
  expandIcon: {
    fontSize: "16px",
    color: "#007bff",
  },
  expandedInfo: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
  },
  expandedInfoCard: {
    padding: "15px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  expandedInfoTitle: {
    margin: "0 0 10px",
    fontSize: "18px",
    fontWeight: "bold" as const,
    color: "#333",
  },
  expandedInfoText: {
    margin: "5px 0",
    fontSize: "14px",
    color: "#555",
  },
  rightContainer: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    flex: 1,
    gap: "10px",
  },
  thumbnailGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    width: "100%",
  },
  thumbnailWrapper: {
    position: "relative" as const,
  },
  thumbnail: {
    width: "100%",
    height: "110px",
    objectFit: "cover" as const,
    borderRadius: "5px",
    cursor: "pointer",
  },
  overlayButton: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    textAlign: "center" as const,
  },
  viewAllButtonMobile: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    alignSelf: "center",
    marginTop: "20px",
  },
  modal: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
    background: "white",
    borderRadius: "10px",
    overflow: "hidden",
    padding: "20px",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.5)",
  },
  modalCarouselContainer: {
    position: "relative" as const,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalCarouselImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain" as const,
  },
  closeModalButton: {
    position: "absolute" as const,
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
  },
  carouselTextOverlay: {
    position: "absolute",
    bottom: "20px", // Position at the bottom of the container
    left: "50%",
    transform: "translateX(-50%)",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
    zIndex: 2, // Ensure it appears above the image
    pointerEvents: "none", // Prevent interference with navigation buttons
  },
};

export default ImageGallery;
