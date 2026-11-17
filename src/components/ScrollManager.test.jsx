import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Link, MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import ScrollManager from "./ScrollManager";

function TestRoutes() {
  const navigate = useNavigate();
  return <>
    <Link to="/second">Open second page</Link>
    <button type="button" onClick={() => navigate(-1)}>Go back</button>
    <Routes>
      <Route path="/first" element={<div>First page</div>} />
      <Route path="/second" element={<div>Second page</div>} />
    </Routes>
  </>;
}

describe("ScrollManager", () => {
  let scrollY;
  let scrollX;
  let originalScrollTo;
  let originalScrollY;
  let originalScrollX;
  let originalHeight;

  beforeEach(() => {
    scrollY = 0;
    scrollX = 0;
    originalScrollTo = window.scrollTo;
    originalScrollY = Object.getOwnPropertyDescriptor(window, "scrollY");
    originalScrollX = Object.getOwnPropertyDescriptor(window, "scrollX");
    originalHeight = Object.getOwnPropertyDescriptor(document.documentElement, "scrollHeight");
    Object.defineProperty(window, "scrollY", { configurable: true, get: () => scrollY });
    Object.defineProperty(window, "scrollX", { configurable: true, get: () => scrollX });
    Object.defineProperty(document.documentElement, "scrollHeight", { configurable: true, value: 5000 });
    window.scrollTo = jest.fn((x, y) => { scrollX = x; scrollY = y; });
  });

  afterEach(() => {
    window.scrollTo = originalScrollTo;
    if (originalScrollY) Object.defineProperty(window, "scrollY", originalScrollY);
    else delete window.scrollY;
    if (originalScrollX) Object.defineProperty(window, "scrollX", originalScrollX);
    else delete window.scrollX;
    if (originalHeight) Object.defineProperty(document.documentElement, "scrollHeight", originalHeight);
    else delete document.documentElement.scrollHeight;
  });

  test("new page navigation scrolls to top and back navigation restores the prior position", async () => {
    render(<MemoryRouter initialEntries={["/first"]}><ScrollManager /><TestRoutes /></MemoryRouter>);

    scrollY = 840;
    fireEvent.scroll(window);
    fireEvent.click(screen.getByRole("link", { name: "Open second page" }));
    expect(screen.getByText("Second page")).toBeTruthy();
    expect(scrollY).toBe(0);

    scrollY = 260;
    fireEvent.scroll(window);
    fireEvent.click(screen.getByRole("button", { name: "Go back" }));
    expect(screen.getByText("First page")).toBeTruthy();
    await waitFor(() => expect(scrollY).toBe(840));
  });
});
