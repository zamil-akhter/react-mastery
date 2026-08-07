import { createBrowserRouter } from "react-router-dom";
import App from "../src/App";
import {Home, About } from "./components";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

export default router;
