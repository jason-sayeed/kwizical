import createFetchMock from "vitest-fetch-mock";
import { describe, vi } from "vitest";

import { signup } from "../../src/services/authentication";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

describe("authentication service", () => {
  describe("signup", () => {
    test("calls the backend url with the right values", async () => {
      const testEmail = "test@testEmail.com";
      const testName = "testName";
      const testImgUrl = "testImgUrl";

      fetch.mockResponseOnce("", {
        status: 201,
      });

      await signup(testEmail, testName, testImgUrl);

      // This is an array of the arguments that were last passed to fetch
      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      expect(url).toEqual(`${BACKEND_URL}/users`);
      expect(options.method).toEqual("POST");
      expect(options.body).toEqual(
        JSON.stringify({ email: testEmail, name: testName, imageUrl: testImgUrl})
      );
      expect(options.headers["Content-Type"]).toEqual("application/json");
    });

    test("returns nothing if the signup request was a success", async () => {
      const testEmail = "test@testEmail.com";
      const testName = "testName";
      const testImgUrl = "testImgUrl";

      fetch.mockResponseOnce(JSON.stringify(""), {
        status: 201,
      });

      const token = await signup(testEmail, testName, testImgUrl);
      expect(token).toEqual(undefined);
    });

    test("throws an error if the request failed", async () => {
      const testEmail = "test@testEmail.com";
      const testName = "testName";
      const testImgUrl = "testImgUrl";

      fetch.mockResponseOnce(
        JSON.stringify({ message: "Some error" }),
        {
          status: 400,
        }
      );

      try {
        await signup(testEmail, testName, testImgUrl);
      } catch (err) {
        expect(err.message).toEqual(
          "Received status 400 when signing up. Expected 201"
        );
      }
    });
  });
});
