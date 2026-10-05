import { describe, expect, it } from "vitest";
import { createUserSchema, type CreateUserDto } from "./user.schema.js";
import { updateImportStatusSchema } from "./import.schema.js";

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
      email: "peterparker#mail.com",
    };

    const result = createUserSchema.safeParse(user);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual(["email"]);
    }
  });

  it("rejects if any field is given", () => {
    const user: CreateUserDto = {};

    expect(() => createUserSchema.parse(user)).toThrow(
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

describe("update user", () => {
  it("checks invalid status", () => {
    const userData = { status: "INVALID_STATUS" };

    const result = updateImportStatusSchema.safeParse(userData);

    expect(() => result.success).toBe(false);
  });
});
