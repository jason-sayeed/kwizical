import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { HomePage } from "../../src/pages/Home/HomePage";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

describe("Home Page", () => {
  test("Tagline is displayed", () => {
    // We need the Browser Router so that the Link elements load correctly
    render(
      <BrowserRouter>
      <GoogleOAuthProvider clientId={googleClientId}>
        <HomePage />
      </GoogleOAuthProvider>
      </BrowserRouter>
    );

    const tagline = screen.getByRole("heading");
    expect(tagline.textContent).toEqual("HOW TO PLAY");
  });

  test("Displays 'play as guest' link", async () => {
    render(
      <BrowserRouter>
      <GoogleOAuthProvider clientId={googleClientId}>
        <HomePage />
      </GoogleOAuthProvider>
      </BrowserRouter>
    );

    const playAsGuest = screen.getByText("Play as guest");
    expect(playAsGuest.getAttribute("href")).toEqual("/kwizical");
  });

  test("Displays a Google link", async () => {
    render(
      <BrowserRouter>
      <GoogleOAuthProvider clientId={googleClientId}>
        <HomePage />
      </GoogleOAuthProvider>
      </BrowserRouter>
    );

    const googleLoginButton = screen.getByRole("button", {
      name: /sign in with google/i,
    });
    expect(googleLoginButton).toBeInTheDocument();
    expect(googleLoginButton).toHaveTextContent("Sign in with Google");
  });
});
