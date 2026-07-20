import { useEffect, useState } from "react";
import { fetchProperties } from "../api/client";
import PropertyCard from "./PropertyCard";

function ListingsPage() {
  const [properties, setProperties] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProperties() {
      try {
        setLoading(true);
        setError("");

        const result = await fetchProperties({
          limit: 20,
          offset: 0,
        });

        setProperties(result.data || []);
        setCount(result.count || 0);
      } catch (err) {
        setError(err.message || "Failed to load properties");
      } finally {
        setLoading(false);
      }
    }

    loadProperties();
  }, []);

  if (loading) {
    return <p>Loading properties...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div>
      <h1>Property Listings</h1>
      <p>Showing {count} properties</p>

      <div className="property-grid">
        {properties.map((property) => (
          <PropertyCard key={property.ListingKey} property={property} />
        ))}
      </div>
    </div>
  );
}

export default ListingsPage;