import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import AdminContent from "./AdminContent";

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
