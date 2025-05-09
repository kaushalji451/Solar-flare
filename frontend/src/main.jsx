import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./firebase/authContext.jsx";
import { SharedStateProvider } from "./components/context/shrareState.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <SharedStateProvider>
          <Navbar></Navbar>
          <App />
          <Footer></Footer>
        </SharedStateProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
