import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import "virtual:uno.css";
import { RouterProvider } from "react-router-dom";
import router from "@/router/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
