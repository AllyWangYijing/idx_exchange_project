export async function fetchProperties(params = {}) {
    const cleanedParams = {};
    for (const key in params) {
      if (params[key] !== "" && params[key] !== undefined && params[key] !== null) {
        cleanedParams[key] = params[key];
      }
    }
  
    const query = new URLSearchParams(cleanedParams).toString();
    const url = query ? `/api/properties?${query}` : "/api/properties";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch properties: ${response.status}`);
    }
    return response.json();
  }

  export async function fetchPropertyById(id) {
    const response = await fetch(`/api/properties/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch property: ${response.status}`);
    }
    return response.json();
  }
  
  export async function fetchOpenHouses(id) {
    const response = await fetch(`/api/properties/${id}/openhouses`);
    if (!response.ok) {
      throw new Error(`Failed to fetch open houses: ${response.status}`);
    }
  
    return response.json();
  }