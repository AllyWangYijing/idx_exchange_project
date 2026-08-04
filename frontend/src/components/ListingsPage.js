import { useEffect, useState } from "react";
import { fetchProperties } from "../api/client";
import PropertyCard from "./PropertyCard";
import PropertyFilters from "./PropertyFilters";
import Pagination from "./Pagination"

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
  //const [count, setCount] = useState(0);
  const [filters, setFilters] = useState(emptyFilters);
  const [activeFilters, setActiveFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [total, setTotal] = useState(0);

  async function loadProperties(params = {}, page = currentPage) {
    try {
      setLoading(true);
      setError("");
      const result = await fetchProperties({
        limit: itemsPerPage,
        offset: (page - 1) * itemsPerPage,
        ...params,
      });

      setProperties(result.data || []);
      //setCount(result.count || 0);
      setTotal(result.total || 0);
    } catch (err) {
      setError(err.message || "Failed to load properties");
      setProperties([]);
      //setCount(0);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setCurrentPage(1);
    loadProperties(cleanedFilters, 1);
  }

  function handleClear() {
    setFilters(emptyFilters);
    setActiveFilters({});
    setCurrentPage(1);
    loadProperties({}, 1);
  }

  function handlePageChange(page) {
    setCurrentPage(page);
    loadProperties(activeFilters, page);
    window.scrollTo(0, 0);
  }

  const totalPages = Math.ceil(total / itemsPerPage);
  const startItem = total === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, total);
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

      <p>
        Showing {startItem}-{endItem} of {total} properties
      </p>

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
        <>
          <div className="property-grid">
            {properties.map((property) => (
              <PropertyCard key={property.ListingKey} property={property} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default ListingsPage;