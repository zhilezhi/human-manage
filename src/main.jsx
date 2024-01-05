import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import "virtual:uno.css";
import { RouterProvider } from "react-router-dom";
import router from "@/router/index.jsx";
import { Provider } from "react-redux";
import store from "@/store/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
