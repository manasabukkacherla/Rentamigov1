import React, { useState, useEffect } from "react";
import Modal from "react-modal";

interface ImageGalleryProps {
  propertyId: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ propertyId }) => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);

  const [propertyDetails, setPropertyDetails] = useState<{
    propertyName: string;
    locality: string;
    area: string;
    address: string; 
  }>({
    propertyName: "",
    locality: "",
    area: "",
    address: "",
  });

  const placeholderImage = "https://via.placeholder.com/800x400?text=No+Image";

  // Fetch property details (name, locality, area)
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/properties/${propertyId}/locations`);
        if (!response.ok) {
          throw new Error("Failed to fetch property details");
        }
        const data = await response.json();
  
        if (data.length > 0) {
          const location = data[0]; // Assuming the first location is relevant
          setPropertyDetails({
            propertyName: location.propertyName || "Unknown Property",
            locality: location.locality || "Unknown Locality",
            area: location.area || "Unknown Area",
            address: `${location.flatNo || ""}, ${location.addressLine1 || ""}, ${
              location.addressLine2 || ""
            }, ${location.addressLine3 || ""}`.replace(/, ,/g, ",").replace(/, $/, ""), // Format address properly
          });
        }
      } catch (error) {
        console.error("Error fetching property details:", error);
        setPropertyDetails({
          propertyName: "Unknown Property",
          locality: "Unknown Locality",
          area: "Unknown Area",
          address: "Unknown Address",
        });
      }
    };
  
    fetchPropertyDetails();
  }, [propertyId]);
  

  // Fetch property photos
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/photos/${propertyId}/photos`);
        if (!response.ok) {
          throw new Error("Failed to fetch property photos");
        }
        const data = await response.json();
        const photos = data.photos;

        const allImages = [
          photos.coverImage,
          photos.exteriorView,
          photos.livingRoom,
          photos.kitchen,
          photos.diningRoom,
          photos.utilityArea,
          photos.others,
          ...Object.values(photos.bedrooms || {}),
          ...Object.values(photos.bathrooms || {}),
          ...Object.values(photos.balconies || {}),
          ...Object.values(photos.extraRooms || {}),
        ].filter(Boolean); // Remove null or undefined images

        setImages(allImages.length > 0 ? allImages : Array(10).fill(placeholderImage));
      } catch (error) {
        console.error("Error fetching property photos:", error);
        setImages(Array(10).fill(placeholderImage));
      }
    };

    fetchImages();
  }, [propertyId]);

  // Handle resizing for mobile view
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

  return (
    <div style={styles.mainContainer}>
      {/* Property Info Section */}
      <div style={styles.propertyInfo}>
        <h2 style={styles.propertyName}>{propertyDetails.propertyName}</h2>
        <p style={styles.propertyDetails}>
          {propertyDetails.locality}, {propertyDetails.area}
        </p>
        <p style={styles.propertyDetails}>{propertyDetails.address}</p>
      </div>

      <div style={isMobileView ? styles.mobileContainer : styles.container}>
        {/* Carousel Section */}
        <div style={styles.carouselContainer}>
          {images.length > 0 && (
            <img
              src={images[currentIndex]}
              alt={`Carousel Image ${currentIndex + 1}`}
              style={styles.carouselImage}
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

        {/* Thumbnails Section */}
        {!isMobileView && (
          <div style={styles.thumbnailGrid}>
            {images.slice(0, 10).map((image, index) => (
              <div key={index} style={styles.thumbnailWrapper}>
                <img
                  src={image}
                  alt={`Thumbnail ${index}`}
                  style={styles.thumbnail}
                  onClick={() => setCurrentIndex(index)}
                />
                {index === 9 && images.length > 10 && (
                  <button
                    style={styles.viewAllButton}
                    onClick={() => openModal(0)}
                  >
                    View All
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

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
    padding: "20px",
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
  },
  mobileContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
  },
  carouselContainer: {
    position: "relative" as const,
    flex: 1,
    borderRadius: "10px",
    overflow: "hidden",
  },
  carouselImage: {
    width: "100%",
    height: "300px",
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
  thumbnailGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "10px",
  },
  thumbnailWrapper: {
    position: "relative" as const,
  },
  thumbnail: {
    width: "100%",
    height: "80px",
    objectFit: "cover" as const,
    borderRadius: "5px",
    cursor: "pointer",
  },
  viewAllButton: {
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
};

export default ImageGallery;
