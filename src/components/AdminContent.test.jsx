import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
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
