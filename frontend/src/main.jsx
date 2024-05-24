import ReactDOM from "react-dom/client";
import React from "react";
import 'tailwindcss/tailwind.css';
import App from "./App.jsx";
import "./index.css";

import { GoogleOAuthProvider } from '@react-oauth/google';

// Get the "root" div from index.html.
// The React application will be inserted into this div.
const rootElement = document.getElementById("root");
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(rootElement).render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
