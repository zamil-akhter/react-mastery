import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthLayout } from "./components/index.js";

import { Signup, Login, AllPosts, Post, Home, AddPost, EditPost } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout isAuthenticated={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout isAuthenticated={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout isAuthenticated>
            {" "}
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "add-post",
        element: (
          <AuthLayout isAuthenticated>
            {" "}
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "edit-post/:slug",
        element: (
          <AuthLayout isAuthenticated>
            {" "}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
