import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { LoginPage } from "@/pages/LoginPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (() => {
      const username = localStorage.getItem("username");
      return username ? <App username={username} /> : <Navigate to={"/auth/login"} />;
    })()
  },
  {
    path: "/auth/login",
    element: <LoginPage />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
