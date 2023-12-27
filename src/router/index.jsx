import { createBrowserRouter } from "react-router-dom";
import Layout from "@/pages/Layout/index.jsx";
import Login from "@/pages/User/Login.jsx";
import managerRoutes from "@/router/modules/manager.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: managerRoutes,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
