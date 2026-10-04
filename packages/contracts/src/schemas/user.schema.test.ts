import { assert, describe, expect, it, test } from "vitest";
import { createUserSchema, type CreateUserDto } from "./user.schema.js";

describe("createUserSchema", () => {
  it("trims surrounding whitespace", () => {
    const user: CreateUserDto = {
      fullName: " Peter Parker",
      email: "    peterparker@email.com  ",
      company: "SpiderSpider    ",
    };

    const userParsed = createUserSchema.parse(user);

    console.log(userParsed);

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
});
