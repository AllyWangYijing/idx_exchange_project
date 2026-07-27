import { fetchProperties } from "./client";

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

test("fetchProperties calls the properties API with query parameters", async () => {
  const mockData = {
    data: [{ ListingKey: "123" }],
    count: 1,
  };

  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockData,
  });

  const result = await fetchProperties({
    city: "Walnut",
    minPrice: "2000000",
    beds: "5",
  });

  expect(global.fetch).toHaveBeenCalledWith(
    "/api/properties?city=Walnut&minPrice=2000000&beds=5"
  );

  expect(result).toEqual(mockData);
});

test("fetchProperties does not send empty filter values", async () => {
  const mockData = {
    data: [],
    count: 0,
  };

  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockData,
  });

  await fetchProperties({
    city: "Walnut",
    zipcode: "",
    minPrice: "",
    maxPrice: "3000000",
    beds: "",
    baths: "2",
  });

  expect(global.fetch).toHaveBeenCalledWith(
    "/api/properties?city=Walnut&maxPrice=3000000&baths=2"
  );
});

test("fetchProperties throws an error when the API response is not ok", async () => {
  global.fetch.mockResolvedValueOnce({
    ok: false,
    status: 500,
  });

  await expect(fetchProperties()).rejects.toThrow(
    "Failed to fetch properties: 500"
  );
});