function getFirstPhoto(images) {
    try {
      if (!images) {
        return null;
      }
      const parsedImages = JSON.parse(images);
      if (Array.isArray(parsedImages) && parsedImages.length > 0) {
        return parsedImages[0];
      }
      return null;
      
    } catch (error) {
      return null;
    }
  }
  
  function PropertyCard({ property }) {
    const firstPhoto = getFirstPhoto(property.Images);
  
    return (
      <div className="property-card">
        {firstPhoto ? (
          <img
            src={firstPhoto}
            alt={property.UnparsedAddress || "Property"}
            className="property-image"
          />
        ) : (
          <div className="property-image placeholder">No photo available</div>
        )}
  
        <div className="property-info">
          <h3>{property.UnparsedAddress}</h3>
  
          <p>
            {property.City}, {property.StateOrProvince} {property.PostalCode}
          </p>
  
          <p>${Number(property.ListPrice).toLocaleString()}</p>
  
          <p>
            {property.BedroomsTotal} beds · {property.BathroomsTotalInteger} baths
          </p>
  
          <p>{property.LivingArea} sqft</p>
        </div>
      </div>
    );
  }
  
  export default PropertyCard;