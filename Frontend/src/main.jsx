import './assets/fonts/fonts.css';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Login from "./components/Login/login.jsx";
import Layout from "./Layout.jsx";
import Signup from "./components/Signup/signup.jsx";
import Home from "./components/Home/home.jsx";
import FAQ from "./components/FAQ/Faq.jsx";
import Chat from "./components/Chat/Chat.jsx";
import Blogs from "./components/Blogs/Blogs.jsx";
import ProtectedRoute from "./components/utils/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // Public Routes
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      // {
      //   element: <ProtectedRoute />,
      //   children: [
      //     {
      //       path: "faq",
      //       element: <FAQ />,
      //     },
      //     {
      //       path: "/chat",
      //       element: <Chat />,
      //     },
      //     {
      //       path: "/blogs",
      //       element: <Blogs />,
      //     },
      //     {
      //       path: "home",
      //       element: <Home />,
      //     },
      //     {
      //       path: "/",
      //       element: <Home />,
      //     },
      //   ],
      // },

      // Protected Routes
      {},
      {},

      {},
      {},
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
