import { createHashRouter } from "react-router-dom";
import Layout from "@/pages/Layout/index.jsx";
import Login from "@/pages/User/Login.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
