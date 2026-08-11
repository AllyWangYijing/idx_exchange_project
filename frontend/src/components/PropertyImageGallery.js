import { useEffect, useRef, useState } from "react";
import { parsePhotos } from "./PropertyImageCarousel";

function PropertyImageGallery({ images, alt }) {
  const photos = parsePhotos(images);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [failedImages, setFailedImages] = useState({});
  const lightboxRef = useRef(null);

  useEffect(() => {
    if (isLightboxOpen && lightboxRef.current) {
      lightboxRef.current.focus();
    }
  }, [isLightboxOpen]);

  if (photos.length === 0) {
    return (
      <div className="detail-image-placeholder">
        No photos available
      </div>
    );
  }

  const currentPhoto = photos[currentIndex];
  const currentImageFailed = failedImages[currentIndex];

  function markImageFailed(index) {
    setFailedImages((previousFailedImages) => ({
      ...previousFailedImages,
      [index]: true,
    }));
  }

  function handleLightboxKeyDown(event) {
    if (event.key === "Escape") {
      closeLightbox();
    }
  
    if (event.key === "ArrowLeft") {
      goToPrevious();
    }
  
    if (event.key === "ArrowRight") {
      goToNext();
    }
  }

  function openLightbox() {
    setIsLightboxOpen(true);
  }

  function closeLightbox() {
    setIsLightboxOpen(false);
  }

  function goToPrevious() {
    setCurrentIndex((previousIndex) =>
      previousIndex === 0 ? photos.length - 1 : previousIndex - 1
    );
  }

  function goToNext() {
    setCurrentIndex((previousIndex) =>
      previousIndex === photos.length - 1 ? 0 : previousIndex + 1
    );
  }

  return (
    <div className="property-gallery">
      {currentImageFailed ? (
        <div className="detail-image-placeholder">
          This photo failed to load
        </div>
      ) : (
        <img
          key={currentPhoto}
          src={currentPhoto}
          alt={alt || "Property"}
          className="gallery-main-image"
          onClick={openLightbox}
          onError={() => markImageFailed(currentIndex)}
        />
      )}

      {photos.length > 1 && (
        <div className="gallery-thumbnails">
          {photos.map((photo, index) => (
            <button
              type="button"
              key={photo}
              className={
                index === currentIndex
                  ? "gallery-thumbnail active-thumbnail"
                  : "gallery-thumbnail"
              }
              onClick={() => setCurrentIndex(index)}
            >
              {failedImages[index] ? (
                <div className="thumbnail-placeholder">No image</div>
              ) : (
                <img
                  src={photo}
                  alt={`${alt || "Property"} ${index + 1}`}
                  onError={() => markImageFailed(index)}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {isLightboxOpen && (
        <div
          ref={lightboxRef}
          className="lightbox"
          onClick={closeLightbox}
          onKeyDown={handleLightboxKeyDown}
          tabIndex={0}
        >
          <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close"
              onClick={closeLightbox}
            >
              ×
            </button>

            {photos.length > 1 && (
              <button
                type="button"
                className="lightbox-arrow lightbox-arrow-left"
                onClick={goToPrevious}
              >
                ‹
              </button>
            )}

            <img
              key={currentPhoto}
              src={currentPhoto}
              alt={alt || "Property"}
              className="lightbox-image"
              onError={() => markImageFailed(currentIndex)}
            />

            {photos.length > 1 && (
              <button
                type="button"
                className="lightbox-arrow lightbox-arrow-right"
                onClick={goToNext}
              >
                ›
              </button>
            )}

            <div className="lightbox-counter">
              {currentIndex + 1} / {photos.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertyImageGallery;