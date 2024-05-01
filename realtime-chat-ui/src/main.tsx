import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@/globals.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "@/pages/LoginPage.tsx";
import { MessagePage } from "@/pages/MessagePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />
  },
  {
    path: "/room/:id",
    element: <MessagePage />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
