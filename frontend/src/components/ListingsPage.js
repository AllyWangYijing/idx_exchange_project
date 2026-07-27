import { useEffect, useState } from "react";
import { fetchProperties } from "../api/client";
import PropertyCard from "./PropertyCard";
import PropertyFilters from "./PropertyFilters";

const emptyFilters = {
  city: "",
  zipcode: "",
  minPrice: "",
  maxPrice: "",
  beds: "",
  baths: "",
};

function ListingsPage() {
  const [properties, setProperties] = useState([]);
  const [count, setCount] = useState(0);
  const [filters, setFilters] = useState(emptyFilters);
  const [activeFilters, setActiveFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProperties(params = {}) {
    try {
      setLoading(true);
      setError("");

      const result = await fetchProperties({
        limit: 20,
        offset: 0,
        ...params,
      });

      setProperties(result.data || []);
      setCount(result.count || 0);
    } catch (err) {
      setError(err.message || "Failed to load properties");
      setProperties([]);
      setCount(0);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProperties();
  }, []);

  function handleFilterChange(event) {
    const { name, value } = event.target;

    setFilters((previousFilters) => ({
      ...previousFilters,
      [name]: value,
    }));
  }

  function removeEmptyFilters(filterValues) {
    const cleanedFilters = {};

    for (const key in filterValues) {
      if (filterValues[key] !== "") {
        cleanedFilters[key] = filterValues[key];
      }
    }

    return cleanedFilters;
  }

  function handleSearch(event) {
    event.preventDefault();

    const cleanedFilters = removeEmptyFilters(filters);
    setActiveFilters(cleanedFilters);
    loadProperties(cleanedFilters);
  }

  function handleClear() {
    setFilters(emptyFilters);
    setActiveFilters({});
    loadProperties();
  }

  if (loading) {
    return <p>Loading properties...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div>
      <h1>Property Listings</h1>

      <PropertyFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onClear={handleClear}
      />

      <p>Showing {count} properties</p>

      {Object.keys(activeFilters).length > 0 && (
        <p className="active-filters">
          Filters applied:{" "}
          {Object.entries(activeFilters)
            .map(([key, value]) => `${key}: ${value}`)
            .join(", ")}
        </p>
      )}

      {properties.length === 0 ? (
        <p>No properties found. Try changing your filters.</p>
      ) : (
        <div className="property-grid">
          {properties.map((property) => (
            <PropertyCard key={property.ListingKey} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ListingsPage;