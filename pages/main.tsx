import React from "react";
import { createRoot } from "react-dom/client";
import Home from "../app/page";
import { Analytics } from "@vercel/analytics/react";
import "../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Home />
    <Analytics />
  </React.StrictMode>,
);
