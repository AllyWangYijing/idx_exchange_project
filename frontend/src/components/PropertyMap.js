function PropertyMap({ latitude, longitude, address }) {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  
    if (!latitude || !longitude) {
      return <p>Map unavailable for this property.</p>;
    }
  
    if (!apiKey) {
      return <p>Google Maps API key is missing.</p>;
    }
  
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${latitude},${longitude}&zoom=15`;
  
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  
    return (
      <div className="property-map">
        <iframe
          title={`Map for ${address || "property"}`}
          src={mapUrl}
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
  
        <p>
          <a href={directionsUrl} target="_blank" rel="noreferrer">
            Get Directions
          </a>
        </p>
      </div>
    );
  }
  
  export default PropertyMap;