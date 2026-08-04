import { render, screen, fireEvent } from "@testing-library/react";
import Pagination, { getPageNumbers } from "./Pagination";

test("does not render pagination when there is only one page", () => {
  const { container } = render(
    <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
  );

  expect(container).toBeEmptyDOMElement();
});

test("disables Previous button on the first page", () => {
  render(
    <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
  );

  expect(screen.getByText("Previous")).toBeDisabled();
  expect(screen.getByText("Next")).not.toBeDisabled();
});

test("disables Next button on the last page", () => {
  render(
    <Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />
  );

  expect(screen.getByText("Next")).toBeDisabled();
  expect(screen.getByText("Previous")).not.toBeDisabled();
});

test("calls onPageChange with the next page when Next is clicked", () => {
  const mockPageChange = jest.fn();

  render(
    <Pagination currentPage={2} totalPages={5} onPageChange={mockPageChange} />
  );

  fireEvent.click(screen.getByText("Next"));

  expect(mockPageChange).toHaveBeenCalledWith(3);
});

test("calls onPageChange with the previous page when Previous is clicked", () => {
  const mockPageChange = jest.fn();

  render(
    <Pagination currentPage={3} totalPages={5} onPageChange={mockPageChange} />
  );

  fireEvent.click(screen.getByText("Previous"));

  expect(mockPageChange).toHaveBeenCalledWith(2);
});

test("calls onPageChange when a page number is clicked", () => {
  const mockPageChange = jest.fn();

  render(
    <Pagination currentPage={1} totalPages={5} onPageChange={mockPageChange} />
  );

  fireEvent.click(screen.getByText("3"));

  expect(mockPageChange).toHaveBeenCalledWith(3);
});

test("shows ellipsis for large page counts near the start", () => {
  render(
    <Pagination currentPage={1} totalPages={24} onPageChange={() => {}} />
  );

  expect(screen.getByText("1")).toBeInTheDocument();
  expect(screen.getByText("2")).toBeInTheDocument();
  expect(screen.getByText("3")).toBeInTheDocument();
  expect(screen.getByText("4")).toBeInTheDocument();
  expect(screen.getByText("5")).toBeInTheDocument();
  expect(screen.getByText("24")).toBeInTheDocument();
  expect(screen.getByText("...")).toBeInTheDocument();
});

test("generates correct page numbers near the end without repeating the last page", () => {
  expect(getPageNumbers(23, 24)).toEqual([
    1,
    "...",
    20,
    21,
    22,
    23,
    24,
  ]);
});