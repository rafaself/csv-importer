import { describe, expect, it } from "vitest";
import { createUserSchema } from "./create-user.schema.js";

import { ImportStatus } from "@csv/shared";
import type { CreateUserDto } from "../../dtos/user.dto.js";
import { updateImportStatusSchema } from "../import/update-import.schema.js";
import type { UpdateImportStatusDto } from "../../dtos/import.dto.js";

describe("create user", () => {
  it("trims surrounding whitespace", () => {
    const user: CreateUserDto = {
      fullName: " Peter Parker",
      email: "    peterparker@email.com  ",
      company: "SpiderSpider    ",
    };

    const userParsed = createUserSchema.parse(user);

    expect(userParsed).toEqual({
      fullName: "Peter Parker",
      email: "peterparker@email.com",
      company: "SpiderSpider",
    });
  });

  it("rejects an invalid email", () => {
    const user: CreateUserDto = {
      fullName: "Peter Parker",
      email: "peterparker#mail.com",
    };

    const result = createUserSchema.safeParse(user);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual(["email"]);
    }
  });

  it("rejects if no field is given", () => {
    expect(() => createUserSchema.parse({})).toThrow(
      "At least one field (fullName, email or company) must be provided.",
    );
  });

  it("rejects if any field is not string", () => {
    expect(() => createUserSchema.parse({ fullName: 1 })).toThrow(
      "Invalid input: expected string, received number",
    );
    expect(() => createUserSchema.parse({ email: true })).toThrow(
      "Invalid input: expected string, received boolean",
    );
    expect(() => createUserSchema.parse({ company: [] })).toThrow(
      "Invalid input: expected string, received array",
    );
  });
});

describe("update user status", () => {
  it("checks hard texted 'INVALID_STATUS' invalid status", () => {
    const userData = { status: "INVALID_STATUS" };
    const result = updateImportStatusSchema.safeParse(userData);
    expect(result.success).toBe(false);
  });

  it.each([
    ImportStatus.COMPLETED,
    ImportStatus.FAILED,
    ImportStatus.PENDING,
    ImportStatus.PROCESSING,
  ])("checks %s status", (val) => {
    const userData: UpdateImportStatusDto = { status: val };
    const result = updateImportStatusSchema.safeParse(userData);
    expect(result.success).toBe(true);
  });

  it.each(["COMPLETED", "FAILED", "PENDING", "PROCESSING"])(
    "rejects uppercase status %s",
    (status) => {
      const result = updateImportStatusSchema.safeParse({ status });

      expect(result.success).toBe(false);

      if (!result.success) {
        expect(result.error.issues[0]).toMatchObject({
          code: "invalid_value",
          path: ["status"],
        });
      }
    },
  );
});
