export async function fetchProperties(params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = query ?`/api/properties?${query}` : "/api/properties";
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch properties: ${response.status}`);
    }
    return response.json();
}