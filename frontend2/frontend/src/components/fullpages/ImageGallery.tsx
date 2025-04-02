import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { ChevronRight, ChevronLeft, Play } from "lucide-react";

Modal.setAppElement("#root");

interface MediaItem {
  url: string;
  type: 'image' | 'video';
}

interface ImageGalleryProps {
  propertyId: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ propertyId }) => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

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

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(
          `https://api.rentamigo.in/api/properties/${propertyId}/locations`
        );
        if (!response.ok) throw new Error("Failed to fetch property details");
        const data = await response.json();

        if (data.length > 0) {
          const location = data[0];
          setPropertyDetails({
            propertyName: location.propertyName || "Unknown Property",
            locality: location.locality || "Unknown Locality",
            area: location.area || "Unknown Area",
            address: `${location.flatNo || ""}, ${location.addressLine1 || ""}, ${
              location.addressLine2 || ""
            }, ${location.addressLine3 || ""}`.replace(/, ,/g, ",").replace(/, $/, ""),
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

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch(
          `https://api.rentamigo.in/api/photos/${propertyId}/photos`
        );
        if (!response.ok) throw new Error("Failed to fetch property media");
        const data = await response.json();
        const photos = data.photos;

        const allMedia = [
          { url: photos.coverImage, type: 'image' },
          { url: photos.exteriorView, type: 'image' },
          { url: photos.livingRoom, type: 'image' },
          { url: photos.kitchen, type: 'image' },
          { url: photos.diningRoom, type: 'image' },
          { url: photos.utilityArea, type: 'image' },
          { url: photos.others, type: 'image' },
          ...(photos.propertyVideo ? [{ url: photos.propertyVideo, type: 'video' }] : []),
          ...Object.values(photos.bedrooms || {}).map(url => ({ url, type: 'image' })),
          ...Object.values(photos.bathrooms || {}).map(url => ({ url, type: 'image' })),
          ...Object.values(photos.balconies || {}).map(url => ({ url, type: 'image' })),
          ...Object.values(photos.extraRooms || {}).map(url => ({ url, type: 'image' })),
        ].filter(item => item.url) as MediaItem[];

        setMedia(allMedia.length > 0 ? allMedia : Array(10).fill({ url: placeholderImage, type: 'image' }));
      } catch (error) {
        console.error("Error fetching property media:", error);
        setMedia(Array(10).fill({ url: placeholderImage, type: 'image' }));
      }
    };

    fetchMedia();
  }, [propertyId]);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const scrollThumbnails = (direction: 'left' | 'right') => {
    const container = document.getElementById('thumbnailRow');
    if (container) {
      const scrollAmount = 200;
      const newPosition = direction === 'right' 
        ? scrollPosition + scrollAmount 
        : scrollPosition - scrollAmount;
      
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };

  const MediaRenderer = ({ item, isFullscreen = false }: { item: MediaItem; isFullscreen?: boolean }) => {
    if (item.type === 'video') {
      return (
        <video
          src={item.url}
          controls
          autoPlay
          loop
          muted
          playsInline
          style={isFullscreen ? styles.modalCarouselImage : styles.carouselImage}
        />
      );
    }
    return (
      <img
        src={item.url}
        alt="Property"
        style={isFullscreen ? styles.modalCarouselImage : styles.carouselImage}
      />
    );
  };

  const ThumbnailRenderer = ({ item, index }: { item: MediaItem; index: number }) => {
    if (item.type === 'video') {
      return (
        <div style={styles.thumbnailVideoContainer}>
          <video src={item.url} style={styles.thumbnail} muted />
          <div style={styles.playIconOverlay}>
            <Play size={24} color="white" />
          </div>
        </div>
      );
    }
    return (
      <img
        src={item.url}
        alt={`Thumbnail ${index}`}
        style={{
          ...styles.thumbnail,
          ...(currentIndex === index && styles.activeThumbnail),
        }}
      />
    );
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.propertyInfo}>
        <h2 style={styles.propertyName}>{propertyDetails.propertyName}</h2>
        <p style={styles.propertyDetails}>
          {propertyDetails.locality}, {propertyDetails.area}
        </p>
        <p style={styles.propertyDetails}>{propertyDetails.address}</p>
      </div>

      <div style={isMobileView ? styles.mobileContainer : styles.container}>
        <div style={styles.carouselContainer}>
          {media.length > 0 && (
            <MediaRenderer item={media[currentIndex]} />
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

        {isMobileView ? (
          <div style={styles.mobileThumbnailContainer}>
            <button 
              style={{ ...styles.mobileScrollButton, ...styles.mobileScrollButtonLeft }}
              onClick={() => scrollThumbnails('left')}
            >
              <ChevronLeft size={24} />
            </button>
            <div id="thumbnailRow" style={styles.mobileThumbnailRow}>
              {media.map((item, index) => (
                <div 
                  key={index} 
                  style={styles.mobileThumbnailWrapper}
                  onClick={() => setCurrentIndex(index)}
                >
                  <ThumbnailRenderer item={item} index={index} />
                </div>
              ))}
            </div>
            <button 
              style={{ ...styles.mobileScrollButton, ...styles.mobileScrollButtonRight }}
              onClick={() => scrollThumbnails('right')}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        ) : (
          <div style={styles.thumbnailGrid}>
            {media.slice(0, 10).map((item, index) => (
              <div 
                key={index} 
                style={styles.thumbnailWrapper}
                onClick={() => setCurrentIndex(index)}
              >
                <ThumbnailRenderer item={item} index={index} />
                {index === 9 && media.length > 10 && (
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

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="View All Media"
        style={{
          content: styles.modal,
          overlay: styles.overlay,
        }}
      >
        <button style={styles.closeModalButton} onClick={closeModal}>
          &times;
        </button>
        <div style={styles.modalCarouselContainer}>
          {media.length > 0 && (
            <MediaRenderer item={media[currentIndex]} isFullscreen={true} />
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
  thumbnailVideoContainer: {
    position: 'relative' as const,
    width: '100%',
    height: '100%',
  },
  playIconOverlay: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
    padding: "20px",
    maxWidth: "1600px",
    margin: "0",
  },
  propertyInfo: {
    textAlign: "left" as const,
    margin: "0 20px",
  },
  propertyName: {
    fontSize: "30px",
    fontWeight: "bold" as const,
    marginBottom: "8px",
  },
  propertyDetails: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "4px",
  },
  container: {
    display: "flex",
    gap: "20px",
    height: "85vh",
  },
  mobileContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
  },
  carouselContainer: {
    position: "relative" as const,
    flex: "0 0 70%",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    height: "100%",
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
    background: "rgba(255, 255, 255, 0.8)",
    border: "none",
    width: "40px",
    height: "40px",
    cursor: "pointer",
    borderRadius: "50%",
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s",
    zIndex: 1,
  },
  prevButton: {
    left: "20px",
  },
  nextButton: {
    right: "20px",
  },
  mobileThumbnailContainer: {
    position: "relative" as const,
    width: "100%",
    marginTop: "10px",
  },
  mobileThumbnailRow: {
    display: "flex",
    overflowX: "auto" as const,
    scrollBehavior: "smooth" as const,
    gap: "10px",
    padding: "0 50px",
    msOverflowStyle: "none",
    scrollbarWidth: "none" as const,
  },
  mobileThumbnailWrapper: {
    flex: "0 0 auto",
    width: "100px",
    height: "100px",
  },
  mobileThumbnail: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    borderRadius: "4px",
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  mobileScrollButton: {
    position: "absolute" as const,
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(255, 255, 255, 0.9)",
    border: "none",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    zIndex: 1,
  },
  mobileScrollButtonLeft: {
    left: "0",
  },
  mobileScrollButtonRight: {
    right: "0",
  },
  thumbnailGrid: {
    flex: "0 0 30%",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "repeat(5, 1fr)",
    gap: "10px",
    height: "100%",
  },
  thumbnailWrapper: {
    position: "relative" as const,
    width: "100%",
    height: "100%",
    borderRadius: "4px",
    overflow: "hidden",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  activeThumbnail: {
    border: "2px solid #007bff",
    opacity: 0.8,
  },
  viewAllButton: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "white",
    border: "none",
    width: "100%",
    height: "100%",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold" as const,
    transition: "background-color 0.2s",
  },
  modal: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: "90%",
    background: "white",
    borderRadius: "8px",
    overflow: "hidden",
    padding: "20px",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.8)",
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
    top: "20px",
    right: "20px",
    background: "rgba(255, 255, 255, 0.8)",
    border: "none",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    fontSize: "24px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s",
    zIndex: 2,
  },
};

export default ImageGallery;