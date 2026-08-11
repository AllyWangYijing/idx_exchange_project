import { useState } from "react";

function parsePhotos(images) {
  try {
    if (!images) {
      return [];
    }

    const parsedImages = JSON.parse(images);

    if (Array.isArray(parsedImages)) {
      return parsedImages;
    }

    return [];
  } catch (error) {
    return [];
  }
}

function PropertyImageCarousel({ images, alt }) {
  const photos = parsePhotos(images);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (photos.length === 0) {
    return <div className="property-image placeholder">No photo available</div>;
  }

  function goToPrevious(event) {
    event.preventDefault();
    event.stopPropagation();

    setCurrentIndex((previousIndex) =>
      previousIndex === 0 ? photos.length - 1 : previousIndex - 1
    );
  }

  function goToNext(event) {
    event.preventDefault();
    event.stopPropagation();

    setCurrentIndex((previousIndex) =>
      previousIndex === photos.length - 1 ? 0 : previousIndex + 1
    );
  }

  return (
    <div className="property-carousel">
      <img
        src={photos[currentIndex]}
        alt={alt || "Property"}
        className="property-image"
      />

      {photos.length > 1 && (
        <>
          <button
            type="button"
            className="carousel-button carousel-button-left"
            onClick={goToPrevious}
          >
            ‹
          </button>

          <button
            type="button"
            className="carousel-button carousel-button-right"
            onClick={goToNext}
          >
            ›
          </button>

          <div className="carousel-counter">
            {currentIndex + 1} / {photos.length}
          </div>
        </>
      )}
    </div>
  );
}

export { parsePhotos };
export default PropertyImageCarousel;