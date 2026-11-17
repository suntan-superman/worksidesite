import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import AdminContent from "./AdminContent";
import { projects } from "./portfolioData";

test("admin sign-in can reveal and hide the password without submitting the form", async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: false, json: async () => ({ error: "authentication_required" }) });
  render(<AdminContent />);
  const password = await screen.findByLabelText("Admin password");
  expect(password.getAttribute("type")).toBe("password");
  fireEvent.click(screen.getByRole("button", { name: "Show password" }));
  expect(password.getAttribute("type")).toBe("text");
  expect(screen.getByRole("button", { name: "Hide password" }).getAttribute("aria-pressed")).toBe("true");
  fireEvent.click(screen.getByRole("button", { name: "Hide password" }));
  expect(password.getAttribute("type")).toBe("password");
});

test("Projects section exposes the built-in import and updates persisted status after success", async () => {
  let imported = false;
  global.fetch = jest.fn(async (url, options = {}) => {
    const action = String(url).split("action=")[1];
    if (action === "list") return { ok: true, json: async () => ({ projects: imported ? projects.map((project) => ({ ...project, id: project.slug, status: "published", updatedAt: { _seconds: 1760000000 } })) : [], testimonials: [] }) };
    if (action === "migrate") { imported = true; return { ok: true, json: async () => ({ created: 10, skipped: [] }) }; }
    return { ok: true, json: async () => ({ ok: true }) };
  });
  render(<AdminContent />);
  const importButton = await screen.findByRole("button", { name: "Import 10 missing projects" });
  expect(screen.getByText("10 of 10 are not yet saved to Firestore.")).toBeTruthy();
  fireEvent.click(importButton);
  expect(await screen.findByText("Portfolio import complete: 10 added; 0 existing projects preserved.")).toBeTruthy();
  expect(await screen.findByText("All 10 built-in projects are saved to Firestore.")).toBeTruthy();
  expect(screen.getAllByText(/Saved to Firestore · Updated/)).toHaveLength(10);
});

test("project image fields expose separate logo, cover, and multi-screenshot upload controls", async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ projects: [], testimonials: [] }) });
  render(<AdminContent />);
  await screen.findByRole("button", { name: "Import 10 missing projects" });
  fireEvent.click(screen.getAllByRole("button", { name: "Edit" })[0]);
  const uploadLogo = screen.getByRole("button", { name: "Upload Logo" });
  const uploadCover = screen.getByRole("button", { name: "Upload Cover Image" });
  const addScreenshots = screen.getByRole("button", { name: "Add Screenshots" });
  expect(uploadLogo).toBeTruthy();
  expect(uploadCover).toBeTruthy();
  expect(addScreenshots).toBeTruthy();
  expect(uploadLogo.className).toContain("button-dark");
  expect(uploadCover.className).toContain("button-dark");
  expect(screen.getByLabelText("Logo image URL/path (optional)")).toBeTruthy();
  expect(screen.getByLabelText("Cover image URL/path (optional)")).toBeTruthy();
  const filePicker = document.querySelector('input[type="file"]');
  fireEvent.click(uploadLogo);
  expect(filePicker.dataset.target).toBe("logoUrl");
  expect(filePicker.multiple).toBe(false);
  fireEvent.click(uploadCover);
  expect(filePicker.dataset.target).toBe("coverImageUrl");
  fireEvent.click(addScreenshots);
  expect(filePicker.multiple).toBe(true);
});

test("admin warns after 55 idle minutes and signs out at one hour", async () => {
  jest.useFakeTimers();
  global.fetch = jest.fn(async (url) => {
    const action = String(url).split("action=")[1];
    if (action === "list") return { ok: true, json: async () => ({ projects: [], testimonials: [] }) };
    return { ok: true, json: async () => ({ ok: true }) };
  });
  try {
    render(<AdminContent />);
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
      await Promise.resolve();
    });
    expect(screen.getByRole("button", { name: "Sign out" })).toBeTruthy();

    await act(async () => { jest.advanceTimersByTime(55 * 60 * 1000); });
    expect(screen.getByRole("alertdialog").textContent).toContain("05:00");
    expect(screen.getByRole("button", { name: "Stay signed in" })).toBeTruthy();

    await act(async () => {
      jest.advanceTimersByTime(5 * 60 * 1000);
      await Promise.resolve();
      await Promise.resolve();
    });
    expect(screen.getByLabelText("Admin password")).toBeTruthy();
    expect(screen.getByRole("status").textContent).toContain("one hour of inactivity");
  } finally {
    jest.useRealTimers();
  }
});
