import { Link } from "react-router-dom";
import PropertyImageCarousel from "./PropertyImageCarousel";

function PropertyCard({ property }) {
  return (
    <Link to={`/property/${property.ListingKey}`} className="property-card-link">
      <div className="property-card">
        <PropertyImageCarousel
          images={property.Images}
          alt={property.UnparsedAddress}
        />

        <div className="property-info">
          <h3>{property.UnparsedAddress}</h3>

          <p>
            {property.City}, {property.StateOrProvince} {property.PostalCode}
          </p>

          <p>${Number(property.ListPrice).toLocaleString()}</p>

          <p>
            {property.BedroomsTotal} beds ·{" "}
            {property.BathroomsTotalInteger} baths
          </p>

          <p>{property.LivingArea} sqft</p>
        </div>
      </div>
    </Link>
  );
}

export default PropertyCard;