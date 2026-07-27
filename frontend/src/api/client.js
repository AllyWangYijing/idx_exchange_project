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