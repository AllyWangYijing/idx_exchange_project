import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPropertyById, fetchOpenHouses } from "../api/client";
import PropertyImageGallery from "./PropertyImageGallery";

function PropertyDetailPage() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [openHouses, setOpenHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPropertyDetails() {
      try {
        setLoading(true);
        setError("");

        const propertyResult = await fetchPropertyById(id);
        const openHouseResult = await fetchOpenHouses(id);

        setProperty(propertyResult);
        setOpenHouses(openHouseResult || []);
      } catch (err) {
        setError(err.message || "Failed to load property details");
      } finally {
        setLoading(false);
      }
    }

    loadPropertyDetails();
  }, [id]);

  if (loading) {
    return <p>Loading property details...</p>;
  }

  if (error) {
    return (
      <div>
        <Link to="/">Back to Listings</Link>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div>
        <Link to="/">Back to Listings</Link>
        <p>Property not found.</p>
      </div>
    );
  }

  return (
    <div className="property-detail-page">
      <Link to="/">Back to Listings</Link>

      <h1>{property.UnparsedAddress}</h1>
      <PropertyImageGallery
        images={property.Images}
        alt={property.UnparsedAddress}
      />

      <p>
        {property.City}, {property.StateOrProvince} {property.PostalCode}
      </p>

      <h2>${Number(property.ListPrice).toLocaleString()}</h2>

      <p>
        {property.BedroomsTotal} beds · {property.BathroomsTotalInteger} baths ·{" "}
        {property.LivingArea} sqft
      </p>

      <h3>Description</h3>
      <p>{property.PublicRemarks || "No description available."}</p>

      <h3>Property Details</h3>
      <ul>
        <li>Listing ID: {property.ListingKey}</li>
        <li>Property Type: {property.PropertyType}</li>
        <li>Property Subtype: {property.PropertySubType}</li>
        <li>Status: {property.MlsStatus}</li>
        <li>Photos Count: {property.PhotosCount}</li>
      </ul>

      <h3>Open Houses</h3>
      {openHouses.length === 0 ? (
        <p>No open houses scheduled.</p>
      ) : (
        <ul>
          {openHouses.map((openHouse) => (
            <li key={openHouse.OpenHouseId}>
              {openHouse.OpenHouseDate} · {openHouse.StartTime} -{" "}
              {openHouse.EndTime}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PropertyDetailPage;