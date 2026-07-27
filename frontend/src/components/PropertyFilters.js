function PropertyFilters({ filters, onFilterChange, onSearch, onClear }) {
    return (
        <form className="property-filters" onSubmit={onSearch}>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={filters.city}
            onChange={onFilterChange}
          />
    
          <input
            type="text"
            name="zipcode"
            placeholder="ZIP code"
            value={filters.zipcode}
            onChange={onFilterChange}
          />
    
          <input
            type="number"
            name="minPrice"
            placeholder="Min price"
            value={filters.minPrice}
            onChange={onFilterChange}
          />
    
          <input
            type="number"
            name="maxPrice"
            placeholder="Max price"
            value={filters.maxPrice}
            onChange={onFilterChange}
          />
    
          <select
            name="beds"
            value={filters.beds}
            onChange={onFilterChange}
          >
            <option value="">Beds</option>
            <option value="1">1+ beds</option>
            <option value="2">2+ beds</option>
            <option value="3">3+ beds</option>
            <option value="4">4+ beds</option>
            <option value="5">5+ beds</option>
          </select>
    
          <select
            name="baths"
            value={filters.baths}
            onChange={onFilterChange}
          >
            <option value="">Baths</option>
            <option value="1">1+ baths</option>
            <option value="2">2+ baths</option>
            <option value="3">3+ baths</option>
            <option value="4">4+ baths</option>
            <option value="5">5+ baths</option>
          </select>
    
          <button type="submit">Search</button>
          <button type="button" onClick={onClear}>
            Clear Filters
          </button>
        </form>
    );
}
export default PropertyFilters;