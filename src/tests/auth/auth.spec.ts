import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import { Pool } from "pg";
import app from "../../app";
import { users } from "./mock-auth";
import { dropDBs } from "../helper";
import { initDB } from "../../db";

describe("Test the auth module", () => {
  let pool: Pool;

  beforeAll(async () => {
    pool = await initDB();
  });

  afterAll(async () => {
    await dropDBs(pool);
    await pool.end();
  });

  /**
   * Tests to perform
   * 1. Register user
   * 2. Register with the same email address
   * 3. Login with the correct credentials
   * 4. Login with the wrong credentials
   * 5. Forgot password(mock the function that returns the code)
   * 6. Change password with the wrong code
   * 7. Change password with the right code
   */

  // test("Register new user", async () => {
  //   const response = await request(app).post("/auth/register").send(users[0]);
  //   console.log(response.body);
  //   expect(1).toBe(1);
  // });

  test("Just test", () => {
    expect(1).toBe(1);
  });
});
