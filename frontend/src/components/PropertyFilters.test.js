import { render, screen, fireEvent } from "@testing-library/react";
import PropertyFilters from "./PropertyFilters";

const emptyFilters = {
  city: "",
  zipcode: "",
  minPrice: "",
  maxPrice: "",
  beds: "",
  baths: "",
};

test("renders all six filter inputs", () => {
    render(
      <PropertyFilters
        filters={emptyFilters}
        onFilterChange={() => {}}
        onSearch={() => {}}
        onClear={() => {}}
      />
    );
  
    expect(screen.getByPlaceholderText("City(e.g. Walnut)")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("ZIP code")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Min price(e.g. 200000)")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Max price")).toBeInTheDocument();
    expect(screen.getByText("Beds")).toBeInTheDocument();
    expect(screen.getByText("Baths")).toBeInTheDocument();
  });

test("calls onFilterChange when a filter input changes", () => {
  const mockFilterChange = jest.fn();

  render(
    <PropertyFilters
      filters={emptyFilters}
      onFilterChange={mockFilterChange}
      onSearch={() => {}}
      onClear={() => {}}
    />
  );

  fireEvent.change(screen.getByPlaceholderText("City(e.g. Walnut)"), {
    target: { value: "Walnut" },
  });

  expect(mockFilterChange).toHaveBeenCalledTimes(1);
});

test("calls onClear when Clear Filters button is clicked", () => {
  const mockClear = jest.fn();

  render(
    <PropertyFilters
      filters={emptyFilters}
      onFilterChange={() => {}}
      onSearch={() => {}}
      onClear={mockClear}
    />
  );

  fireEvent.click(screen.getByText("Clear Filters"));

  expect(mockClear).toHaveBeenCalledTimes(1);
});